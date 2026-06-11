const stats = [
  { value: "10.247", label: "Preguntas MIR",        sublabel: "Desde 1995 hasta hoy" },
  { value: "94%",    label: "Tasa de aprobados",    sublabel: "Entre nuestros usuarios activos" },
  { value: "38",     label: "Especialidades",       sublabel: "Completas con temario" },
  { value: "12.400", label: "Médicos preparados",   sublabel: "En las últimas 3 convocatorias" },
];

export default function Stats() {
  return (
    <section className="bg-brand-950 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-4xl sm:text-5xl font-display font-bold text-white mb-1">
                {stat.value}
              </p>
              <p className="text-base font-semibold text-brand-300 mb-1">{stat.label}</p>
              <p className="text-sm text-brand-400/70">{stat.sublabel}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
