"use client"; 
// Indica que este componente se ejecuta en el cliente (navegador), no en el servidor.

import { usePathname, useRouter, useSearchParams } from "next/navigation";
// Importa hooks de Next.js para navegación y lectura de URL:
// - usePathname: obtiene la ruta actual sin query
// - useRouter: para navegar o cambiar URL programáticamente
// - useSearchParams: para leer parámetros de búsqueda (query string)

function Filter() {
  const searchParams = useSearchParams();
  // Obtiene un objeto con los parámetros de la URL actuales (query string)

  const router = useRouter();
  // Obtiene funciones para cambiar la URL sin recargar la página

  const pathname = usePathname();
  // Obtiene la ruta actual sin parámetros (ejemplo: "/espacios")

  const activeFilter = searchParams.get("capacity") ?? "all";
  // Lee el valor actual del parámetro 'capacity' en la URL
  // Si no existe, usa "all" como filtro activo por defecto

  function handleFilter(filter) {
    // Función que se llama al hacer click en un botón para cambiar filtro

    const params = new URLSearchParams(searchParams);
    // Crea una copia modificable de los parámetros actuales

    params.set("capacity", filter);
    // Cambia o añade el parámetro 'capacity' con el nuevo filtro

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    // Cambia la URL en el navegador a la misma ruta con los nuevos parámetros
    // sin hacer reload y sin hacer scroll arriba de la página
  }

  return (
    <div className="border border-primary-800 flex">
      {/* Botones para cada filtro */}

      <Button
        filter="all"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        Todos
      </Button>

      <Button
        filter="small"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        5&mdash;10 personas
      </Button>

      <Button
        filter="medium"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        10&mdash;50 personas
      </Button>

      <Button
        filter="large"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        50&mdash;100 personas
      </Button>
    </div>
  );
}

function Button({ filter, handleFilter, activeFilter, children }) {
  // Componente botón reutilizable para cada filtro
  return (
    <button
      className={`px-5 py-2 hover:bg-primary-700 ${
        filter === activeFilter ? "bg-primary-700 text-primary-50" : ""
      }`}
      // Aplica estilos CSS para el botón activo y hover

      onClick={() => handleFilter(filter)}
      // Al hacer click llama a handleFilter con el filtro asignado
    >
      {children}
      {/* Texto o contenido del botón */}
    </button>
  );
}

export default Filter;
// Exporta el componente principal Filter para usarlo en otras partes
