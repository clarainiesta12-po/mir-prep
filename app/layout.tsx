import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "MIR Prep — Plataforma de Preparación MIR",
    template: "%s | MIR Prep",
  },
  description:
    "La plataforma más completa para preparar el MIR. Más de 10.000 preguntas, simulacros oficiales y estudio adaptativo con IA.",
  keywords: ["MIR", "preparación MIR", "medicina", "examen MIR", "simulacro MIR", "preguntas MIR"],
  authors: [{ name: "MIR Prep" }],
  openGraph: {
    title: "MIR Prep — Prepara el MIR con IA",
    description: "La plataforma más completa para preparar el MIR.",
    type: "website",
    locale: "es_ES",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className="min-h-screen bg-white font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
