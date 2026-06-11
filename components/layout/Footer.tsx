import Link from "next/link";
import { BookOpen, Mail, Twitter, Linkedin } from "lucide-react";

const footerLinks = {
  Plataforma: [
    { label: "Características",   href: "#" },
    { label: "Especialidades",    href: "#" },
    { label: "Simulacros",        href: "#" },
    { label: "Precios",           href: "#" },
  ],
  Recursos: [
    { label: "Blog MIR",          href: "#" },
    { label: "Estadísticas MIR",  href: "#" },
    { label: "Guía de estudio",   href: "#" },
    { label: "FAQ",               href: "#" },
  ],
  Legal: [
    { label: "Privacidad",        href: "#" },
    { label: "Términos de uso",   href: "#" },
    { label: "Cookies",           href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-5">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600">
                <BookOpen className="h-4 w-4 text-white" />
              </div>
              <span className="font-display text-lg font-bold text-white">
                MIR<span className="text-brand-400">Prep</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-500 max-w-xs">
              La plataforma más completa para preparar el MIR. Más de 10.000 preguntas, simulacros y estudio adaptativo con IA.
            </p>
            <div className="flex items-center gap-3 mt-5">
              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors">
                <Twitter className="h-4 w-4 text-gray-400" />
              </a>
              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors">
                <Linkedin className="h-4 w-4 text-gray-400" />
              </a>
              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors">
                <Mail className="h-4 w-4 text-gray-400" />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-sm font-semibold text-white mb-4">{section}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-600">
          <p>© {new Date().getFullYear()} MIRPrep. Todos los derechos reservados.</p>
          <p>Hecho con ❤️ para futuros médicos residentes</p>
        </div>
      </div>
    </footer>
  );
}
