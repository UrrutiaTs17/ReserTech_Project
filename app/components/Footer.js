import Link from "next/link";
import { ThemeSwitcher } from "@/components/theme-switcher";
export default function Footer() {
  return (
    /**
<footer className="bg-gray-800 text-white py-6 w-full">
      <div className="max-w-screen-xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <p className="mb-4">
          © {new Date().getFullYear()} Resertech. Todos los derechos reservados.
        </p>
        <Link href="https://github.com/UrrutiaTs17/ReserTech_Project" 
          target="_blank"
          rel="noopener noreferrer"
        className="mb-4 hover:text-yellow-400 transition-colors">
          Contáctanos
        </Link>

      </div>
    </footer>


 */

    <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
      <div className="max-w-screen-xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <p className="mb-4">
          © {new Date().getFullYear()} Resertech. Todos los derechos reservados.
        </p>
        <Link href="https://github.com/UrrutiaTs17/ReserTech_Project" 
          target="_blank"
          rel="noopener noreferrer"
        className="mb-4 hover:text-yellow-400 transition-colors">
          Contáctanos
        </Link>

              <ThemeSwitcher />
      </div>
    </footer>
  );
}
