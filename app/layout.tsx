import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lotos OS",
  description: "Sistema Operativo de Portafolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="h-screen w-screen flex flex-col antialiased bg-[url('/grid.svg')]">
        {/* --- HUD SUPERIOR (Persistente) --- */}
        <header className="h-16 border-b border-accent-green/20 bg-primary-light/90 backdrop-blur-md flex items-center justify-between px-6 z-50">
          <div className="text-accent-green font-bold text-xl tracking-widest select-none">
            LOTOS<span className="text-accent-pink">.OS</span> v1.0
          </div>
          <nav className="flex gap-6 text-sm font-mono text-accent-blue">
            <Link
              href="/"
              className="hover:text-accent-green hover:underline decoration-2 underline-offset-4 transition-all"
            >
              [HOME]
            </Link>
            <Link
              href="/hangar"
              className="hover:text-accent-green hover:underline decoration-2 underline-offset-4 transition-all"
            >
              [HANGAR]
            </Link>
            <Link
              href="/arcade"
              className="hover:text-accent-green hover:underline decoration-2 underline-offset-4 transition-all"
            >
              [ARCADE]
            </Link>
          </nav>
          <div className="text-xs text-text-secondary border border-accent-green/20 px-3 py-1 rounded-full">
            AUDIO: <span className="text-accent-green animate-pulse">ONLINE</span>
          </div>
        </header>

        {/* --- ÁREA DE CONTENIDO PRINCIPAL --- */}
        <main className="flex-1 relative overflow-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
