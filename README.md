# 🧠 NAIA  
### *The Story Oracle – Where ideas become stories.*

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![AI](https://img.shields.io/badge/AI-Gemini_Nano-blue?style=for-the-badge)
![Chrome](https://img.shields.io/badge/Chrome_OnDevice_AI-4285F4?style=for-the-badge&logo=googlechrome&logoColor=white)

---

## 🌟 Overview 

**NAIA** is an experimental platform built for the **Chrome Hackathon**, turning the browser into a **creative writing environment powered by local AI**.  
It uses **Gemini Nano (via `prompt API`)** to generate, edit, and translate stories **entirely offline**, maintaining privacy and creativity.

> “The NAIA framework offers a dashboard for the beginning of story creation — like an oracle of imagination.”

---

## 🎯 Inspiration 

Inspired by **Content Marketing** and the idea of making creative writing **accessible, interactive, and intelligent**.  
Born from the vision of **on-device AI agents** that help writers, educators, and creators build unique narratives without cloud dependency.

---

## 🪄 What it does 

NAIA turns ideas into fully structured stories, divided into chapters with protagonists, conflicts, and themes.

✨ **Core Features:**
- 🧠 Story generation from custom prompts  
- ✏️ Smart text editing (word replacement)  
- 🌍 AI-powered translation (translator API)  
- 📖 Story history viewer  
- 🖋️ Ready for comic & book creation  

---

## 🏗️ How we built it 

🔹 **Frontend:** React + Tailwind CSS  
🔹 **AI Engine:** `prompt API` (Google Gemini Nano, On-Device)  
🔹 **Prompt Logic:** Structured JSON format for consistent story generation  
🔹 **Dashboard:** Modular interface with story creation, editing, and translation contexts  
🔹 **Session Handling:** Custom session manager for Gemini Nano (`ready`, `downloadable`, `unavailable` states)

> Inspired by **Google Storybook** and **Google Books** for user experience and flow.

---

## ⚙️ Challenges we ran into

🚧 Integration with the **experimental Chrome on-device AI API (`prompt API`)** required:
- Managing model state and GPU/VRAM availability  
- Handling async session creation and error states  
- Ensuring valid JSON returns for story parsing  
- Adapting the system for multilingual support  

---

## 🏆 Accomplishments that we're proud of

💎 We successfully aligned **idea, technology, and market**, proving it’s possible to build a **fully local story generator with AI**.  
NAIA became a proof-of-concept of **creative AI running natively inside the browser** — private, fast, and interactive.

---

## 📚 What we learned 

💭 Every dream requires resilience — especially when building with experimental technology.  
We learned:
- How to manage prompt-driven creative flows  
- How to work with on-device AI models  
- The importance of narrative consistency and user experience  

---

## 🚀 What's next for NAIA 

📘 Next goals:
- ✍️ Add **manual editing tools** for rewriting specific parts of the story  
- 🧹 Implement **automatic grammar and spelling correction** powered by API Proofreader  
- 🔁 Improve **prompt consistency** for more coherent multi-chapter stories  
- 🗣️ Enable **real-time translation and text-to-speech narration**  
- 💾 Allow **saving and exporting stories** in multiple formats (EPUB, TXT)

> The next evolution of NAIA focuses on becoming a **creative writing assistant**, helping users refine, correct, and perfect their narratives while staying fully offline.

---

## 💻 Team 

👤 **[Cristian Santos]** — Full Stack Developer & software engineer
👤 **[Alex Leandro Freitas (freitasALVF)]** — project manager

---

## 🏁 Keywords

`AI` · `Gemini Nano` · `Chrome Hackathon` · `On-device Intelligence` · `Storytelling` · `React` · `Tailwind` · `Creative Tools`

---

## 🧩 Installation

```bash
# Clone this repository
git clone https://github.com/ALVF-Consultoria/Naia.git

# Navigate into the project folder
cd frontend

# Install dependencies
npm install

# Run the development server
npm run dev
