
import ReservationForm from "@/app/components/ReservationForm";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

interface Props {
  params: { id: string };
}

export default async function ReservationPage({ params }: Props) {
  const supabase = createServerComponentClient({ cookies });

  const { id } = params;

  const { data: capsula, error } = await supabase
    .from("capsulas")
    .select()
    .eq("id", id)
    .single();

  if (error || !capsula) {
    return <p className="text-white">Cápsula no encontrada</p>;
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const imageUrl = capsula.image;

  return (
    <div className="w-full min-h-screen p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">Reserva: {capsula.name}</h1>
      <div className="flex flex-col sm:flex-row gap-6">
        <div className="w-full sm:w-1/2 rounded overflow-hidden border border-primary-800 h-max relative">
          <img src={imageUrl} alt={`Imagen de ${capsula.name}`} />
        </div>
        <div className="w-full sm:w-1/2">
          <ReservationForm capsula={capsula} user={user} />
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-bold mt-6 mb-4">Detalles de la reserva</h2>
        <p className="mb-2">
          <strong>Descripción: </strong> {capsula.description}
        </p>
        <p className="mb-2">Fecha: <strong>{new Date().toLocaleDateString()}</strong></p>
        <p className="mb-2">Hora de inicio: <strong>{new Date().toLocaleTimeString()}</strong></p>
        <p className="mb-2">Duración: <strong>1 hora</strong></p>
        <p className="text-lg font-semibold">
          Precio total a pagar:{" "}
          {capsula.discount > 0 ? (
            <>
              <span className="text-red-600">${capsula.regularPrice - capsula.discount}</span>{" "}
              <span className="line-through text-gray-500">${capsula.regularPrice}</span>
            </>
          ) : (
            <span>${capsula.regularPrice}</span>
          )}{" "}
          / hora
        </p>
      </div>
    </div>
  );
}





