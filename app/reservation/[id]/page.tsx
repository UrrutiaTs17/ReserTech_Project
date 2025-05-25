
import ReservationForm from "@/app/components/ReservationForm";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
interface Props {
  params: { id: string };
}

export default async function ReservationPage({ params }: Props) {
  const supabase = createServerComponentClient({ cookies });
  
  const { id } = params;

  const { data: espacio, error } = await supabase
    .from("espacios")
    .select()
    .eq("id", id)
    .single();

  if (error || !espacio) {
    return <p className="text-white">Espacio no encontrado</p>;
  }

  const userdata = await createClient();

  const {
    data: { user },
  } = await userdata.auth.getUser();
  const imageUrl = espacio.image;

  return (
    <div className="w-full min-h-screen p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">Reserva: {espacio.name}</h1>
      <div className="flex flex-col sm:flex-row gap-6">
        <div className="w-full sm:w-1/2 rounded overflow-hidden border border-primary-800 h-max padding-4">
          <img src={imageUrl} alt={`Imagen de ${espacio.name}`} />
        </div>
        <div className="w-full sm:w-1/2 flex flex-col justify-center p-4 bg-primary-800 rounded">
          <ReservationForm espacio={espacio} user={user?.email} />
        </div>
      </div>
      <div className="mt-6 p-4 border border-gray-700 bg-gray-900 rounded text-sm text-white whitespace-pre-wrap">
        <h3 className="text-lg font-semibold mb-2">Normativa del espacio</h3>
        {espacio.normativa}
      </div>
    </div>
  );
}





