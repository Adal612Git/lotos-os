export default function Home() {
  return (
    <div className="h-full w-full flex items-center justify-center bg-[url('/grid.svg')]">
      <div className="glass-panel p-10 rounded-lg max-w-2xl text-center shadow-[0_0_50px_rgba(100,255,218,0.1)]">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-accent-green to-accent-blue">
          SYSTEM ONLINE
        </h1>
        <p className="text-text-secondary font-mono mb-8">
          Bienvenido al nodo central. Selecciona un módulo para comenzar.
        </p>

        <div className="grid grid-cols-2 gap-4">
          <button className="p-4 border border-accent-green text-accent-green hover:bg-accent-green/10 transition-all">
            INICIAR PROTOCOLO
          </button>
          <button className="p-4 border border-accent-pink text-accent-pink hover:bg-accent-pink/10 transition-all">
            ACCEDER A DATOS
          </button>
        </div>
      </div>
    </div>
  );
}
