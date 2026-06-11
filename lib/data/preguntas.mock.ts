import type { Pregunta } from "@/lib/types/pregunta";

export const preguntasMock: Pregunta[] = [
  {
    id: "mir2023-001",
    numero: 1,
    año: 2023,
    convocatoria: "MIR 2023-2024",
    especialidad: "cardiologia",
    tema: "Cardiopatía isquémica",
    subtema: "IAM",
    enunciado:
      "Paciente de 62 años con dolor torácico opresivo de 3 horas de evolución, irradiado al brazo izquierdo, con sudoración y náuseas. El ECG muestra elevación del ST en V1-V4. ¿Cuál es la actitud más adecuada?",
    opciones: [
      { id: "a", texto: "Administrar nitratos sublinguales y observación" },
      { id: "b", texto: "Angioplastia primaria urgente (ICP primaria)" },
      { id: "c", texto: "Fibrinólisis sistémica con alteplasa" },
      { id: "d", texto: "Ecocardiograma urgente antes de cualquier actuación" },
      { id: "e", texto: "Coronariografía electiva en 24-48 horas" },
    ],
    respuestaCorrecta: "b",
    explicacion:
      "En el IAMCEST (IAM con elevación del ST) el tratamiento de reperfusión de elección es la angioplastia primaria (ICP primaria) siempre que pueda realizarse en menos de 120 minutos desde el primer contacto médico. La fibrinólisis se reserva cuando no es posible ICP en ese tiempo. Los nitratos están contraindicados en hipotensión y no son el tratamiento de reperfusión.",
    dificultad: "media",
    tags: ["IAMCEST", "reperfusión", "ICP", "urgencias cardiológicas"],
    tiempoMedioSegundos: 85,
  },
  {
    id: "mir2023-002",
    numero: 2,
    año: 2023,
    convocatoria: "MIR 2023-2024",
    especialidad: "cardiologia",
    tema: "Arritmias",
    subtema: "FA",
    enunciado:
      "Mujer de 70 años con fibrilación auricular de novo detectada hace 36 horas. Frecuencia cardíaca 110 lpm, tensión arterial 130/80. Sin cardiopatía estructural conocida. ¿Qué actitud es la más correcta respecto al tratamiento anticoagulante previo a la cardioversión?",
    opciones: [
      { id: "a", texto: "No es necesaria anticoagulación previa ya que tiene menos de 48 horas de evolución" },
      { id: "b", texto: "Anticoagulación durante al menos 3 semanas antes de cardioversión" },
      { id: "c", texto: "Cardioversión inmediata previa a la anticoagulación" },
      { id: "d", texto: "Realizar ecocardiograma transesofágico para descartar trombo y cardiovertir" },
      { id: "e", texto: "Anticoagulación durante 4 semanas tras cardioversión únicamente" },
    ],
    respuestaCorrecta: "d",
    explicacion:
      "Con FA de inicio incierto o mayor de 12 horas, antes de cardioversión se debe: 1) anticoagular durante 3 semanas previas o 2) realizar ETE para descartar trombo auricular. Dado que tiene 36 horas (>12h y <48h con inicio conocido), la guía recomienda ETE o anticoagulación 3 semanas. En este caso la opción D (ETE) permite cardioversión inmediata si no hay trombo. Tras cardioversión: anticoagulación mínimo 4 semanas independientemente del CHA2DS2-VASc.",
    dificultad: "dificil",
    tags: ["FA", "cardioversión", "anticoagulación", "ETE"],
    tiempoMedioSegundos: 110,
  },
  {
    id: "mir2023-003",
    numero: 3,
    año: 2023,
    convocatoria: "MIR 2023-2024",
    especialidad: "neurologia",
    tema: "Ictus",
    subtema: "Isquémico",
    enunciado:
      "Varón de 55 años sin antecedentes que acude a urgencias con hemiparesia derecha y afasia de inicio brusco hace 2 horas. La TC craneal urgente es normal. ¿Cuál es el tratamiento más adecuado?",
    opciones: [
      { id: "a", texto: "Anticoagulación con heparina sódica intravenosa" },
      { id: "b", texto: "Trombólisis intravenosa con rtPA (alteplasa)" },
      { id: "c", texto: "Antiagregación con AAS 300 mg" },
      { id: "d", texto: "Trombectomía mecánica directa sin necesidad de fibrinólisis" },
      { id: "e", texto: "Observación y control de factores de riesgo" },
    ],
    respuestaCorrecta: "b",
    explicacion:
      "Ictus isquémico agudo con TC normal (descarta hemorragia), tiempo de evolución <4,5 horas y sin contraindicaciones: indicación de trombólisis IV con rtPA. La trombectomía mecánica se añade si hay oclusión de gran vaso, pero no sustituye a la fibrinólisis como primera línea en la ventana temporal. La anticoagulación no está indicada en fase aguda del ictus isquémico.",
    dificultad: "media",
    tags: ["ictus isquémico", "rtPA", "trombólisis", "urgencias neurológicas"],
    tiempoMedioSegundos: 75,
  },
  {
    id: "mir2023-004",
    numero: 4,
    año: 2023,
    convocatoria: "MIR 2023-2024",
    especialidad: "medicina-interna",
    tema: "Enfermedades autoinmunes",
    subtema: "LES",
    enunciado:
      "Mujer de 28 años con eritema malar, artritis no erosiva, pleuritis y anticuerpos anti-ADN nativo positivos. Complemento bajo. Proteinuria de 24 horas: 1,8 g. ¿Cuál de los siguientes criterios diagnósticos del LES NO está presente en este caso?",
    opciones: [
      { id: "a", texto: "Rash malar" },
      { id: "b", texto: "Artritis" },
      { id: "c", texto: "Serositis" },
      { id: "d", texto: "Nefritis lúpica (proteinuria > 0.5 g/24h)" },
      { id: "e", texto: "Anemia hemolítica" },
    ],
    respuestaCorrecta: "e",
    explicacion:
      "Aplicando los criterios SLICC 2012 o ACR/EULAR 2019, la paciente cumple: rash malar (eritema malar), artritis no erosiva, serositis (pleuritis), nefritis lúpica (proteinuria >0.5g/24h), anti-ADNn positivos y complemento bajo. No se menciona anemia hemolítica en ningún momento, por lo que éste es el criterio ausente.",
    dificultad: "media",
    tags: ["LES", "criterios diagnósticos", "autoinmunidad"],
    tiempoMedioSegundos: 90,
  },
  {
    id: "mir2023-005",
    numero: 5,
    año: 2023,
    convocatoria: "MIR 2023-2024",
    especialidad: "pediatria",
    tema: "Infectología pediátrica",
    subtema: "Exantemas",
    enunciado:
      "Niño de 4 años con fiebre de 39°C de 3 días de evolución. Al 4° día desaparece la fiebre y aparece exantema maculopapular rosado que comienza en tronco y se extiende a extremidades, respetando la cara. ¿Cuál es el diagnóstico más probable?",
    opciones: [
      { id: "a", texto: "Sarampión" },
      { id: "b", texto: "Rubéola" },
      { id: "c", texto: "Roséola infantum (exantema súbito)" },
      { id: "d", texto: "Escarlatina" },
      { id: "e", texto: "Eritema infeccioso (quinta enfermedad)" },
    ],
    respuestaCorrecta: "c",
    explicacion:
      "La roséola infantum (exantema súbito, 6ª enfermedad) se caracteriza por: fiebre alta 3-5 días que cede bruscamente, seguida de exantema maculopapular que comienza en tronco y se extiende centrifugamente, respetando cara. Causada por VHH-6 (herpesvirus humano 6). El sarampión comienza en cara; la rubéola tiene adenopatías; el eritema infeccioso presenta mejillas abofeteadas.",
    dificultad: "facil",
    tags: ["exantemas", "roséola", "VHH-6", "pediatría infecciosa"],
    tiempoMedioSegundos: 60,
  },
  {
    id: "mir2022-010",
    numero: 10,
    año: 2022,
    convocatoria: "MIR 2022-2023",
    especialidad: "cirugia",
    tema: "Patología hepatobiliopancreática",
    subtema: "Páncreas",
    enunciado:
      "Varón de 45 años alcohólico que ingresa por pancreatitis aguda. A las 72 horas presenta deterioro clínico con fiebre de 39°C, leucocitosis 18.000 y proteína C reactiva 320 mg/L. La TC con contraste muestra necrosis pancreática del 40% sin signos de infección. ¿Cuál es la actitud más correcta?",
    opciones: [
      { id: "a", texto: "Necrosectomía quirúrgica urgente" },
      { id: "b", texto: "Antibióticos profilácticos de amplio espectro" },
      { id: "c", texto: "Drenaje percutáneo guiado por imagen" },
      { id: "d", texto: "Tratamiento conservador sin antibióticos profilácticos" },
      { id: "e", texto: "CPRE urgente para esfinterotomía" },
    ],
    respuestaCorrecta: "d",
    explicacion:
      "En la pancreatitis aguda necrotizante sin signos de infección, la actitud actual es conservadora. Los antibióticos profilácticos NO están indicados (guías actuales no los recomiendan en necrosis estéril). La necrosectomía se indica solo si hay necrosis infectada confirmada y, preferentemente, de forma diferida (>4 semanas, enfoque step-up). El drenaje percutáneo se usa en colecciones infectadas.",
    dificultad: "dificil",
    tags: ["pancreatitis aguda", "necrosis pancreática", "antibióticos", "step-up approach"],
    tiempoMedioSegundos: 120,
  },
  {
    id: "mir2022-015",
    numero: 15,
    año: 2022,
    convocatoria: "MIR 2022-2023",
    especialidad: "ginecologia",
    tema: "Obstetricia",
    subtema: "Patología obstétrica",
    enunciado:
      "Gestante de 32 semanas con tensión arterial 158/104 mmHg, proteinuria de 24h de 0,6 g, cefalea intensa y alteraciones visuales. Analítica normal. ¿Cuál es el diagnóstico y el tratamiento de elección?",
    opciones: [
      { id: "a", texto: "Hipertensión gestacional. Labetalol oral" },
      { id: "b", texto: "Preeclampsia grave. Sulfato de magnesio + labetalol IV + finalización" },
      { id: "c", texto: "Preeclampsia leve. Reposo y control ambulatorio" },
      { id: "d", texto: "Crisis hipertensiva. Nifedipino IV urgente" },
      { id: "e", texto: "Eclampsia. Diazepam IV y cesárea urgente" },
    ],
    respuestaCorrecta: "b",
    explicacion:
      "Preeclampsia grave (TA ≥160/110 + proteinuria + síntomas severos: cefalea, alteraciones visuales). Tratamiento: 1) Sulfato de magnesio para prevención de eclampsia, 2) Antihipertensivo IV (labetalol, hidralazina o nifedipino oral), 3) Finalización de la gestación. No es eclampsia porque no hay convulsiones. La finalización se indica a partir de 34 semanas o antes si inestabilidad materna.",
    dificultad: "media",
    tags: ["preeclampsia grave", "sulfato de magnesio", "hipertensión gestacional"],
    tiempoMedioSegundos: 95,
  },
  {
    id: "mir2022-020",
    numero: 20,
    año: 2022,
    convocatoria: "MIR 2022-2023",
    especialidad: "psiquiatria",
    tema: "Trastornos del estado de ánimo",
    subtema: "Trastorno bipolar",
    enunciado:
      "Mujer de 30 años con diagnóstico de trastorno bipolar tipo I en tratamiento con litio. Acude a urgencias por gestación de 6 semanas. ¿Cuál es la actitud más correcta respecto al litio?",
    opciones: [
      { id: "a", texto: "Suspender el litio bruscamente por teratogenicidad alta en primer trimestre" },
      { id: "b", texto: "Mantener el litio por el alto riesgo de recurrencia, con controles estrictos" },
      { id: "c", texto: "Sustituir por ácido valproico que es más seguro en el embarazo" },
      { id: "d", texto: "Suspender gradualmente y sustituir por lamotrigina" },
      { id: "e", texto: "Suspender el litio y no administrar ningún tratamiento durante el primer trimestre" },
    ],
    respuestaCorrecta: "b",
    explicacion:
      "El litio en el embarazo tiene riesgo teratogénico (anomalía de Ebstein) pero el riesgo es bajo (<1%). La decisión debe individualizarse. En TB tipo I con alto riesgo de recaída grave, puede mantenerse el litio con monitorización estrecha. El ácido valproico está contraindicado en embarazo (teratógeno mayor, espina bífida). La suspensión brusca tiene riesgo de rebote maníaco grave. La lamotrigina es una alternativa, pero no siempre superior.",
    dificultad: "dificil",
    tags: ["trastorno bipolar", "litio", "embarazo", "teratogenicidad"],
    tiempoMedioSegundos: 115,
  },
];

export function getPreguntasByEspecialidad(slug: string): Pregunta[] {
  return preguntasMock.filter((p) => p.especialidad === slug);
}

export function getPreguntasByAño(año: number): Pregunta[] {
  return preguntasMock.filter((p) => p.año === año);
}

export function getPreguntaById(id: string): Pregunta | undefined {
  return preguntasMock.find((p) => p.id === id);
}

export const añosDisponibles = [2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015];
