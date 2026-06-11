import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="relative rounded-3xl bg-brand-950 px-8 py-16 overflow-hidden">
          {/* Decoration */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-3/4 bg-gradient-to-r from-transparent via-brand-500/50 to-transparent" />
          <div className="absolute -top-32 -right-32 h-64 w-64 rounded-full bg-brand-600/20 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 h-64 w-64 rounded-full bg-brand-800/30 blur-3xl" />

          <div className="relative">
            <p className="text-brand-400 text-sm font-semibold uppercase tracking-widest mb-4">
              ¿A qué esperas?
            </p>
            <h2 className="text-4xl sm:text-5xl font-display font-bold text-white mb-6 text-balance">
              Tu número en el MIR empieza aquí
            </h2>
            <p className="text-lg text-brand-300 mb-10 max-w-xl mx-auto text-balance">
              Únete a los 12.000 médicos que ya prepararon el MIR con inteligencia. Empieza gratis hoy.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/inicio" className="btn-primary bg-white text-brand-700 hover:bg-brand-50 text-base px-8 py-3.5">
                Crear cuenta gratuita
                <ArrowRight className="h-4 w-4" />
              </Link>
              <span className="text-sm text-brand-400">
                Sin tarjeta de crédito · Acceso inmediato
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
