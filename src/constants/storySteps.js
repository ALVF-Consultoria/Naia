export const INITIAL_FORM_DATA = {
  protagonistaNome: '',
  protagonistaDescricao: '',
  protagonistaObjetivo: '',
  antagonistaNatureza: '',
  conflitoPontoPartida: '',
  cenarioLocal: '',
  cenarioEpoca: '',
  cenarioTom: '',
  enredoObstaculo: '',
  enredoClimax: '',
  temaMensagem: '',
};

export const stepsConfig = [
  {
    title: "Protagonista",
    iconName: "User",
    description: "Defina o herói da sua história e o que ele busca.",
    fields: [
      { id: 'protagonistaNome', label: 'Nome do Protagonista', type: 'text', placeholder: 'Ex: Arthur' },
      { id: 'protagonistaDescricao', label: 'Descrição do Protagonista', type: 'textarea', placeholder: 'Ex: Jovem ferreiro de coração ingênuo.' },
      { id: 'protagonistaObjetivo', label: 'Objetivo Principal', type: 'text', placeholder: 'Ex: Resgatar a espada mágica roubada.' },
    ],
  },
  {
    title: "Antagonista e Conflito",
    iconName: "Zap",
    description: "Quem ou o que se opõe ao seu herói e como a ação começa.",
    fields: [
      { id: 'antagonistaNatureza', label: 'Natureza do Antagonista', type: 'textarea', placeholder: 'Ex: A Rainha Sombria, consumida pela inveja.' },
      { id: 'conflitoPontoPartida', label: 'Ponto de Partida do Conflito', type: 'text', placeholder: 'Ex: Ele recebe uma carta misteriosa em um dia chuvoso.' },
    ],
  },
  {
    title: "Cenário e Atmosfera",
    iconName: "Globe",
    description: "Onde e quando a história se passa e qual o tom emocional.",
    fields: [
      { id: 'cenarioLocal', label: 'Local', type: 'text', placeholder: 'Ex: Reino de Eldoria' },
      { id: 'cenarioEpoca', label: 'Época (ano)', type: 'number', placeholder: 'Ex: 1423' },
      { id: 'cenarioTom', label: 'Tom e Atmosfera', type: 'text', placeholder: 'Ex: Melancólico, com toques de esperança.' },
    ],
  },
  {
    title: "Enredo e Clímax",
    iconName: "BookOpen",
    description: "O maior desafio e o confronto final.",
    fields: [
      { id: 'enredoObstaculo', label: 'O Maior Obstáculo', type: 'textarea', placeholder: 'Ex: Ser capturado e ter que escapar de uma masmorra voadora.' },
      { id: 'enredoClimax', label: 'Ação no Clímax', type: 'text', placeholder: 'Ex: Luta mágica final no topo da torre do Antagonista.' },
    ],
  },
  {
    title: "Tema e Mensagem",
    iconName: "MessageSquare",
    description: "A essência e o significado da sua narrativa.",
    fields: [
      { id: 'temaMensagem', label: 'Mensagem Central/Tema', type: 'textarea', placeholder: 'Ex: A verdadeira força reside na bondade.' },
    ],
  },
];
