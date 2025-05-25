import DeployButton from "@/components/deploy-button";
import { EnvVarWarning } from "@/components/env-var-warning";
import HeaderAuth from "@/components/header-auth";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import "./globals.css";
import Footer from "@/app/components/Footer";
import Logo from "@/app/components/Logo";
import bg from "@/public/bg.png";
import Image from "next/image";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: {
    template: "ReserTech",
    default: "Bienvenidos a ReserTech",
  },
  description: "Innovadora aplicación de reserva de espacios compatidos",
};

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <main className="min-h-screen flex flex-col items-center">
            <div className="flex-1 w-full flex flex-col items-center">
              <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
                <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
                  <div className="flex gap-5 items-center font-semibold">
                    <Logo/>
                  </div>
                  <div className="flex gap-5 items-center font-semibold">
                    <Link href="/spaces" className="hover:text-foreground/80">
                    Espacios Disponibles
                    </Link>
                  </div>
                  <div className="flex gap-5 items-center font-semibold">
                    <Link href="/reservations" className="hover:text-foreground/80">
                    Reservas Activas
                    </Link>
                  </div>
                  {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}
                </div>
              </nav>
              <div className="flex flex-col max-w-5xl p-5 min-h-screen">
                {children}
              </div>
              <Footer/>
            </div>
          </main>
</ThemeProvider>
      </body>
    </html>
  );
}
