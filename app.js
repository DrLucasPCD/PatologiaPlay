/* ========= PERFIL E QUALIDADE DE VIDA NO APP =========
   - Pergunta o nome na primeira visita e salva em localStorage.
   - Mostra iniciais no avatar e botão para editar.
======================================================= */

/* ======== Conteúdo didático ======== */
const CONTENT = [
  /* ---------- MÓDULOS ORIGINAIS (revistos) ---------- */
  {
    id: "intro",
    title: "Introdução à Patologia",
    lessons: [
      {
        title: "Conceitos essenciais",
        resumo: [
          "Patologia = estudo da doença (não é sinônimo de doença).",
          "Elementos: etiologia (causa), patogênese (mecanismo/evolução), citopatologia (célula), histopatologia (tecido), anatomia patológica (macro), fisiopatologia (função).",
          "Divisão: Patologia Geral (processos básicos) e Especial (doenças por sistema/órgão)."
        ],
        detalhes: [
          "Exame clínico = anamnese + exame físico; complementares quando necessário.",
          "Citologia observa células isoladas; perde arquitetura.",
          "Histopatologia preserva arquitetura estroma–parênquima; é ‘o resultado da biópsia’."
        ]
      }
    ],
    flashcards: [
      { q: "Patogênese?", a: "Sequência de eventos/mecanismos do estímulo à expressão clínica." },
      { q: "Histo vs Cito?", a: "Histo avalia tecido (arquitetura); Cito avalia células avulsas." }
    ],
    quiz: [
      {
        q: "Patologia Geral x Especial, assinale a correta:",
        options: [
          "Geral descreve doenças por órgão.",
          "Especial resume processos básicos comuns a todas as doenças.",
          "Geral trata de lesão, morte celular, inflamação etc.",
          "Nenhuma."
        ],
        answer: 2,
        exp: "Patologia Geral cobre os processos elementares; a Especial foca doenças específicas."
      },
      {
        q: "Par correto:",
        options: [
          "Etiologia — curso temporal da doença",
          "Patogênese — mecanismo de desenvolvimento",
          "Fisiopatologia — descrição morfológica",
          "Citopatologia — avaliação do estroma"
        ],
        answer: 1,
        exp: "Patogênese = mecanismo; Fisiopatologia trata da função; Citologia vê células avulsas."
      }
    ]
  },

  {
    id: "exames",
    title: "Exames Complementares",
    lessons: [
      {
        title: "Citologia (Citodiagnóstico)",
        resumo: [
          "Rápida, barata, minimamente invasiva; avalia células soltas.",
          "Indicações: triagem de massas acessíveis, suspeitas de malignidade, PAAF de nódulos.",
          "Limitação: perde arquitetura tecidual (infiltração/margens)."
        ],
        detalhes: [
          "Contraindicações relativas: áreas necróticas/hemorrágicas/crostas espessas.",
          "Coleta: esfoliativa, abrasiva, PAAF, base líquida.",
          "Classes III–V exigem correlação histopatológica."
        ]
      },
      {
        title: "Biópsia (Anatomopatológico)",
        resumo: [
          "Padrão-ouro para arquitetura; incisional (parte) e excisional (toda).",
          "Técnicas: punch, curetagem, bisturi, congelação intraoperatória."
        ],
        detalhes: [
          "Fixador universal: formol 10% tamponado (~20x o volume da peça).",
          "Indicações e cuidados de envio influenciam a qualidade do laudo."
        ]
      }
    ],
    flashcards: [
      { q: "Fixador universal histológico?", a: "Formol 10% tamponado." },
      { q: "Limitação central da citologia?", a: "Perda de arquitetura; infiltração fica incerta." }
    ],
    quiz: [
      {
        q: "Quando a congelação intraoperatória é preferida?",
        options: [
          "Dúvida de margem em tempo real",
          "Pesquisa de micobactéria",
          "Estudo ultraestrutural",
          "Imunofluorescência direta"
        ],
        answer: 0,
        exp: "Congelação sacrifica qualidade morfológica, mas é rápida para decisão intra-op."
      },
      {
        q: "Boa prática ao enviar peça cirúrgica:",
        options: [
          "Guardar sem fixador para ‘não encolher’",
          "Fixar imediatamente em formol 10% (volume generoso)",
          "Adicionar água para ‘diluir’ o formol",
          "Não rotular para evitar viés"
        ],
        answer: 1,
        exp: "Fixação imediata e identificação correta preservam o material e o contexto."
      }
    ]
  },

  {
    id: "lesao",
    title: "Lesão e Morte Celular",
    lessons: [
      {
        title: "Lesão reversível x irreversível",
        resumo: [
          "Agressão → adaptação ou lesão.",
          "Reversível: retorna à função; Irreversível: morte celular."
        ],
        detalhes: [
          "Agentes físicos, químicos, biológicos; intensidade/duração definem o desfecho.",
          "Tecido/órgão tem limiar próprio para sofrer dano."
        ]
      },
      {
        title: "Necrose",
        resumo: [
          "Morte celular em vivo + autólise; processo tecidual; inflamatória.",
          "Núcleo: picnose → cariorrexe → cariólise."
        ],
        detalhes: [
          "Tipos: coagulativa (arcabouço preservado), liquefativa (enzimática, SNC/abscessos), caseosa (granulomas), gordurosa (saponificação), gomosa etc."
        ]
      },
      {
        title: "Apoptose",
        resumo: [
          "Morte programada, isolada, energia-dependente, sem inflamação relevante.",
          "Fragmentos (corpos apoptóticos) fagocitados localmente."
        ],
        detalhes: [
          "Vias intrínseca (mito, p53, caspase-9) e extrínseca (Fas/TNF, caspase-8) → caspase-3."
        ]
      }
    ],
    flashcards: [
      { q: "Sequência nuclear na necrose?", a: "Picnose → Cariorrexe → Cariólise." },
      { q: "Necrose do SNC em hipóxia?", a: "Liquefativa/coliquativa." },
      { q: "Apoptose inflama?", a: "Não; é imunologicamente silenciosa." }
    ],
    quiz: [
      {
        q: "Assinale a correta:",
        options: [
          "Necrose nunca inflama",
          "Apoptose forma pus",
          "Coagulativa preserva arquitetura inicial",
          "Liquefativa independe de enzimas lisossomais"
        ],
        answer: 2,
        exp: "Coagulativa mantém o arcabouço no início; liquefativa é enzimática; apoptose não gera pus."
      },
      {
        q: "Degeneração hidrópica inicia-se por falha de:",
        options: ["Na+/K+ ATPase", "Caspase-3", "Topoisomerase I", "Transcrição de p21"],
        answer: 0,
        exp: "Falha de bomba iônica → edema celular e vacuolização."
      }
    ]
  },

  {
    id: "lesoes_elementares",
    title: "Lesões Elementares (Pele/Mucosas)",
    lessons: [
      {
        title: "Definições rápidas",
        resumo: [
          "Mácula = cor sem relevo.",
          "Placa = elevação >1 cm, topo plano.",
          "Pápula <1 cm (sólida), nódulo profundo, tumor volumoso.",
          "Vesícula <1 cm; bolha ≥1 cm (líquido).",
          "Erosão (perda parcial epitélio) x úlcera (perda total, expõe conjuntivo)."
        ],
        detalhes: ["Semiologia elementar para correlacionar clínica com patologia."]
      }
    ],
    flashcards: [
      { q: "Vesícula vs bolha?", a: "Vesícula <1 cm; bolha ≥1 cm." },
      { q: "Úlcera expõe?", a: "Tecidos conjuntivos subjacentes." }
    ],
    quiz: [
      {
        q: "Correta:",
        options: [
          "Nódulo = sempre superficial e menor que pápula",
          "Placa é ampla e plana no topo",
          "Erosão = perda total do epitélio",
          "Bolha = sólida"
        ],
        answer: 1,
        exp: "Placa é elevada e plana; erosão é perda parcial."
      }
    ]
  },

  {
    id: "calcificacoes",
    title: "Calcificações Patológicas",
    lessons: [
      {
        title: "Distrófica x Metastática",
        resumo: [
          "Distrófica: em tecido lesado; cálcio sérico normal.",
          "Metastática: disseminada; hipercalcemia; sem lesão prévia necessária."
        ],
        detalhes: [
          "Distrófica nucleia em vesículas de matriz; colágeno ajuda a ancoragem.",
          "Morfologia macro/micro pode ser semelhante."
        ]
      },
      {
        title: "Morfologia/efeitos",
        resumo: [
          "Macro: nódulos firmes, esbranquiçados, radiopacos.",
          "Micro: acidófilo → grumos basofílicos.",
          "Impacto clínico depende do local/volume."
        ],
        detalhes: [
          "Litíases: estase, infecção/inflamação, corpo estranho; radiopacidade variável conforme composição."
        ]
      }
    ],
    flashcards: [
      { q: "Distrófica precisa de hipercalcemia?", a: "Não." },
      { q: "Metastática precisa de lesão prévia?", a: "Não; depende de hipercalcemia." }
    ],
    quiz: [
      {
        q: "Verdadeiro sobre calcificação:",
        options: [
          "Metastática exige necrose prévia",
          "Distrófica depende de hipercalcemia",
          "Ambas podem ser basofílicas na HE ao progredir",
          "Nenhuma"
        ],
        answer: 2,
        exp: "Os depósitos tornam-se mais basofílicos; o contexto bioquímico diferencia."
      }
    ]
  },

  {
    id: "disturbios",
    title: "Distúrbios de Crescimento e Diferenciação",
    lessons: [
      {
        title: "Panorama",
        resumo: [
          "Volume: hipotrofia/hipertrofia; Número: hipoplasia/hiperplasia.",
          "Diferenciação: metaplasia; Arquitetura/núcleo: displasia; CIS = atipia plena sem invasão."
        ],
        detalhes: [
          "Ex.: metaplasia escamosa em brônquio de tabagista; displasia com risco de progressão."
        ]
      }
    ],
    flashcards: [
      { q: "Metaplasia é…", a: "Substituição adaptativa por fenótipo mais tolerante." },
      { q: "CIS invade membrana basal?", a: "Não." }
    ],
    quiz: [
      {
        q: "Alteração do NÚMERO de células:",
        options: ["Hiperplasia", "Hipertrofia", "Hipotrofia", "Metaplasia"],
        answer: 0,
        exp: "Hiperplasia aumenta número; hipertrofia aumenta volume."
      }
    ]
  },

  {
    id: "degeneracoes",
    title: "Degenerações Celulares",
    lessons: [
      {
        title: "Principais",
        resumo: [
          "Hidrópica: falha Na+/K+ → edema.",
          "Hialina/mucoide: acúmulos proteicos/mucopolissacarídeos.",
          "Esteatose: triglicerídeos (fígado; álcool/DM/desnutrição)."
        ],
        detalhes: [
          "Esteatose macro vs microvesicular; reversível ao remover a causa."
        ]
      }
    ],
    flashcards: [
      { q: "Bomba que falha na hidrópica?", a: "Na+/K+ ATPase." },
      { q: "Órgão clássico da esteatose?", a: "Fígado." }
    ],
    quiz: [
      {
        q: "Sobre esteatose, assinale:",
        options: [
          "Sempre irreversível",
          "Acúmulo de triglicerídeos citoplasmáticos",
          "Exclusiva do coração",
          "Sem relação com álcool"
        ],
        answer: 1,
        exp: "É reversível com retirada do agente; álcool é causa comum."
      }
    ]
  },

  /* ---------- NOVOS MÓDULOS COM BANCA ESTILO PROVA ---------- */

  {
    id: "inflamacao",
    title: "Inflamação (Aguda, Crônica e Granulomas)",
    lessons: [
      {
        title: "Inflamação Aguda",
        resumo: [
          "Vascular: vasodilatação → aumento de permeabilidade → estase.",
          "Celular: marginação → rolamento → adesão → transmigração (diapedese)."
        ],
        detalhes: [
          "Exsudatos: seroso, fibrinoso, purulento; padrão e causa definem morfologia."
        ]
      },
      {
        title: "Inflamação Crônica / Granulomatosa",
        resumo: [
          "Predomínio de mononucleares (macrófagos/linfócitos).",
          "Granuloma: arranjo focal de macrófagos epitelioides ± células gigantes."
        ],
        detalhes: [
          "Granulomas imunes (ex.: TB) vs corpo estranho; células gigantes tipo Langhans/estrangeiro."
        ]
      },
      {
        title: "Mediadores",
        resumo: [
          "Histamina: vasodilatação e ↑ permeabilidade.",
          "AA: COX → prostaglandinas/tromboxanos; LOX → leucotrienos."
        ],
        detalhes: [
          "Citocinas (IL-1/TNF): febre, resposta de fase aguda; quimiocinas: quimiotaxia."
        ]
      }
    ],
    flashcards: [
      { q: "Sequência celular na vênula pós-capilar?", a: "Marginação → rolamento → adesão → diapedese." },
      { q: "Granuloma: célula-chave?", a: "Macrófago epitelioide (± células gigantes)." }
    ],
    quiz: [
      {
        q: "Primeiro contato transitório do leucócito com o endotélio denomina-se:",
        options: ["Adesão firme", "Rolamento", "Diapedese", "Activação plaquetária"],
        answer: 1,
        exp: "Rolamento mediado por selectinas precede a adesão firme (integrinas)."
      },
      {
        q: "Assinale o mediador mais relacionado à broncoconstrição potente:",
        options: ["Histamina", "Prostaciclina (PGI2)", "Leucotrienos C4/D4/E4", "NO endotelial"],
        answer: 2,
        exp: "Leucotrienos cisteínicos são broncoconstritores marcantes."
      },
      {
        q: "Granuloma típico (imune) apresenta:",
        options: [
          "Neutrofilia em ‘tapete’",
          "Macrófagos epitelioides e células gigantes",
          "Plasmócitos exclusivos",
          "Ausência de linfócitos T"
        ],
        answer: 1,
        exp: "Arranjo focal com macrófagos transformados e, não raro, células gigantes."
      },
      {
        q: "Padrão purulento está ligado a:",
        options: ["Transudato proteico", "Exsudato rico em neutrófilos e detritos", "Fibrose organizada", "Líquido seroso de baixa proteína"],
        answer: 1,
        exp: "Pus = neutrófilos + detritos celulares/bacterianos."
      },
      {
        q: "Citocina mais ligada à febre e fase aguda:",
        options: ["IL-5", "IL-1/TNF", "IL-10", "TGF-β"],
        answer: 1,
        exp: "IL-1/TNF induzem prostaglandinas no hipotálamo e resposta de fase aguda hepática."
      },
      {
        q: "Resposta crônica tende a manter-se quando predomina o fenômeno:",
        options: ["Vascular", "Exsudativo", "Produtivo (celular/tecidual)", "Hemodinâmico"],
        answer: 2,
        exp: "Produção e organização tecidual sustentam a cronificação."
      },
      {
        q: "Células gigantes tipo Langhans têm núcleos:",
        options: ["Aglomerados no centro", "Dispostos em ferradura na periferia", "Ausentes", "Fragmentados como corpos apoptóticos"],
        answer: 1,
        exp: "Langhans: arranjo periférico em coroa; corpo estranho: núcleos mais centrais/irregulares."
      },
      {
        q: "Exemplo de exsudato fibrinoso:",
        options: ["Bolha subepidérmica", "Pericardite com 'cabelos de anjo'", "Edema por hipoalbuminemia", "Ascite cirrótica"],
        answer: 1,
        exp: "Depósito de fibrina nas superfícies serosas em inflamação aguda intensa."
      }
    ]
  },

  {
    id: "hemodinamica",
    title: "Hemodinâmica: Hemostasia, Tromboembolismo, Choque",
    lessons: [
      {
        title: "Hemostasia e Trombose",
        resumo: [
          "Hemostasia primária: adesão, ativação e agregação plaquetar.",
          "Tríade de Virchow: lesão endotelial, fluxo anormal, hipercoagulabilidade."
        ],
        detalhes: [
          "Evolução do trombo: crescimento, embolização, organização (± recanalização), lise."
        ]
      },
      {
        title: "Embolia, Hemorragia, Choque",
        resumo: [
          "Embolia: êmbolo trombótico, gorduroso, aéreo, líquido amniótico etc.",
          "Choque: hipovolêmico, cardiogênico, distributivo (séptico/anafilático/neurogênico)."
        ],
        detalhes: [
          "Hemorragia: petéquias, púrpuras, equimoses, hematomas; hemossiderina/hematoidina como pigmentos."
        ]
      }
    ],
    flashcards: [
      { q: "Tríade de Virchow?", a: "Lesão endotelial; fluxo anormal; hipercoagulabilidade." },
      { q: "Quais etapas da hemostasia primária?", a: "Adesão → ativação/secreção → agregação." }
    ],
    quiz: [
      {
        q: "Processo evolutivo que pode recanalizar trombo:",
        options: ["Crescimento", "Embolização", "Organização", "Infeção secundária"],
        answer: 2,
        exp: "Organização por tecido de granulação pode abrir canais (recanalização)."
      },
      {
        q: "Plaquetas na hemostasia primária realizam, principalmente:",
        options: ["Fagocitose, lise e mitose", "Adesão, secreção e agregação", "Quimiotaxia, opsonização e lise", "Endocitose, trânsito e extrusão"],
        answer: 1,
        exp: "Adesão (vWF-GPIb), ativação/secreção e agregação (GPIIb/IIIa-fibrinogênio)."
      },
      {
        q: "Choque distributivo típico cursa com:",
        options: ["Vasoconstrição periférica intensa sustentada", "Redução do volume intravascular por hemorragia", "Vasodilatação e má distribuição de fluxo", "Obstrução mecânica ao retorno venoso"],
        answer: 2,
        exp: "No séptico/anafilático há vasoplegia e má distribuição do fluxo."
      },
      {
        q: "Hemorragia puntiforme cutânea denomina-se:",
        options: ["Equimose", "Hematoma", "Púrpura", "Petéquia"],
        answer: 3,
        exp: "Petéquias são pequenas; equimoses são maiores e planas; hematomas têm volume."
      },
      {
        q: "Infarto vermelho é mais provável em:",
        options: ["Órgãos com dupla circulação ou congestão/reperfusão", "Rim cortical por oclusão arterial", "Baço por artéria terminal", "Cérebro em oclusão arterial precoce"],
        answer: 0,
        exp: "Tecido frouxo ou com dupla circulação e reperfusão favorecem infarto hemorrágico."
      },
      {
        q: "Hipercoagulabilidade herdada comum:",
        options: ["Mutação Leiden do fator V", "Deficiência de plasmina", "Excesso de NO", "Defeito de protrombina G20210A inexistente"],
        answer: 0,
        exp: "Fator V Leiden torna o fator resistente à proteína C ativada, pró-trombótico."
      },
      {
        q: "Pigmento pardo-amarelado em macrófagos após hemorragia:",
        options: ["Melanina", "Hemossiderina", "Bilirrubina conjugada", "Lipofuscina"],
        answer: 1,
        exp: "Hemossiderina é depósito férrico derivado da degradação da Hb."
      }
    ]
  },

  {
    id: "neoplasias",
    title: "Neoplasias: Benignas x Malignas e Estadiamento",
    lessons: [
      {
        title: "Benigno x Maligno",
        resumo: [
          "Benignos: bem delimitados, crescimento expansivo, sem metástase.",
          "Malignos: infiltrativos, anaplasia, metástases, necrose/hemorragia frequentes."
        ],
        detalhes: [
          "Nomenclatura: sufixo -oma (geralmente benigno); carcinomas/sarcomas para malignos.",
          "Gradação (grau) e Estadiamento (TNM) são coisas diferentes."
        ]
      },
      {
        title: "TNM (conceitos)",
        resumo: [
          "T: tumor primário (tamanho/ extensão local).",
          "N: linfonodos regionais.",
          "M: metástases à distância."
        ],
        detalhes: [
          "Estádio piora com aumento de T, N e presença de M; cada sítio tem regras próprias."
        ]
      }
    ],
    flashcards: [
      { q: "O que diferencia CIS de invasivo?", a: "CIS não atravessa membrana basal." },
      { q: "Expansivo x infiltrativo?", a: "Benigno: expansivo; Maligno: infiltra estroma/adjacências." }
    ],
    quiz: [
      {
        q: "Característica que explica hemorragias em tumores malignos:",
        options: ["Cápsula fibrosa espessa", "Crescimento infiltrativo e neovascular frágil", "Mitoses raras", "Diferença mínima do tecido nativo"],
        answer: 1,
        exp: "Invasão e neoangiogênese imatura facilitam hemorragia/necrose."
      },
      {
        q: "No TNM, N refere-se a:",
        options: ["Tamanho do tumor em cm", "Invasão vascular", "Comprometimento linfonodal regional", "Metástases à distância"],
        answer: 2,
        exp: "N = linfonodos regionais; M = distância; T = extensão local."
      },
      {
        q: "Benignos costumam:",
        options: ["Fazer metástase hematogênica", "Ser encapsulados e bem delimitados", "Ser invariavelmente letais", "Exibir anaplasia intensa"],
        answer: 1,
        exp: "Crescem expansivamente e podem ser encapsulados."
      },
      {
        q: "Escolha a associação correta de nomenclatura benigna:",
        options: ["Osteoma — tecido ósseo", "Adenocarcinoma — benigno glandular", "Liposarcoma — benigno adiposo", "Leioma — maligno músculo liso"],
        answer: 0,
        exp: "Osteoma/lipoma/adenoma/fibroma costumam ser benignos."
      },
      {
        q: "Comparando T3N1M0 vs T2N0M0, é correto afirmar:",
        options: [
          "O segundo é mais avançado por somar menos",
          "O primeiro tem pior estágio pela presença de N1",
          "O ‘M’ não importa no estadiamento",
          "T sempre se sobrepõe a N"
        ],
        answer: 1,
        exp: "N positivo piora o estádio; presença de M geralmente define estágio IV."
      }
    ]
  },

  {
    id: "reparo",
    title: "Reparo Tecidual e Cicatrização",
    lessons: [
      {
        title: "Fases do reparo",
        resumo: [
          "Hemostasia → inflamação → proliferação (tecido de granulação) → remodelação.",
          "Contratilidade por miofibroblastos reduz área da ferida."
        ],
        detalhes: [
          "Primeira intenção (bordas aproximadas) x segunda intenção (perda tecidual grande)."
        ]
      },
      {
        title: "Complicações",
        resumo: [
          "Deiscência, infecção, quelóide, cicatriz hipertrófica, contraturas.",
          "Fatores que retardam: má perfusão, infecção, diabetes, desnutrição, corticoide."
        ],
        detalhes: [
          "Equilíbrio colágeno síntese/degradação determina força tensil ao longo dos meses."
        ]
      }
    ],
    flashcards: [
      { q: "Tecido de granulação contém…", a: "Capilares recém-formados + fibroblastos + matriz provisória." },
      { q: "Quem contrai ferida?", a: "Miofibroblastos." }
    ],
    quiz: [
      {
        q: "A contração da ferida ocorre principalmente em qual fase?",
        options: ["Hemostasia", "Inflamatória", "Proliferação", "Remodelação"],
        answer: 2,
        exp: "Miofibroblastos emergem no tecido de granulação (fase proliferativa)."
      },
      {
        q: "Fator que atrasa a cicatrização:",
        options: ["Boa perfusão", "Infecção persistente", "Nutrição adequada", "Glicemia controlada"],
        answer: 1,
        exp: "Infecção prolonga a fase inflamatória e degrada matriz."
      },
      {
        q: "Cicatriz quelóide caracteriza-se por:",
        options: [
          "Excesso de colágeno além das bordas da ferida",
          "Colágeno reduzido e friável",
          "Ausência de fibroblastos",
          "Predomínio exclusivo de elastina"
        ],
        answer: 0,
        exp: "Quelóide ultrapassa margens e tende à recidiva."
      },
      {
        q: "Primeira intenção implica:",
        options: ["Perda tecidual extensa", "Bordas bem aproximadas", "Necessidade de enxerto sempre", "Cicatriz exuberante inevitável"],
        answer: 1,
        exp: "Fechamento primário minimiza granulação e contração."
      }
    ]
  }
];

/* ======== Banco de SVGs: necrose/apoptose (mantido) ======== */
const SVG_BANK = [
  {
    id: "svg-coagulativa",
    title: "Necrose Coagulativa (Arcabouço preservado)",
    svg: `
    <svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Necrose coagulativa">
      <rect x="0" y="0" width="320" height="200" fill="#0c1626"/>
      <g font-family="system-ui" font-size="12" fill="#9db0d0">
        <text x="12" y="18">Arcabouço preservado (coagulação de proteínas)</text>
      </g>
      <g>
        <rect x="20" y="40" width="280" height="120" fill="none" stroke="#7aa2ff" stroke-dasharray="3 3"/>
        ${[...Array(7)].map((_,i)=> {
          const cx = 40 + i*40;
          return `
            <g transform="translate(${cx},70)">
              <rect x="-14" y="-14" width="28" height="28" fill="none" stroke="#5eead4"/>
              <circle cx="0" cy="0" r="6" fill="#ffb4b4"/>
              <text x="-10" y="36" fill="#9db0d0">${i<3?'Picnose':i<5?'Cariorrexe':'Cariólise'}</text>
            </g>
          `;
        }).join('')}
      </g>
      <text x="20" y="180" fill="#e6ecff">Isquemia tecidual típica (miocárdio, rim): arquitetura inicial mantida.</text>
    </svg>`
  },
  {
    id: "svg-liquefativa",
    title: "Necrose Liquefativa (dissolução enzimática)",
    svg: `
    <svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Necrose liquefativa">
      <rect width="320" height="200" fill="#0c1626"/>
      <text x="12" y="18" fill="#9db0d0">Autólise intensa → cavidade líquida (abscesso/SNC)</text>
      <rect x="20" y="40" width="280" height="120" fill="none" stroke="#7aa2ff" stroke-dasharray="3 3"/>
      <ellipse cx="160" cy="100" rx="80" ry="40" fill="#1a2b44" stroke="#7aa2ff"/>
      ${[...Array(12)].map((_,i)=>{
        const ang = (i/12)*Math.PI*2;
        const x = 160 + Math.cos(ang)*55;
        const y = 100 + Math.sin(ang)*25;
        return `<path d="M${x} ${y} l6 -3 l-2 8 z" fill="#ff6b6b" />`;
      }).join('')}
      <text x="24" y="180" fill="#e6ecff">Predomina em SNC hipóxico e abscessos por enzimas neutrofílicas.</text>
    </svg>`
  },
  {
    id: "svg-caseosa",
    title: "Necrose Caseosa (granuloma com centro 'queijoso')",
    svg: `
    <svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Necrose caseosa">
      <rect width="320" height="200" fill="#0c1626"/>
      <text x="12" y="18" fill="#9db0d0">Granuloma (TB): centro amorfo granular</text>
      <circle cx="160" cy="100" r="60" fill="#13243a" stroke="#7aa2ff"/>
      <circle cx="160" cy="100" r="28" fill="#3a2b2b" stroke="#ffb3b3"/>
      <text x="132" y="105" fill="#ffd6d6">‘Queijo’</text>
      ${[...Array(10)].map((_,i)=>{
        const a = (i/10)*Math.PI*2;
        const x = 160 + Math.cos(a)*45;
        const y = 100 + Math.sin(a)*45;
        return `<circle cx="${x}" cy="${y}" r="6" fill="#5eead4"/>`;
      }).join('')}
      <text x="24" y="180" fill="#e6ecff">Macrófagos epitelioides + células gigantes + linfócitos ao redor.</text>
    </svg>`
  },
  {
    id: "svg-apoptose-vias",
    title: "Apoptose (vias intrínseca e extrínseca → caspase-3)",
    svg: `
    <svg viewBox="0 0 360 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Apoptose vias">
      <rect width="360" height="220" fill="#0c1626"/>
      <g font-family="system-ui" font-size="12">
        <rect x="20" y="40" width="130" height="36" rx="8" fill="#102136" stroke="#7aa2ff"/>
        <text x="32" y="62" fill="#e6ecff">Extrínseca (Fas/TNF)</text>
        <rect x="210" y="40" width="130" height="36" rx="8" fill="#102136" stroke="#7aa2ff"/>
        <text x="222" y="62" fill="#e6ecff">Intrínseca (mito/P53)</text>
        <rect x="115" y="110" width="130" height="36" rx="8" fill="#102136" stroke="#5eead4"/>
        <text x="147" y="132" fill="#e6ecff">Caspase-3</text>
        <rect x="115" y="170" width="130" height="36" rx="8" fill="#102136" stroke="#5eead4"/>
        <text x="130" y="192" fill="#e6ecff">Corpos apoptóticos</text>
      </g>
      <path d="M150 76 L150 110" stroke="#7aa2ff" fill="none" marker-end="url(#arr)" />
      <path d="M225 76 L225 110" stroke="#7aa2ff" fill="none" marker-end="url(#arr)" />
      <path d="M180 146 L180 170" stroke="#5eead4" fill="none" marker-end="url(#arr)" />
      <defs>
        <marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L6,3 z" fill="#7aa2ff"/>
        </marker>
      </defs>
    </svg>`
  },
  {
    id: "svg-apoptose-morf",
    title: "Morfologia da Apoptose (blebs e corpos apoptóticos)",
    svg: `
    <svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Apoptose morfologia">
      <rect width="320" height="200" fill="#0c1626"/>
      <text x="12" y="18" fill="#9db0d0">Blebs → fragmentação → fagocitose</text>
      <g>
        <circle cx="110" cy="110" r="40" fill="#102136" stroke="#7aa2ff"/>
        ${[...Array(6)].map((_,i)=>{
          const a = (i/6)*Math.PI*2;
          const x = 110 + Math.cos(a)*40;
          const y = 110 + Math.sin(a)*40;
          return `<circle cx="${x}" cy="${y}" r="10" fill="#102136" stroke="#7aa2ff"/>`;
        }).join('')}
        <circle cx="110" cy="110" r="10" fill="#ffb4b4"/>
      </g>
      <g>
        <circle cx="230" cy="120" r="10" fill="#1b2a44" stroke="#5eead4"/>
        <circle cx="255" cy="105" r="8" fill="#1b2a44" stroke="#5eead4"/>
        <circle cx="245" cy="140" r="7" fill="#1b2a44" stroke="#5eead4"/>
      </g>
      <text x="24" y="180" fill="#e6ecff">Sem inflamação relevante: vizinhas/FA’s limpam os corpos.</text>
    </svg>`
  }
];

/* ======== Helpers Dom e Estado ======== */
const $ = (q, el=document)=>el.querySelector(q);
const $$ = (q, el=document)=>Array.from(el.querySelectorAll(q));

const state = {
  theme: localStorage.getItem("theme") || "dark",
  dys: localStorage.getItem("dys") === "1",
  progress: JSON.parse(localStorage.getItem("progress") || "{}"),
  search: "",
  exam: null, // {pool, idx, answers, timeLeft, timerId, startedAt}
  user: { name: localStorage.getItem("userName") || "" }
};

let _cloudSaveTimer = null;
function saveProgress(){
  // salva local + agenda sync na nuvem (se logado)
  saveProgressLocal();
  const user = isFirebaseReady() ? firebase.auth().currentUser : null;
  if(user) scheduleCloudSave();
}
function saveProgressLocal(){
  localStorage.setItem("progress", JSON.stringify(state.progress));
  localStorage.setItem("progressUpdatedAt", String(Date.now()));
}
function getDB(){ try{ return window.db || (firebase.firestore && firebase.firestore()); }catch(e){ return null; } }
function scheduleCloudSave(){
  clearTimeout(_cloudSaveTimer);
  _cloudSaveTimer = setTimeout(saveProgressToCloud, 800);
}
async function saveProgressToCloud(){
  try{
    const user = isFirebaseReady() ? firebase.auth().currentUser : null;
    const db = getDB();
    if(!user || !db) return;
    const ref = db.collection('patologia_progress').doc(user.uid);
    await ref.set({ progress: state.progress || {}, updatedAt: Date.now() }, { merge: true });
  }catch(e){ /* offline/sem permissão */ }
}
async function loadProgressFromCloud(){
  try{
    const user = isFirebaseReady() ? firebase.auth().currentUser : null;
    const db = getDB();
    if(!user || !db) return;
    const ref = db.collection('patologia_progress').doc(user.uid);
    const snap = await ref.get();
    if(snap.exists){
      const data = snap.data() || {};
      mergeProgress(data.progress || {}, data.updatedAt || 0);
    }
  }catch(e){ /* noop */ }
}
function mergeProgress(remote, remoteUpdatedAt){
  const localUpdatedAt = parseInt(localStorage.getItem('progressUpdatedAt')||'0',10);
  if(!remote || Object.keys(remote).length===0){ return; }

  if(!state.progress || Object.keys(state.progress).length===0){
    state.progress = remote;
  }else{
    const merged = { ...state.progress };
    Object.keys(remote).forEach(id=>{
      const L = merged[id] || {};
      const R = remote[id] || {};
      merged[id] = {
        quizScore: Math.max(L.quizScore||0, R.quizScore||0),
        inprog: Boolean(L.inprog || R.inprog),
        done:   Boolean(L.done   || R.done)
      };
    });
    state.progress = merged;
  }

  const stamp = Math.max(remoteUpdatedAt||0, localUpdatedAt||0, Date.now());
  localStorage.setItem('progress', JSON.stringify(state.progress));
  localStorage.setItem('progressUpdatedAt', String(stamp));
  renderNav();
}
function setTheme(t){ state.theme = t; document.documentElement.dataset.theme = t; localStorage.setItem("theme", t); }
function setDys(on){ state.dys = on; document.body.classList.toggle("dyslexia", on); localStorage.setItem("dys",""+(on?1:0)); }

function setSidebar(open){
  const sb = document.querySelector('#sidebar');
  const bd = document.querySelector('#drawerBackdrop');
  const mb = document.querySelector('#menuBtn');
  if(!sb || !bd) return;
  sb.classList.toggle('open', !!open);
  bd.classList.toggle('show', !!open);
  if(mb) mb.setAttribute('aria-expanded', open? 'true':'false');
  document.body.style.overflow = open ? 'hidden' : '';
}
function syncHeaderH(){
  const h = document.querySelector('.app-header')?.offsetHeight || 64;
  document.documentElement.style.setProperty('--header-h', h + 'px');
}

function isFirebaseReady(){ return typeof firebase !== "undefined" && firebase.auth; }
function openAuthModal(){ const m = document.getElementById('authModal'); if(m){ m.classList.add('show'); m.setAttribute('aria-hidden','false'); } }
function closeAuthModal(){ const m = document.getElementById('authModal'); if(m){ m.classList.remove('show'); m.setAttribute('aria-hidden','true'); } }
function showPaywall(show=true){
  const pw = document.getElementById('paywall');
  if(!pw) return;
  pw.classList.toggle('show', !!show);
  pw.setAttribute('aria-hidden', show? 'false':'true');
}
function hidePaywall(){ showPaywall(false); }

/* ======== Perfil (nome e avatar) ======== */
function getInitials(n){
  return (n||"Visitante").trim().split(/\s+/).slice(0,2).map(s=>s[0]).join("").toUpperCase() || "?"
}
function renderProfile(){
  const user = isFirebaseReady() ? firebase.auth().currentUser : null;
  const nameFromAuth = user ? (user.displayName || user.email) : null;
  const name = nameFromAuth || state.user.name || "Visitante";
  const hello = document.querySelector('.profile .hello');
  const av = document.querySelector('.profile .avatar');
  if(hello) hello.textContent = `Bem-vindo, ${String(name).split('@')[0].replace(/\b\w/g, c=>c.toUpperCase())}`;
  if(av) av.textContent = getInitials(name);
}
function askName(){
  const user = isFirebaseReady() ? firebase.auth().currentUser : null;
  const current = (state.user.name || "").trim();
  const n = prompt("Como você quer ser chamado?", current);
  if(n && n.trim()){
    const newName = n.trim();
    if(user){
      user.updateProfile({ displayName: newName })
        .catch(()=>{})
        .finally(()=>{
          state.user.name = newName;
          localStorage.setItem("userName", newName);
          renderProfile();
          ensureNameUI();
        });
    }else{
      state.user.name = newName;
      localStorage.setItem("userName", newName);
      renderProfile();
      ensureNameUI();
    }
  }
}
function ensureNameUI(){
  const container = document.querySelector('.profile div:nth-child(2)');
  // cria o botão só uma vez
  if (container && !document.getElementById('editNameBtn')) {
    const btn = document.createElement('button');
    btn.id = 'editNameBtn';
    btn.className = 'btn';
    btn.textContent = '✏️ Nome';
    btn.title = 'Alterar como você quer ser chamado';
    btn.style.marginTop = '6px';
    container.appendChild(btn);
  }

  const edit = document.getElementById('editNameBtn');
  if (edit) {
    edit.onclick = () => {
      const user = isFirebaseReady() ? firebase.auth().currentUser : null;
      if (user) { askName(); } else { openAuthModal(); }
    };
  }

  const av = document.querySelector('.profile .avatar');
  if (av) {
    av.style.cursor = 'pointer';
    av.title = 'Clique para editar seu nome';
    av.onclick = () => {
      const user = isFirebaseReady() ? firebase.auth().currentUser : null;
      if (user) { askName(); } else { openAuthModal(); }
    };
  }
}

/* ======== Navegação ======== */
function renderNav(){
  const nav = $("#nav");
  nav.innerHTML = "";

  CONTENT.forEach(sec=>{
    const b = document.createElement("button");
    b.className = "section-link";
    b.dataset.id = sec.id;
    const st = state.progress[sec.id]?.done ? "done" : (state.progress[sec.id] ? "inprog" : "todo");
    b.innerHTML = `
      <span class="status dot ${st}"></span>
      <span class="title">${sec.title}</span>
      <span class="meta">${sectionMeta(sec.id)}</span>
    `;
    b.onclick = ()=>{ openSection(sec.id); if (window.matchMedia('(max-width: 1200px)').matches) setSidebar(false); };
    nav.appendChild(b);
  });

  const sep = document.createElement("div"); sep.style.margin="8px 6px"; sep.style.borderTop="1px dashed #2a3856"; nav.appendChild(sep);

  const g = document.createElement("button");
  g.className = "section-link";
  g.innerHTML = `<span class="status dot inprog"></span><span class="title">Galeria — SVGs (Necrose/Apoptose)</span>`;
  g.onclick = ()=>{ openGallery(); if (window.matchMedia('(max-width: 1200px)').matches) setSidebar(false); };
  nav.appendChild(g);

  const p = document.createElement("button");
  p.className = "section-link";
  p.innerHTML = `<span class="status dot todo"></span><span class="title">Prova Cronometrada</span><span class="meta">simulado</span>`;
  p.onclick = ()=>{ openExamLanding(); if (window.matchMedia('(max-width: 1200px)').matches) setSidebar(false); };
  nav.appendChild(p);

  updateOverallProgress();
}

function sectionMeta(id){
  const p = state.progress[id];
  if(!p) return "";
  let bits = [];
  if (typeof p.quizScore === "number") bits.push(`quiz ${p.quizScore}%`);
  if (p.done) bits.push("✔");
  return bits.join(" · ");
}

function openSection(id){
  $$(".section-link").forEach(el=>el.classList.toggle("active", el.dataset.id===id));
  const sec = CONTENT.find(s=>s.id===id);
  if(!sec) return;

  const el = $("#content");
  el.innerHTML = `
    <div class="card">
      <div class="block-title">
        <h2>${sec.title}</h2>
        <span class="badge">Módulo</span>
      </div>
      <div class="progressbar" style="margin:8px 0 0 0"><span id="bar-${sec.id}" style="width:0%"></span></div>
      <p class="meta">Conclua os tópicos, vire os flashcards e faça o quiz para marcar como concluído.</p>
    </div>
  `;

  // Acordeão de aulas
  const acc = document.createElement("div");
  acc.className = "card";
  acc.innerHTML = `<h3>Conteúdo</h3><div class="accordion" id="acc-${sec.id}"></div>`;
  el.appendChild(acc);

  const accWrap = $(`#acc-${sec.id}`);
  (sec.lessons||[]).forEach((ls, idx)=>{
    const item = document.createElement("div");
    item.className = "acc-item";
    const lessonId = `${sec.id}-${idx}`;
    item.innerHTML = `
      <button class="acc-btn" aria-expanded="false" data-lesson="${lessonId}">
        <span><strong>${ls.title}</strong></span>
        <span class="chev">›</span>
      </button>
      <div class="acc-panel" id="panel-${lessonId}">
        <div class="grid cols-2">
          <div>
            <h4>Resumão</h4>
            <ul>${ls.resumo.map(t=>`<li>${highlight(t)}</li>`).join("")}</ul>
          </div>
          <div>
            <h4>Detalhes</h4>
            <ul>${ls.detalhes.map(t=>`<li>${highlight(t)}</li>`).join("")}</ul>
          </div>
        </div>
      </div>
    `;
    accWrap.appendChild(item);
  });

  accWrap?.addEventListener("click", (e)=>{
    const btn = e.target.closest(".acc-btn");
    if(!btn) return;
    const id = btn.dataset.lesson;
    btn.setAttribute("aria-expanded", btn.getAttribute("aria-expanded")==="true" ? "false" : "true");
    $(`#panel-${id}`).classList.toggle("open");
    markInProgress(sec.id);
    updateSectionBar(sec.id);
  });

  // Flashcards
  if (sec.flashcards?.length){
    const fc = document.createElement("div");
    fc.className = "card";
    fc.innerHTML = `<h3>Flashcards</h3><div class="flashcards">${sec.flashcards.map((c,i)=>`
      <div class="card-flip" data-idx="${i}">
        <div class="card-face">
          <div class="face front"><strong>Pergunta:</strong> ${highlight(c.q)}</div>
          <div class="face back"><strong>Resposta:</strong> ${c.a}</div>
        </div>
      </div>`).join("")}</div>`;
    el.appendChild(fc);

    fc.addEventListener("click", (e)=>{
      const box = e.target.closest(".card-face");
      if(!box) return;
      box.classList.toggle("flipped");
      markInProgress(sec.id);
      updateSectionBar(sec.id);
    });
  }

  // Quiz
  if (sec.quiz?.length){
    const qz = document.createElement("div");
    qz.className = "card";
    qz.innerHTML = `<h3>Quiz</h3><div class="quiz" id="quiz-${sec.id}"></div>`;
    el.appendChild(qz);

    const qwrap = $(`#quiz-${sec.id}`);
    sec.quiz.forEach((q,qi)=>{
      const block = document.createElement("div");
      block.className = "q-block";
      block.innerHTML = `
        <div class="q"><strong>${qi+1}.</strong> ${highlight(q.q)}</div>
        <div>${q.options.map((o,oi)=>`<label class="opt"><input type="radio" name="q-${sec.id}-${qi}" value="${oi}"> ${o}</label>`).join("")}</div>
        <div class="exp meta"></div>
      `;
      qwrap.appendChild(block);
    });

    const submit = document.createElement("button");
    submit.className = "btn submit";
    submit.textContent = "Corrigir Quiz";
    submit.onclick = ()=>{
      let score = 0;
      qwrap.querySelectorAll(".q-block").forEach((blk, qi)=>{
        const chosen = blk.querySelector("input[type=radio]:checked");
        const exp = blk.querySelector(".exp");
        const opts = Array.from(blk.querySelectorAll(".opt"));
        opts.forEach(o=>o.classList.remove("correct","wrong"));
        if(chosen){
          const val = Number(chosen.value);
          const ok = CONTENT.find(s=>s.id===sec.id).quiz[qi].answer;
          if(val===ok){ score++; opts[val].classList.add("correct"); }
          else { opts[val].classList.add("wrong"); opts[ok].classList.add("correct"); }
          exp.textContent = CONTENT.find(s=>s.id===sec.id).quiz[qi].exp;
        }else{
          exp.textContent = "Selecione uma alternativa.";
        }
      });
      const pct = Math.round((score / sec.quiz.length) * 100);
      state.progress[sec.id] = state.progress[sec.id] || {};
      state.progress[sec.id].quizScore = pct;
      if(pct>=80) state.progress[sec.id].done = true;
      saveProgress();
      updateSectionBar(sec.id);
      renderNav();
      alert(`Pontuação: ${pct}%`);
    };
    qz.appendChild(submit);
  }

  updateSectionBar(sec.id);
  renderNav();
}

function markInProgress(id){
  state.progress[id] = state.progress[id] || {};
  if(!state.progress[id].done) state.progress[id].inprog = true;
  saveProgress();
  renderNav();
}

function updateSectionBar(id){
  const sec = CONTENT.find(s=>s.id===id);
  const totalBlocks = (sec.lessons?.length || 0) + (sec.flashcards?.length ? 1 : 0) + (sec.quiz?.length ? 1 : 0);
  let progress = 0;
  const openedLessons = $$("#content .acc-panel.open").length;
  progress += Math.min(openedLessons, sec.lessons?.length || 0);
  if($$("#content .card-face.flipped").length > 0 && sec.flashcards?.length) progress += 1;
  if(typeof (state.progress[id]?.quizScore) === "number") progress += 1;

  const pct = Math.round( (progress/Math.max(1,totalBlocks))*100 );
  const bar = $(`#bar-${id}`);
  if(bar) bar.style.width = `${pct}%`;

  if((state.progress[id]?.quizScore||0) >= 80 && openedLessons>=Math.min(1, sec.lessons?.length||0)){
    state.progress[id].done = true; saveProgress(); renderNav();
  }
  updateOverallProgress();
}

function updateOverallProgress(){
  const ids = CONTENT.map(s=>s.id);
  const done = ids.filter(id=>state.progress[id]?.done).length;
  const pct = Math.round((done/ids.length)*100);
  $("#overallProgress").textContent = `${pct}%`;
}

function escapeRegExp(s){ return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
function highlight(text){
  if(!state.search) return text;
  const re = new RegExp(`(${escapeRegExp(state.search)})`,"ig");
  return text.replace(re, `<span class="hl">$1</span>`);
}

/* ======== Busca ======== */
function applySearch(term){
  state.search = (term||"").trim();
  const active = $(".section-link.active");
  if(active && active.dataset.id) openSection(active.dataset.id);
}

/* ======== Export/Reset ======== */
function exportProgress(){
  const blob = new Blob([JSON.stringify(state.progress, null, 2)], {type:"application/json"});
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "progresso-patologia.json";
  a.click();
  URL.revokeObjectURL(a.href);
}
function resetProgress(){
  if(!confirm("Zerar progresso e notas?")) return;
  localStorage.removeItem("progress");
  state.progress = {};
  renderNav();
  const active = $(".section-link.active"); if(active) openSection(active.dataset.id);
}

/* ======== Galeria SVGs ======== */
function openGallery(){
  $$(".section-link").forEach(el=>el.classList.remove("active"));
  const el = $("#content");
  el.innerHTML = `
    <div class="card">
      <div class="block-title">
        <h2>Galeria — Necrose & Apoptose (SVG)</h2>
        <span class="badge">Visual</span>
      </div>
      <p class="meta">Esquemáticos vetoriais para fixar morfologia e vias.</p>
    </div>
    <div class="gallery" id="gal"></div>
  `;
  const gal = $("#gal");
  SVG_BANK.forEach(s=>{
    const c = document.createElement("div");
    c.className="svgcard";
    c.innerHTML = `<h4>${s.title}</h4><div class="svgwrap">${s.svg}</div>`;
    gal.appendChild(c);
  });
}

/* ======== Prova Cronometrada ======== */
function getAllQuestions(){
  const items = [];
  CONTENT.forEach(sec=>{
    (sec.quiz||[]).forEach(q=>{
      items.push({ ...q, from: sec.title });
    });
  });
  return items;
}
function shuffle(a){ for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; }

function openExamLanding(){
  $$(".section-link").forEach(el=>el.classList.remove("active"));
  const pool = getAllQuestions();
  const el = $("#content");
  el.innerHTML = `
    <div class="card">
      <div class="exam-head">
        <h2>Prova Cronometrada</h2>
        <div class="timer" id="timer">⏱ 10:00</div>
      </div>
      <p class="meta">Simulado com questões de todos os módulos. Explicações após finalizar.</p>
      <div class="exam-controls">
        <label class="badge">Número de questões:
          <select id="examCount">
            <option>5</option><option selected>10</option><option>15</option><option>20</option><option>30</option><option>40</option><option>50</option>
          </select>
        </label>
        <label class="badge">Tempo:
          <select id="examTime">
            <option value="5">5 min</option>
            <option value="10" selected>10 min</option>
            <option value="15">15 min</option>
            <option value="20">20 min</option>
            <option value="30">30 min</option>
            <option value="40">40 min</option>
          </select>
        </label>
        <button id="startExam" class="btn">Iniciar</button>
      </div>
    </div>
    <div id="examArea"></div>
  `;
  $("#startExam").onclick = ()=>{
    const n = parseInt($("#examCount").value,10);
    const tmin = parseInt($("#examTime").value,10);
    startExam(n, tmin, pool);
  };
}

function startExam(n, minutes, pool){
  const qs = shuffle(pool.slice()).slice(0, n).map((q,i)=>({...q, id:i}));
  state.exam = {
    pool: qs, idx: 0, answers: Array(n).fill(null),
    timeLeft: minutes*60, timerId: null, startedAt: Date.now()
  };
  tickTimer(); state.exam.timerId = setInterval(tickTimer, 1000);
  renderExam();
}

function tickTimer(){
  if(!state.exam) return;
  const t = state.exam.timeLeft;
  const m = Math.floor(t/60), s = t%60;
  const timer = $("#timer"); if(timer) timer.textContent = `⏱ ${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  if(t<=0){ finishExam(); return; }
  state.exam.timeLeft -= 1;
}

function renderExam(){
  const area = $("#examArea");
  const { pool, idx, answers } = state.exam;
  const q = pool[idx];

  area.innerHTML = `
    <div class="card">
      <div class="exam-q">
        <div class="q"><strong>${idx+1}/${pool.length}.</strong> ${q.q}</div>
        <div>${q.options.map((o,oi)=>`
          <label class="opt"><input type="radio" name="ans" value="${oi}" ${answers[idx]===oi?'checked':''}> ${o}</label>
        `).join('')}</div>
        <div class="exam-nav">
          <span class="pill">De: ${q.from}</span>
          <span class="pill">Questões selecionadas: ${pool.length}</span>
          <span class="pill">Tempo correndo…</span>
        </div>
      </div>
      <div style="margin-top:12px; display:flex; gap:8px; flex-wrap:wrap">
        <button class="btn" id="prevBtn" ${idx===0?'disabled':''}>◀ Anterior</button>
        <button class="btn" id="nextBtn" ${idx===pool.length-1?'disabled':''}>Próxima ▶</button>
        <button class="btn" id="finishBtn">Finalizar</button>
      </div>
    </div>
    <div class="card">
      <div class="progressbar"><span style="width:${Math.round(((idx)/pool.length)*100)}%"></span></div>
    </div>
  `;

  area.querySelectorAll('input[name="ans"]').forEach(inp=>{
    inp.onchange = (e)=>{ state.exam.answers[idx] = Number(e.target.value); };
  });
  $("#prevBtn").onclick = ()=>{ if(state.exam.idx>0){ state.exam.idx--; renderExam(); } };
  $("#nextBtn").onclick = ()=>{ if(state.exam.idx<pool.length-1){ state.exam.idx++; renderExam(); } };
  $("#finishBtn").onclick = finishExam;
}

function finishExam(){
  if(!state.exam) return;
  clearInterval(state.exam.timerId);
  const { pool, answers } = state.exam;
  let correct = 0;
  const review = pool.map((q,i)=>{
    const ok = q.answer;
    const got = answers[i];
    if(got===ok) correct++;
    return { i:i+1, q:q.q, ok, got, options:q.options, exp:q.exp, from:q.from };
  });
  const pct = Math.round((correct/pool.length)*100);
  $("#examArea").innerHTML = `
    <div class="card exam-results">
      <h3>Resultado</h3>
      <div class="stat">Acertos: ${correct}/${pool.length} (${pct}%)</div>
      <div class="stat">Tempo gasto: ${formatSeconds(((Date.now()-state.exam.startedAt)/1000)|0)}</div>
      <p class="meta">Veja o gabarito comentado abaixo.</p>
    </div>
    ${review.map(r=>`
      <div class="card">
        <div class="q"><strong>${r.i}.</strong> ${r.q}</div>
        <ul style="margin:.5em 0 0 0; padding-left:1em">
          ${r.options.map((o,oi)=>`<li style="margin:.2em 0; ${oi===r.ok?'color:#7ee787':''} ${oi===r.got && oi!==r.ok?'color:#ff7b72':''}">
            ${oi===r.ok?'✔':'•'} ${o}
          </li>`).join('')}
        </ul>
        <div class="exp meta" style="margin-top:.5em">Comentário: ${r.exp}</div>
        <div class="meta" style="margin-top:.25em">Origem: ${r.from}</div>
      </div>
    `).join('')}
  `;
  state.exam = null;
}

function formatSeconds(s){
  const m = Math.floor(s/60), ss = s%60;
  return `${m}m ${String(ss).padStart(2,'0')}s`;
}

/* ======== Init ======== */
function init(){
  syncHeaderH();
  setTheme(state.theme);
  setDys(state.dys);
  renderNav();
  renderProfile();
  ensureNameUI();
  if(user){ loadProgressFromCloud()?.then(()=>saveProgressToCloud()).catch(()=>{}); }
  if(!(isFirebaseReady() && firebase.auth().currentUser) && !state.user.name){
  setTimeout(askName, 600);
}
  window.addEventListener('resize', syncHeaderH);
  // ===== Auth UI (Firebase) =====
const authBtn = document.getElementById('authBtn');
if (authBtn && isFirebaseReady()){
  firebase.auth().onAuthStateChanged((user)=>{
          authBtn.textContent = user ? 'Sair' : 'Entrar';
      if(user){
        const n = user.displayName || user.email || state.user.name;
        if(n){ state.user.name = n; localStorage.setItem('userName', n); }
        showPaywall(false);
        try{ loadProgressFromCloud()?.then(()=>saveProgressToCloud()).catch(()=>{}); }catch(e){}
      }else{
        state.user.name = localStorage.getItem('userName') || 'Visitante';
        showPaywall(true);
      }
      renderProfile();
      ensureNameUI();
  });
  authBtn.onclick = ()=>{
    const user = firebase.auth().currentUser;
    if(user){ firebase.auth().signOut(); }
    else { openAuthModal(); }
  };
}
const closeAuth = document.getElementById('closeAuth');
if(closeAuth) closeAuth.onclick = closeAuthModal;

  const pwLogin = document.getElementById('paywallLogin');
  if(pwLogin) pwLogin.onclick = ()=>{ openAuthModal(); };


  $("#toggleTheme").onclick = ()=> setTheme(state.theme==="dark"?"light":"dark");
  $("#toggleDys").onclick = ()=> setDys(!state.dys);
  $("#exportBtn").onclick = exportProgress;
  $("#resetBtn").onclick = resetProgress;
  $("#searchInput").addEventListener("input", (e)=>applySearch(e.target.value));
  const mb = document.querySelector('#menuBtn'); if(mb) mb.onclick = ()=> setSidebar(!document.querySelector('#sidebar')?.classList.contains('open'));
  const bd = document.querySelector('#drawerBackdrop'); if(bd) bd.onclick = ()=> setSidebar(false);
  window.addEventListener('keydown', (e)=>{ if(e.key==='Escape') setSidebar(false); });
}
document.addEventListener("DOMContentLoaded", init);

// ===== Bootstrap para reamarrar botões da UI (idempotente) =====
(function _wireAppUI(){
  function ready(fn){
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn, { once: true });
    } else { fn(); }
  }

  ready(function(){
    // Menu lateral (gaveta)
    const mb = document.getElementById('menuBtn');
    const bd = document.getElementById('drawerBackdrop');
    if (mb) mb.onclick = () => setSidebar(true);
    if (bd) bd.onclick = () => setSidebar(false);

    // Acessibilidade e tema
    const dys = document.getElementById('toggleDys');
    if (dys) dys.onclick = () => setDys(!state.dys);

    const theme = document.getElementById('toggleTheme');
    if (theme) theme.onclick = () => setTheme(state.theme === 'dark' ? 'light' : 'dark');

    // Autenticação
    const authBtn = document.getElementById('authBtn');
    if (authBtn) {
      if (isFirebaseReady()) {
        authBtn.onclick = () => {
          const u = firebase.auth().currentUser;
          if (u) { firebase.auth().signOut(); } else { openAuthModal(); }
        };
        try {
          firebase.auth().onAuthStateChanged(u => {
            try { showPaywall(!u); } catch(e) {}
          });
        } catch(e) {}
      } else {
        authBtn.onclick = openAuthModal;
      }
    }

    // Exportar / Resetar progresso
    const expo = document.getElementById('exportBtn');
    if (expo) expo.onclick = function _exportProgress(){
      try {
        const blob = new Blob([JSON.stringify({ progress: state.progress || {}, ts: Date.now() }, null, 2)], { type:'application/json' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'patologia-progresso.json';
        a.click();
        URL.revokeObjectURL(a.href);
      } catch(e) { alert('Não foi possível exportar agora.'); }
    };

    const reset = document.getElementById('resetBtn');
    if (reset) reset.onclick = function _resetProgress(){
      if (!confirm('Zerar progresso local? (o da nuvem pode permanecer)')) return;
      state.progress = {};
      saveProgress();
      try { if (typeof renderNav === 'function') renderNav(); } catch(e) {}
    };

    // Paywall → botão login
    const pwLogin = document.getElementById('paywallLogin');
if (pwLogin) pwLogin.onclick = () => {
  try { showPaywall(false); } catch(e) {}   // esconde o overlay
  openAuthModal();                          // abre o modal de login
};

// Reexibe paywall se o usuário fechar o modal sem estar logado
const closeBtn = document.getElementById('closeAuth');
if (closeBtn) closeBtn.addEventListener('click', () => {
  try {
    const u = (typeof firebase !== 'undefined' && firebase.auth) ? firebase.auth().currentUser : null;
    if (!u) showPaywall(true);
  } catch (e) { showPaywall(true); }
});

    // Header sticky height
    syncHeaderH();
    window.addEventListener('resize', syncHeaderH);
  });
})();

document.addEventListener('DOMContentLoaded', ()=>{
  try { showPaywall(true); } catch(e) {}
  try { firebase.auth().onAuthStateChanged(u => showPaywall(!u)); } catch(e) {}
});
// ===== Paywall + Auth bootstrap (idempotente, seguro no deploy) =====
(function _bootPaywall(){
  function _hasFb(){ return (typeof firebase !== 'undefined') && firebase.auth; }
  function _showPaywall(show){
    var el = document.getElementById('paywall');
    if(!el) return; 
    el.classList.toggle('show', !!show);
    el.setAttribute('aria-hidden', show ? 'false' : 'true');
  }
  function _openAuth(){
    var m = document.getElementById('authModal');
    if(m){ m.classList.add('show'); m.setAttribute('aria-hidden','false'); }
  }
  function _closeAuth(){
    var m = document.getElementById('authModal');
    if(m){ m.classList.remove('show'); m.setAttribute('aria-hidden','true'); }
  }

  function wire(){
    // Mostra paywall primeiro (fail-safe) — no deploy ele aparece por padrão
    try{ _showPaywall(true); }catch(e){}

    // Reage ao estado de autenticação
    try{
      if(_hasFb()){
        firebase.auth().onAuthStateChanged(function(u){ _showPaywall(!u); });
      }
    }catch(e){}

    // Botão "Entrar" do paywall → abre modal e esconde overlay
    var pwLogin = document.getElementById('paywallLogin');
    if(pwLogin){ pwLogin.onclick = function(){ _showPaywall(false); _openAuth(); }; }

    // Fechar modal → se não logado, volta a exibir paywall
    var closeBtn = document.getElementById('closeAuth');
    if(closeBtn){ closeBtn.onclick = function(){
      _closeAuth();
      try{ var u = _hasFb() ? firebase.auth().currentUser : null; if(!u) _showPaywall(true); }catch(e){ _showPaywall(true); }
    };}
  }

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded', wire, { once:true });
  } else { wire(); }
})();

// ====== Bloqueio por login: sidebar oculta até autenticar ======
(function _lockSidebarUntilLogin(){
  function hasFb(){ return (typeof firebase !== 'undefined') && firebase.auth; }
  function openAuthModal(){
    var m = document.getElementById('authModal');
    if(m){ m.classList.add('show'); m.setAttribute('aria-hidden','false'); }
  }
  function closeAuthModal(){
    var m = document.getElementById('authModal');
    if(m){ m.classList.remove('show'); m.setAttribute('aria-hidden','true'); }
  }
  function setSidebarLocked(locked){
    var layout = document.querySelector('.app-main');
    var sb = document.getElementById('sidebar');
    var bd = document.getElementById('drawerBackdrop');
    var mb = document.getElementById('menuBtn');
    if(sb){
      sb.style.display = locked ? 'none' : '';
      sb.classList.remove('open');
      sb.toggleAttribute('inert', !!locked);
      sb.setAttribute('aria-hidden', locked ? 'true':'false');
    }
    if(layout){ layout.classList.toggle('no-sidebar', !!locked); }
    if(bd){ bd.classList.remove('show'); }
    if(mb){ mb.style.display = locked ? 'none' : ''; }
  }
  function wire(){
    // Esconde menu por padrão (deploy seguro)
    setSidebarLocked(true);

    // Botão do cabeçalho: Entrar/Sair
    var ab = document.getElementById('authBtn');
    if(ab){
      ab.onclick = function(){
        try{
          var u = hasFb() ? firebase.auth().currentUser : null;
          if(u){ firebase.auth().signOut(); } else { openAuthModal(); }
        }catch(e){ openAuthModal(); }
      };
    }

    // Menu hamburguer (mobile): se não logado → abre login; se logado → abre a gaveta
    var mb = document.getElementById('menuBtn');
    if(mb){
      mb.onclick = function(){
        try{
          var u = hasFb() ? firebase.auth().currentUser : null;
          if(!u){ openAuthModal(); return; }
          if(typeof setSidebar === 'function') setSidebar(true);
        }catch(e){ openAuthModal(); }
      };
    }

    // Fechar modal
    var closeBtn = document.getElementById('closeAuth');
    if(closeBtn){ closeBtn.onclick = closeAuthModal; }

    // Observa login e alterna visibilidade do menu + rótulo do botão
    try{
      if(hasFb()){
        firebase.auth().onAuthStateChanged(function(u){
          setSidebarLocked(!u);
          var abtn = document.getElementById('authBtn');
          if(abtn){ abtn.textContent = u ? 'Sair' : 'Entrar'; }
        });
      }
    }catch(e){}
  }

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded', wire, { once:true });
  } else { wire(); }
})();