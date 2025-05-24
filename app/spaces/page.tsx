"use client";

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function CapsulasPage() {
  const [capsulas, setCapsulas] = useState<any[] | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const getData = async () => {
      const { data, error } = await supabase.from("capsulas").select();
      if (error) {
        console.error("Error al cargar capsulas:", error);
      } else {
        setCapsulas(data);
      }
    };
    getData();
  }, []);

  if (!capsulas) {
    return <p className="text-white">Cargando cápsulas...</p>;
  }

  return (
    <div className="max-w-7xl mx-auto p-4 min-h-screen min-w-screen">
      <h1 className="text-4xl mb-5 text-accent-400 font-medium">
        Acerca de nuestros espacios
      </h1>
      <p className="text-primary-200 text-lg mb-10">
        Descubre una nueva forma de gestionar y disfrutar los espacios
        compartidos en tu comunidad con ReserTech. Diseñado para estudiantes,
        residentes y trabajadores que valoran la organización, la comodidad y la
        eficiencia, nuestro sistema te permite reservar salas, salones o
        espacios de descanso de manera rápida y sin complicaciones. Consulta la
        disponibilidad en tiempo real, accede a la normativa de cada espacio y
        recibe notificaciones automáticas sobre tus reservas. Ya sea para
        estudiar, reunirte o relajarte, ReserTech te ofrece el control y la
        tranquilidad que necesitas para aprovechar al máximo tu tiempo y tu
        entorno.
      </p>
      <ul
        className="
      grid 
      grid-cols-1
      sm:grid-cols-[minmax(300px,1fr)_minmax(300px,1fr)] 
      gap-6
    "
      >
        {capsulas.map(
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
              className="w-full bg-gray-300 bg-opacity-20 rounded-md p-6 shadow-md text-black"
            >
              <h2 className="text-xl font-semibold mb-2">{name}</h2>
              <p className="mb-2">{description}</p>
              <p className="mb-1">
                Capacidad máxima:{" "}
                <span className="font-bold">{maxCapacity} personas</span>
              </p>
              <p className="text-lg font-semibold">
                Precio:{" "}
                {discount > 0 ? (
                  <>
                    <span className="text-red-600">
                      ${regularPrice - discount}
                    </span>{" "}
                    <span className="line-through text-gray-500">
                      ${regularPrice}
                    </span>
                  </>
                ) : (
                  <span>${regularPrice}</span>
                )}{" "}
                / hora
              </p>
            </li>
          )
        )}
      </ul>
    </div>
  );
}
