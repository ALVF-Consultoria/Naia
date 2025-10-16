# NAIA – Oracle of Story Beginnings

## 🧠 Visão Geral do Projeto

NAIA é uma plataforma interativa que auxilia usuários na criação de histórias estruturadas por etapas, utilizando recursos de UI animada (framer-motion), partículas futuristas (tsParticles), e um assistente IA integrado que responde dúvidas contextuais durante o processo de criação.

O objetivo principal é permitir que escritores e criadores possam **imaginar universos**, **construir personagens**, **escrever capítulos** e até **exportar em formato EPUB futuramente**.

## 🎯 Objetivo do Hackathon

* Criar uma **experiência imersiva de escrita assistida por IA**.
* Interface futurista com animações fluidas.
* Um botão "Lâmpada de Ideias" para tirar dúvidas com IA em tempo real.
* Estrutura para futuramente gerar EPUB automaticamente a partir dos capítulos gerados.

## 🚀 Funcionalidades Atuais

* Interface Home com partículas e animações futuristas.
* Formulário de criação de histórias por etapas.
* Navegação entre etapas com UI clara e intuitiva.
* Componente **IdeaLamp.jsx** com IA integrada (

  * Usuário clica na lâmpada → abre um mini chat.
  * Faz perguntas sobre a etapa atual da história.
  * IA responde com dicas.
  * Resposta aparece com scroll para não quebrar layout.
    )
* Sistema modular para expansão futura (como exportação para EPUB).

## 📁 Estrutura de Componentes Relevantes

```
/src
 ├── components
 │    ├── IdeaLamp.jsx   → Assistente IA flutuante com partículas
 │    ├── Navbar.jsx     → Menu futurista responsivo (hamburger)
 │    ├── StoryForm.jsx  → Formulário inteligente de criação por etapas
 │
 ├── pages
 │    ├── Home.jsx       → Tela inicial com Particles + Framer Motion + CTA
 │    ├── CreateHistory.jsx → Tela principal para criar histórias
 │
 ├── services
 │    ├── promptAPI.js   → Função de conexão com backend IA / OpenAI API
```

## 🧩 Tecnologias Usadas

| Tecnologia                     | Uso                               |
| ------------------------------ | --------------------------------- |
| **React + Vite**               | Frontend com performance rápida   |
| **TailwindCSS**                | Estilização moderna e responsiva  |
| **Framer Motion**              | Animações suaves                  |
| **@tsparticles/react**         | Partículas futuristas             |
| **Lucide Icons**               | Ícones minimalistas               |
| **OpenAI Prompt API (custom)** | Comunicação com IA para respostas |

## 💡 Futuras Features Planejadas

* 📚 **Exportação para EPUB** usando `epub-gen`.
* 🎴 **Visualizador de capítulos em cards flipáveis**.
* 🧠 **IA com contexto global**, não só por etapa.
* 👥 **Modo colaborativo / multiplayer para escrita compartilhada**.
* 🎮 **Modo gamificado: conquistas para escritores**.

## 📌 Fluxo de Usuário Atual

1. Usuário entra na Home futurista.
2. Clica em **Start Now**.
3. Começa a preencher os campos do StoryForm.
4. Se tiver dúvidas → clica na **Lâmpada (IdeaLamp)**.
5. Faz perguntas → recebe dicas rápidas de IA.
6. Continua a história com fluidez sem sair da página.

## 📦 Sobre a Geração de EPUB (Planejamento Técnico)

Será usada a lib `epub-gen`, com o seguinte formato:

```js
{
  title: "Nome da História",
  author: "Usuário",
  content: [
    { title: "Capítulo 1", data: "<p>conteúdo</p>" },
    { title: "Capítulo 2", data: "..." }
  ]
}
```

Cada etapa do StoryForm será um capítulo separado.

---

