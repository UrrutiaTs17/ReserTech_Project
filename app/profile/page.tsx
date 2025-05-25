"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function PerfilPage() {
  const supabase = createClient();
  const [user, setUser] = useState<any>(null);
  const [reservas, setReservas] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        const { data } = await supabase
          .from("reservas")
          .select("*, espacios(name, image)")
          .eq("userEmail", user.email)
          .eq("isActive", true);
        setReservas(data || []);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    await supabase.from("reservas").delete().eq("id", id);
    setReservas(reservas.filter(r => r.id !== id));
  };

  const handleEdit = (id: number) => {
    router.push(`/edit-reservation/${id}`);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 text-white">
      <h1 className="text-3xl font-bold mb-4">Perfil de Usuario</h1>

      {user && (
        <div className="mb-8">
          <p><strong>Correo:</strong> {user.email}</p>
        </div>
      )}

      <h2 className="text-2xl font-semibold mb-4">Mis Reservas</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reservas.map((reserva) => (
          <div
            key={reserva.id}
            className="bg-gray-900 text-white p-4 rounded shadow-md flex flex-col md:flex-row items-center gap-4"
          > 
            <img
              src={reserva.espacios?.image}
              alt={`Imagen de ${reserva.espacios?.name}`}
              className="w-full md:w-1/3 h-40 object-cover rounded"
            />
            <div className="flex-1 w-full">
              <p><strong>Espacio:</strong> {reserva.espacios?.name}</p>
              <p><strong>Fecha:</strong> {reserva.fechaReserva}</p>
              <p><strong>Hora:</strong> {reserva.startTime} - {reserva.EndTime}</p>
              <p><strong>Personas:</strong> {reserva.numPersonas}</p>
              <p><strong>Precio:</strong> ${reserva.cabinPrice}</p>
              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => handleDelete(reserva.id)}
                  className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
