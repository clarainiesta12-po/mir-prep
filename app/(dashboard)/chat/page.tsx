import Link from "next/link";
import {
  Heart, Activity, Microscope, Zap, Pill, Brain, Baby, Shield,
  Eye, Ear, Bone, FlaskConical, Radiation, Scissors, Wind,
  Stethoscope, TestTube, Syringe, Thermometer, Scan, Waves,
  Sun, Droplets, CircleDot, HeartPulse, Dna, Users, Scale,
  MessageCircle,
} from "lucide-react";

type Agent = {
  specialty: string;
  label: string;
  icon: React.ElementType;
};

type Section = {
  title: string;
  category: string;
  color: string;
  agents: Agent[];
};

const sections: Section[] = [
  {
    title: "Especialidades Clínicas",
    category: "clinicas",
    color: "brand",
    agents: [
      { specialty: "alergologia",           label: "Alergología",              icon: Wind        },
      { specialty: "cardiologia",            label: "Cardiología",              icon: Heart       },
      { specialty: "dermatologia",           label: "Dermatología",             icon: Sun         },
      { specialty: "endocrinologia",         label: "Endocrinología",           icon: Zap         },
      { specialty: "gastroenterologia",      label: "Gastroenterología",        icon: Activity    },
      { specialty: "geriatria",              label: "Geriatría",                icon: Users       },
      { specialty: "hematologia",            label: "Hematología",              icon: Droplets    },
      { specialty: "medicina-familiar",      label: "Medicina Familiar",        icon: Stethoscope },
      { specialty: "medicina-intensiva",     label: "Medicina Intensiva",       icon: HeartPulse  },
      { specialty: "medicina-interna",       label: "Medicina Interna",         icon: CircleDot   },
      { specialty: "medicina-legal",         label: "Medicina Legal",           icon: Scale       },
      { specialty: "medicina-preventiva",    label: "Medicina Preventiva",      icon: Shield      },
      { specialty: "nefrologia",             label: "Nefrología",               icon: Dna         },
      { specialty: "neumologia",             label: "Neumología",               icon: Wind        },
      { specialty: "neurologia",             label: "Neurología",               icon: Brain       },
      { specialty: "oncologia-medica",       label: "Oncología Médica",         icon: Microscope  },
      { specialty: "oncologia-radioterapica",label: "Oncología Radioterápica",  icon: Radiation   },
      { specialty: "pediatria",              label: "Pediatría",                icon: Baby        },
      { specialty: "psiquiatria",            label: "Psiquiatría",              icon: Brain       },
      { specialty: "reumatologia",           label: "Reumatología",             icon: Bone        },
      { specialty: "urgencias",              label: "Urgencias",                icon: Thermometer },
    ],
  },
  {
    title: "Especialidades Quirúrgicas",
    category: "quirurgicas",
    color: "rose",
    agents: [
      { specialty: "angiologia",           label: "Angiología",              icon: Activity   },
      { specialty: "cirugia-cardiovascular",label: "Cirugía Cardiovascular",  icon: Heart      },
      { specialty: "cirugia-general",      label: "Cirugía General",          icon: Scissors   },
      { specialty: "cirugia-oral",         label: "Cirugía Oral",             icon: Stethoscope},
      { specialty: "cirugia-pediatrica",   label: "Cirugía Pediátrica",       icon: Baby       },
      { specialty: "cirugia-plastica",     label: "Cirugía Plástica",         icon: Zap        },
      { specialty: "cirugia-toracica",     label: "Cirugía Torácica",         icon: Wind       },
      { specialty: "ginecologia",          label: "Ginecología",              icon: CircleDot  },
      { specialty: "neurocirugia",         label: "Neurocirugía",             icon: Brain      },
      { specialty: "oftalmologia",         label: "Oftalmología",             icon: Eye        },
      { specialty: "otorrinolaringologia", label: "Otorrinolaringología",      icon: Ear        },
      { specialty: "traumatologia",        label: "Traumatología",            icon: Bone       },
      { specialty: "urologia",             label: "Urología",                 icon: Droplets   },
    ],
  },
  {
    title: "Laboratorio y Diagnóstico",
    category: "laboratorio",
    color: "violet",
    agents: [
      { specialty: "analisis-clinicos",  label: "Análisis Clínicos",    icon: TestTube    },
      { specialty: "anatomia-patologica",label: "Anatomía Patológica",  icon: Microscope  },
      { specialty: "bioquimica",         label: "Bioquímica",           icon: FlaskConical},
      { specialty: "farmacologia",       label: "Farmacología",         icon: Pill        },
      { specialty: "inmunologia",        label: "Inmunología",          icon: Shield      },
      { specialty: "microbiologia",      label: "Microbiología",        icon: Dna         },
      { specialty: "neurofisiologia",    label: "Neurofisiología",      icon: Waves       },
      { specialty: "radiodiagnostico",   label: "Radiodiagnóstico",     icon: Scan        },
    ],
  },
  {
    title: "Otras",
    category: "otras",
    color: "amber",
    agents: [
      { specialty: "anestesiologia",   label: "Anestesiología",       icon: Syringe    },
      { specialty: "hidrologia",       label: "Hidrología Médica",    icon: Droplets   },
      { specialty: "medicina-nuclear", label: "Medicina Nuclear",     icon: Radiation  },
      { specialty: "medicina-trabajo", label: "Medicina del Trabajo", icon: Scale      },
    ],
  },
];

const sectionStyles: Record<string, { header: string; icon: string; badge: string; btn: string }> = {
  brand:  { header: "bg-brand-50 border-brand-100",   icon: "bg-brand-100 text-brand-600",   badge: "bg-brand-50 text-brand-600",   btn: "bg-brand-600 hover:bg-brand-700"  },
  rose:   { header: "bg-rose-50 border-rose-100",     icon: "bg-rose-100 text-rose-600",     badge: "bg-rose-50 text-rose-600",     btn: "bg-rose-600 hover:bg-rose-700"    },
  violet: { header: "bg-violet-50 border-violet-100", icon: "bg-violet-100 text-violet-600", badge: "bg-violet-50 text-violet-600", btn: "bg-violet-600 hover:bg-violet-700"},
  amber:  { header: "bg-amber-50 border-amber-100",   icon: "bg-amber-100 text-amber-600",   badge: "bg-amber-50 text-amber-600",   btn: "bg-amber-600 hover:bg-amber-700"  },
};

export default function ChatIndexPage() {
  const total = sections.reduce((acc, s) => acc + s.agents.length, 0);

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-10 w-10 rounded-xl bg-brand-100 flex items-center justify-center">
            <MessageCircle className="h-5 w-5 text-brand-600" />
          </div>
          <div>
            <h1 className="text-2xl font-display font-bold text-gray-900">Tutores IA</h1>
            <p className="text-gray-500 text-sm mt-0.5">
              {total} agentes especializados · Pregunta cualquier duda del MIR
            </p>
          </div>
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-10">
        {sections.map((section) => {
          const styles = sectionStyles[section.color];
          return (
            <div key={section.category}>
              {/* Section header */}
              <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border mb-4 ${styles.header}`}>
                <span className="font-bold text-gray-900">{section.title}</span>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${styles.badge}`}>
                  {section.agents.length} agentes
                </span>
              </div>

              {/* Cards grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {section.agents.map(({ specialty, label, icon: Icon }) => (
                  <div
                    key={specialty}
                    className="card group hover:border-brand-200 hover:-translate-y-0.5 transition-all flex flex-col gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`h-9 w-9 rounded-xl flex items-center justify-center shrink-0 ${styles.icon}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <span className="font-semibold text-gray-900 text-sm leading-tight">{label}</span>
                    </div>

                    <Link
                      href={`/chat/${section.category}/${specialty}`}
                      className={`flex items-center justify-center gap-1.5 w-full rounded-xl py-2 text-xs font-semibold text-white transition-colors ${styles.btn}`}
                    >
                      <MessageCircle className="h-3.5 w-3.5" />
                      Consultar
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
