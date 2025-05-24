
import { Suspense } from "react";
import Filter from "@/app/components/Filter";

export const revalidate = 3600;
export const metadata = {
    title: "Espacios Disponibles",
    description: "Consulta la disponibilidad de los espacios compartidos en tu comunidad.",
}

 export default async function Page() {    
       //const filter = searchParams?.capacity ?? "all";
        return (
          
          <div>
            <h1 className="text-4xl mb-5 text-accent-400 font-medium">
              Acerca de nuestros espacios
            </h1>
            <p className="text-primary-200 text-lg mb-10">
            Descubre una nueva forma de gestionar y disfrutar los espacios compartidos en tu comunidad con ReserTech. Diseñado para estudiantes, residentes y trabajadores que valoran la organización, la comodidad y la eficiencia, nuestro sistema te permite reservar salas, salones o espacios de descanso de manera rápida y sin complicaciones.
            Consulta la disponibilidad en tiempo real, accede a la normativa de cada espacio y recibe notificaciones automáticas sobre tus reservas.
            Ya sea para estudiar, reunirte o relajarte, ReserTech te ofrece el control y la tranquilidad que necesitas para aprovechar al máximo tu tiempo y tu entorno.
            </p>
           
           <div className="flex justify-end mb-8">
            <Filter/>
           </div>
      <Suspense fallback={<div>Cargando...</div>} /*key ={filter}*/>
      /** REVISAR */
      </Suspense>
          </div>
        );
      }
