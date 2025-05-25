"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function AllReservationsPage() {
  const supabase = createClient();
  const [reservas, setReservas] = useState<any[]>([]);

  useEffect(() => {
    const fetchReservations = async () => {
      const { data } = await supabase
        .from("reservas")
        .select("*, espacios(name, image)")
        .eq("isActive", true);
      setReservas(data || []);
    };

    fetchReservations();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">Reservas Activas</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reservas.map((reserva) => (
          <div
            key={reserva.id}
            className="bg-gray-900 text-white p-4 rounded shadow-md flex flex-col md:flex-row items-center gap-4"
          >
            <div className="w-full md:w-1/2">
              <img
                src={reserva.espacios?.image}
                alt={`Imagen de ${reserva.espacios?.name}`}
                className="w-full h-64 object-cover rounded"
              />
            </div>
            <div className="w-full md:w-1/2">
              <p><strong>Espacio:</strong> {reserva.espacios?.name}</p>
              <p><strong>Fecha:</strong> {reserva.fechaReserva}</p>
              <p><strong>Hora:</strong> {reserva.startTime} - {reserva.EndTime}</p>
              <p><strong>Número de personas:</strong> {reserva.numPersonas}</p>
              <p><strong>Precio:</strong> ${reserva.cabinPrice}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
