"use client";

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function EspaciosPage() {
  const [espacios, setEspacios] = useState<any[] | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const getData = async () => {
      const { data, error } = await supabase.from("espacios").select();
      if (error) {
        console.error("Error al cargar espacios:", error);
      } else {
        setEspacios(data);
      }
    };
    getData();
  }, []);

  if (!espacios) {
    return <p className="text-white">Cargando espacios...</p>;
  }

return (
  <div className="max-w-7xl mx-auto px-6 sm:px-10 py-12 text-white">
    <h1 className="text-4xl font-extrabold mb-4 text-center tracking-tight">
      Acerca de nuestros espacios
    </h1>
    <p className="text-lg text-primary-300 text-center mb-10 max-w-3xl mx-auto">
      Descubre una nueva forma de gestionar y disfrutar los espacios
      compartidos en tu comunidad con ReserTech. Diseñado para estudiantes,
      residentes y trabajadores que valoran la organización, la comodidad y la
      eficiencia, nuestro sistema te permite reservar salas, salones o espacios
      de descanso de manera rápida y sin complicaciones. Consulta la
      disponibilidad en tiempo real, accede a la normativa de cada espacio y
      recibe notificaciones automáticas sobre tus reservas.
    </p>

    <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
      {espacios.map(
        ({
          id,
          name,
          maxCapacity,
          regularPrice,
          discount,
          description,
          image,
        }) => (
          <li
            key={id}
            className="bg-white/10 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow flex flex-col justify-between"
          >
            <div>
              <h2 className="text-xl font-semibold text-accent-500 mb-1">
                {name}
              </h2>
              <p className="text-sm text-primary-300 mb-3">{description}</p>
              <p className="text-sm mb-1">
                Capacidad máxima:{" "}
                <span className="font-bold text-white">{maxCapacity}</span>{" "}
                personas
              </p>
              <p className="text-base font-bold mb-3">
                Precio:{" "}
                {discount > 0 ? (
                  <>
                    <span className="text-red-500">
                      ${regularPrice - discount}
                    </span>{" "}
                    <span className="line-through text-gray-400">
                      ${regularPrice}
                    </span>
                  </>
                ) : (
                  <span className="text-white">${regularPrice}</span>
                )}{" "}
                / hora
              </p>
            </div>

            <div className="text-right mt-4">
              <Link
                href={`/reservation/${id}`}
                className="inline-block px-4 py-2 bg-accent-500 text-primary-950 rounded hover:bg-accent-400 transition"
              >
                Reservar →
              </Link>
            </div>
          </li>
        )
      )}
    </ul>
  </div>
);

}
