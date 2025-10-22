export function buildStoryPrompt(formData) {
  return `
Crie uma história dividida em 5 capítulos com base nos seguintes elementos:

1 Protagonista:
- Nome: ${formData.protagonistaNome}
- Descrição: ${formData.protagonistaDescricao}
- Objetivo: ${formData.protagonistaObjetivo}

2 Antagonista e Conflito:
- Antagonista: ${formData.antagonistaNatureza}
- Ponto de partida do conflito: ${formData.conflitoPontoPartida}

3 Cenário e Atmosfera:
- Local: ${formData.cenarioLocal}
- Época: ${formData.cenarioEpoca}
- Tom/Atmosfera: ${formData.cenarioTom}

4 Enredo e Clímax:
- Maior obstáculo: ${formData.enredoObstaculo}
- Clímax: ${formData.enredoClimax}

5 Tema e Mensagem:
- Mensagem central/tema: ${formData.temaMensagem}

Regras:
- Divida a história em 5 capítulos claros.
- Cada capítulo deve ter entre 100 e 200 palavras.
- Mantenha o tom e atmosfera especificados.
- Faça com que o protagonista evolua ao longo da narrativa.
- Comece cada capítulo com "Capítulo X:".

Retorne apenas a história formatada em texto.
`;
}
