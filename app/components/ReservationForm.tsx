"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function ReservationForm({
  espacio,
  user,
}: {
  espacio: any;
  user: any;
}) {
  const supabase = createClient();
  const userEmail = user;

  const [fechaReserva, setFechaReserva] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [numPersonas, setNumPersonas] = useState(espacio.maxCapacity);
  const [observations, setObservations] = useState("");
  const [mensaje, setMensaje] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!fechaReserva || !startTime || !endTime || !numPersonas) {
      setMensaje("Por favor, completa todos los campos.");
      return;
    }

    const hoy = new Date();
    const fechaIngresada = new Date(fechaReserva);
    fechaIngresada.setHours(0, 0, 0, 0);
    hoy.setHours(0, 0, 0, 0);

    if (fechaIngresada < hoy) {
      setMensaje("La fecha de reserva no puede ser anterior a hoy.");
      return;
    }

    const [hInicio, mInicio] = startTime.split(":").map(Number);
    const [hFin, mFin] = endTime.split(":").map(Number);

    const inicio = new Date();
    inicio.setHours(hInicio, mInicio, 0, 0);

    const fin = new Date();
    fin.setHours(hFin, mFin, 0, 0);

    if (fin <= inicio) {
      setMensaje("La hora de fin debe ser posterior a la hora de inicio.");
      return;
    }

    // Validación de traslape
    const { data: reservasExistentes, error: errorExistencia } = await supabase
      .from("reservas")
      .select("*")
      .eq("cabinId", espacio.id)
      .eq("fechaReserva", fechaReserva)
      .eq("isActive", true);

    if (errorExistencia) {
      setMensaje("Error al verificar disponibilidad.");
      return;
    }

    const conflicto = reservasExistentes?.some((reserva: any) => {
      const [hI, mI] = reserva.startTime.split(":").map(Number);
      const [hF, mF] = reserva.EndTime.split(":").map(Number);

      const iniExist = new Date();
      iniExist.setHours(hI, mI, 0, 0);
      const finExist = new Date();
      finExist.setHours(hF, mF, 0, 0);

      return inicio < finExist && fin > iniExist;
    });

    if (conflicto) {
      setMensaje("Ya existe una reserva para este espacio en ese rango de tiempo.");
      return;
    }

    const { error } = await supabase.from("reservas").insert({
      cabinId: espacio.id,
      userEmail,
      fechaReserva,
      startTime,
      EndTime: endTime,
      numPersonas,
      cabinPrice: espacio.regularPrice - espacio.discount,
      isActive: true,
      observations,
    });

    if (error) {
      setMensaje("Error al crear la reserva: " + error.message);
    } else {
      setMensaje("Reserva creada con éxito");
      setFechaReserva("");
      setStartTime("");
      setEndTime("");
      setNumPersonas(espacio.maxCapacity);
      setObservations("");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
      <label>
        Fecha de reserva:
        <input
          type="date"
          value={fechaReserva}
          onChange={(e) => setFechaReserva(e.target.value)}
          required
          className="block w-full p-2 rounded border"
        />
      </label>

      <label>
        Hora inicio:
        <input
          type="time"
          value={startTime}
          onChange={(e) => {
            const value = e.target.value;
            setStartTime(value);
            const [h, m] = value.split(":").map(Number);
            const nuevaHora = (h + 2) % 24;
            const horaFinal = `${nuevaHora.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
            setEndTime(horaFinal);
          }}
          required
          className="block w-full p-2 rounded border"
        />
      </label>

      <label>
        Hora fin:
        <input
          disabled
          type="time"
          value={endTime}
          required
          className="block w-full p-2 rounded border"
        />
      </label>

      <label>
        Valor:
        <input
          disabled
          type="number"
          value={espacio.regularPrice - espacio.discount}
          className="block w-full p-2 rounded border"
        />
      </label>

      <label>
        Número de personas:
        <input
          type="number"
          min={1}
          max={espacio.maxCapacity}
          value={numPersonas}
          onChange={(e) => setNumPersonas(parseInt(e.target.value))}
          required
          className="block w-full p-2 rounded border"
        />
      </label>
      <button
        type="submit"
        className="bg-gray-600 bg-accent-500 text-primary-900 py-2 rounded hover:bg-gray-700 bg-accent-400 transition"
      >
        Reservar
      </button>

      {mensaje && <p className="mt-2 text-center">{mensaje}</p>}
    </form>
  );
}
