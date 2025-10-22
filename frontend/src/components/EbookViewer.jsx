// src/components/EbookViewer.jsx
import React, { useState } from "react";
import HTMLFlipBook from "react-pageflip";

const splitIntoPages = (text, wordsPerPage = 140) => {
  const words = text.split(" ");
  let pages = [];
  for (let i = 0; i < words.length; i += wordsPerPage) {
    pages.push(words.slice(i, i + wordsPerPage).join(" "));
  }
  return pages;
};

const EbookViewer = ({ storyText }) => {
  const [darkMode, setDarkMode] = useState(false);
  const pages = splitIntoPages(storyText, 50);

  const pageStyle = darkMode
    ? "bg-gray-900 text-gray-100"
    : "bg-white text-gray-900";

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="mb-4 px-4 py-2 rounded-xl border hover:bg-gray-200 dark:hover:bg-gray-700 transition"
      >
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>

      <HTMLFlipBook
        width={450}
        height={650}
        size="stretch"
        minWidth={315}
        maxWidth={1000}
        minHeight={400}
        maxHeight={1536}
        maxShadowOpacity={0.5}
        showCover={true}
        drawShadow={true}
        flippingTime={700}
        usePortrait={false}
        startPage={0}
        className="shadow-2xl rounded-lg"
      >
        {/* CAPA */}
        <div className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white flex items-center justify-center p-10">
          <p className="opacity-90">📖 Sua História</p>
        </div>

        {/* PÁGINAS */}
        {pages.map((page, idx) => (
          <div
            key={idx}
            className={`p-6 flex items-start justify-start text-lg leading-relaxed ${pageStyle}`}
          >
            <p>{page}</p>
          </div>
        ))}

        {/* CONTRA-CAPA */}
        <div className="bg-gray-200 dark:bg-gray-800 flex items-center justify-center p-10">
          <p className="text-gray-600 dark:text-gray-300 italic">Fim 📖 Obrigado por ler!</p>
        </div>
      </HTMLFlipBook>
    </div>
  );
};

export default EbookViewer;
