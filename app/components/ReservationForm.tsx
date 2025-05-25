"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";

export default function ReservationForm({
  capsula,
  user,
}: {
  capsula: any;
  user: any;
}) {
  const supabase = createClient();
  console.log("capsula", capsula);
  console.log("user", user);
  const userId = user?.id || null;
  const [fechaReserva, setFechaReserva] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [numPersonas, setNumPersonas] = useState(capsula.maxCapacity);
  const [observations, setObservations] = useState("");
  const [mensaje, setMensaje] = useState("");

  // Validación de usuario externo, si usas auth, pasa el userId desde la página padre

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!fechaReserva || !startTime || !endTime || !numPersonas) {
      setMensaje("Por favor, completa todos los campos.");
      return;
    }

    // Validar fecha no anterior a hoy
    const hoy = new Date();
    const fechaIngresada = new Date(fechaReserva);
    fechaIngresada.setHours(0, 0, 0, 0);
    hoy.setHours(0, 0, 0, 0);

    if (fechaIngresada < hoy) {
      setMensaje("La fecha de reserva no puede ser anterior a hoy.");
      return;
    }

    // Validar hora fin mayor que hora inicio
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

    const { error } = await supabase.from("reservas").insert({
      cabinId: capsula.id, // entero
      userId: "user", // entero
      fechaReserva: fechaReserva, // date en formato 'YYYY-MM-DD'
      startTime, // string tipo 'HH:mm'
      EndTime: endTime, // string tipo 'HH:mm'
      numPersonas,
      cabinPrice: capsula.regularPrice,
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
      setNumPersonas(capsula.maxCapacity);
      setObservations("");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4 max-w-md">
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
          onChange={(e) => setStartTime(e.target.value)}
          required
          className="block w-full p-2 rounded border"
        />
      </label>

      <label>
        Hora fin:
        <input
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          required
          className="block w-full p-2 rounded border"
        />
      </label>

      <label>
        Número de personas:
        <input
          type="number"
          min={1}
          max={capsula.maxCapacity}
          value={numPersonas}
          onChange={(e) => setNumPersonas(parseInt(e.target.value))}
          required
          className="block w-full p-2 rounded border"
        />
      </label>

      <label>
        Observaciones:
        <textarea
          value={observations}
          onChange={(e) => setObservations(e.target.value)}
          className="block w-full p-2 rounded border"
          rows={3}
        />
      </label>

      <button
        type="submit"
        className="bg-accent-600 text-primary-900 py-2 rounded hover:bg-accent-500 transition"
      >
        Reservar
      </button>

      {mensaje && <p className="mt-2 text-center">{mensaje}</p>}
    </form>
  );
}
