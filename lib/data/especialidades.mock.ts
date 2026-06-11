import type { Especialidad } from "@/lib/types/especialidad";

export const especialidades: Especialidad[] = [
  {
    id: "1",
    slug: "cardiologia",
    nombre: "Cardiología",
    descripcion: "Enfermedades del corazón y sistema cardiovascular. Una de las áreas con mayor peso en el MIR.",
    icono: "Heart",
    color: "#e84545",
    totalPreguntas: 312,
    porcentajeMIR: 7.2,
    temas: [
      { id: "c1", nombre: "Cardiopatía isquémica", totalPreguntas: 80, subtemas: ["Angina", "IAM", "Complicaciones"] },
      { id: "c2", nombre: "Insuficiencia cardíaca", totalPreguntas: 65, subtemas: ["Sistólica", "Diastólica", "Tratamiento"] },
      { id: "c3", nombre: "Arritmias", totalPreguntas: 70, subtemas: ["FA", "Taquicardias", "Bloqueos"] },
      { id: "c4", nombre: "Valvulopatías", totalPreguntas: 55, subtemas: ["Estenosis mitral", "Estenosis aórtica", "Insuficiencia"] },
      { id: "c5", nombre: "Cardiopatías congénitas", totalPreguntas: 42, subtemas: ["CIA", "CIV", "Tetralogía de Fallot"] },
    ],
  },
  {
    id: "2",
    slug: "neurologia",
    nombre: "Neurología",
    descripcion: "Enfermedades del sistema nervioso central y periférico.",
    icono: "Brain",
    color: "#8b5cf6",
    totalPreguntas: 287,
    porcentajeMIR: 6.8,
    temas: [
      { id: "n1", nombre: "Ictus", totalPreguntas: 75, subtemas: ["Isquémico", "Hemorrágico", "Tratamiento"] },
      { id: "n2", nombre: "Epilepsia", totalPreguntas: 55, subtemas: ["Clasificación", "Tratamiento", "Status"] },
      { id: "n3", nombre: "Esclerosis múltiple", totalPreguntas: 48, subtemas: ["Diagnóstico", "Tratamiento", "Formas clínicas"] },
      { id: "n4", nombre: "Demencias", totalPreguntas: 60, subtemas: ["Alzheimer", "Lewy", "Vascular"] },
      { id: "n5", nombre: "Neuropatías", totalPreguntas: 49, subtemas: ["Periféricas", "Mononeuropatías"] },
    ],
  },
  {
    id: "3",
    slug: "medicina-interna",
    nombre: "Medicina Interna",
    descripcion: "Área transversal con enfermedades sistémicas y patología general del adulto.",
    icono: "Stethoscope",
    color: "#3068ff",
    totalPreguntas: 398,
    porcentajeMIR: 9.1,
    temas: [
      { id: "mi1", nombre: "Enfermedades autoinmunes", totalPreguntas: 85, subtemas: ["LES", "Sjögren", "Vasculitis"] },
      { id: "mi2", nombre: "Hematología", totalPreguntas: 90, subtemas: ["Anemias", "Leucemias", "Linfomas"] },
      { id: "mi3", nombre: "Reumatología", totalPreguntas: 75, subtemas: ["AR", "Gota", "Espondiloartropatías"] },
      { id: "mi4", nombre: "Enfermedades infecciosas", totalPreguntas: 95, subtemas: ["Bacterianas", "Víricas", "Fúngicas"] },
      { id: "mi5", nombre: "Oncología general", totalPreguntas: 53, subtemas: ["Síndromes paraneoplásicos", "Emergencias"] },
    ],
  },
  {
    id: "4",
    slug: "cirugia",
    nombre: "Cirugía",
    descripcion: "Cirugía general, digestiva y patología quirúrgica.",
    icono: "Scissors",
    color: "#059669",
    totalPreguntas: 265,
    porcentajeMIR: 6.1,
    temas: [
      { id: "cg1", nombre: "Cirugía digestiva", totalPreguntas: 90, subtemas: ["Esófago", "Estómago", "Colon"] },
      { id: "cg2", nombre: "Pared abdominal", totalPreguntas: 40, subtemas: ["Hernias", "Eventraciones"] },
      { id: "cg3", nombre: "Patología hepatobiliopancreática", totalPreguntas: 75, subtemas: ["Vesícula", "Páncreas", "Hígado"] },
      { id: "cg4", nombre: "Cirugía de urgencias", totalPreguntas: 60, subtemas: ["Abdomen agudo", "Apendicitis", "Peritonitis"] },
    ],
  },
  {
    id: "5",
    slug: "ginecologia",
    nombre: "Ginecología y Obstetricia",
    descripcion: "Patología del aparato reproductor femenino y atención al embarazo.",
    icono: "Baby",
    color: "#ec4899",
    totalPreguntas: 241,
    porcentajeMIR: 5.6,
    temas: [
      { id: "go1", nombre: "Obstetricia", totalPreguntas: 90, subtemas: ["Embarazo normal", "Patología obstétrica", "Parto"] },
      { id: "go2", nombre: "Ginecología oncológica", totalPreguntas: 65, subtemas: ["Cáncer cervical", "Cáncer ovario", "Endometrio"] },
      { id: "go3", nombre: "Patología benigna", totalPreguntas: 50, subtemas: ["Miomas", "Endometriosis", "SOP"] },
      { id: "go4", nombre: "Anticoncepción y reproducción", totalPreguntas: 36, subtemas: ["Métodos", "FIV", "Infertilidad"] },
    ],
  },
  {
    id: "6",
    slug: "pediatria",
    nombre: "Pediatría",
    descripcion: "Medicina del niño y adolescente, con gran peso histórico en el MIR.",
    icono: "Users",
    color: "#f59e0b",
    totalPreguntas: 310,
    porcentajeMIR: 7.1,
    temas: [
      { id: "p1", nombre: "Neonatología", totalPreguntas: 75, subtemas: ["RN normal", "Prematuridad", "Patología neonatal"] },
      { id: "p2", nombre: "Infectología pediátrica", totalPreguntas: 80, subtemas: ["Exantemas", "Meningitis", "Vacunas"] },
      { id: "p3", nombre: "Cardiología pediátrica", totalPreguntas: 55, subtemas: ["Cardiopatías congénitas", "Arritmias"] },
      { id: "p4", nombre: "Neumología pediátrica", totalPreguntas: 60, subtemas: ["Asma", "Bronquiolitis", "Neumonías"] },
      { id: "p5", nombre: "Endocrinología pediátrica", totalPreguntas: 40, subtemas: ["Diabetes", "Hipotiroidismo", "Pubertad"] },
    ],
  },
  {
    id: "7",
    slug: "psiquiatria",
    nombre: "Psiquiatría",
    descripcion: "Trastornos mentales y del comportamiento.",
    icono: "Smile",
    color: "#0891b2",
    totalPreguntas: 198,
    porcentajeMIR: 4.6,
    temas: [
      { id: "ps1", nombre: "Trastornos del estado de ánimo", totalPreguntas: 55, subtemas: ["Depresión", "Trastorno bipolar"] },
      { id: "ps2", nombre: "Psicosis", totalPreguntas: 50, subtemas: ["Esquizofrenia", "Psicosis breve"] },
      { id: "ps3", nombre: "Trastornos de ansiedad", totalPreguntas: 45, subtemas: ["TOC", "TEPT", "Fobias"] },
      { id: "ps4", nombre: "Psicofarmacología", totalPreguntas: 48, subtemas: ["Antidepresivos", "Antipsicóticos", "Ansiolíticos"] },
    ],
  },
  {
    id: "8",
    slug: "neumologia",
    nombre: "Neumología",
    descripcion: "Enfermedades del aparato respiratorio.",
    icono: "Wind",
    color: "#64748b",
    totalPreguntas: 224,
    porcentajeMIR: 5.2,
    temas: [
      { id: "ne1", nombre: "EPOC y asma", totalPreguntas: 70, subtemas: ["EPOC", "Asma", "Reagudización"] },
      { id: "ne2", nombre: "Enfermedades intersticiales", totalPreguntas: 55, subtemas: ["FPI", "Sarcoidosis", "Otras"] },
      { id: "ne3", nombre: "Cáncer de pulmón", totalPreguntas: 50, subtemas: ["CPCP", "CPCNP", "Tratamiento"] },
      { id: "ne4", nombre: "TEP e HTP", totalPreguntas: 49, subtemas: ["TEP", "TVP", "HTP"] },
    ],
  },
];

export function getEspecialidadBySlug(slug: string): Especialidad | undefined {
  return especialidades.find((e) => e.slug === slug);
}

export function getEspecialidadesTop(n = 5): Especialidad[] {
  return [...especialidades]
    .sort((a, b) => b.porcentajeMIR - a.porcentajeMIR)
    .slice(0, n);
}
