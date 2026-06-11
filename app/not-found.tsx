import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md px-4">
        <div className="h-16 w-16 rounded-2xl bg-brand-50 flex items-center justify-center mx-auto mb-6">
          <BookOpen className="h-8 w-8 text-brand-500" />
        </div>
        <h1 className="text-5xl font-display font-bold text-gray-900 mb-2">404</h1>
        <h2 className="text-xl font-bold text-gray-700 mb-3">Página no encontrada</h2>
        <p className="text-gray-500 mb-8">
          Esta página no existe o ha sido movida. Vuelve al inicio y continúa estudiando.
        </p>
        <Link href="/" className="btn-primary mx-auto inline-flex">
          <ArrowLeft className="h-4 w-4" />
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
