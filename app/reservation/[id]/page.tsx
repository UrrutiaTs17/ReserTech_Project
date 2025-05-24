import Image from "next/image";
import { createClient } from "@/utils/supabase/client";

interface Props {
  params: { id: string };
}

export default async function ReservationPage({ params }: Props) {
  const supabase = createClient();
  const { id } = params;

  const { data: capsula, error } = await supabase
    .from("capsulas")
    .select()
    .eq("id", id)
    .single();

  if (error || !capsula) {
    return <p className="text-white">Capsula no encontrada</p>;
  }

  const imageUrl = `https://mxzzaehovtdjgednbsxu.supabase.co/storage/v1/object/public/capsula-imagenes/${capsula.image}`;

  /**Aaaaaa */
  return (
    <div className="min-w-screen mx-auto p-6 min-h-screen text-white rounded">
      <h1 className="text-3xl font-bold mb-6">Reserva: {capsula.name}</h1>
      <div className="flex gap-6">
        <div className="relative w-64 h-40 rounded overflow-hidden border border-primary-800">
        </div>
        <div>
          <p className="mb-2">{capsula.description}</p>
          <p className="mb-2">
            Capacidad máxima: <strong>{capsula.maxCapacity} personas</strong>
          </p>
          <p className="text-lg font-semibold">
            Precio:{" "}
            {capsula.discount > 0 ? (
              <>
                <span className="text-red-600">
                  ${capsula.regularPrice - capsula.discount}
                </span>{" "}
                <span className="line-through text-gray-500">
                  ${capsula.regularPrice}
                </span>
              </>
            ) : (
              <span>${capsula.regularPrice}</span>
            )}{" "}
            / hora
          </p>
        </div>
      </div>
    </div>
  );
}
