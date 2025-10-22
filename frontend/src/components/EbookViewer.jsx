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
    ? "bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 border border-gray-700"
    : "bg-gradient-to-br from-[#d3d3d3] to-[#f5f5f5] text-gray-900 border border-gray-300";

  return (
    <div className="flex flex-col items-center">

      <div className="relative shadow-2xl rounded-2xl">
        {/* Simulação de “volume” do livro */}
        <div className="absolute -left-2 top-2 w-1.5 h-[96%] bg-gradient-to-b from-gray-400/60 to-gray-600/40 rounded-l-md shadow-md" />
        <div className="absolute -right-2 top-2 w-1.5 h-[96%] bg-gradient-to-b from-gray-400/60 to-gray-600/40 rounded-r-md shadow-md" />

        {/* Sombras sutis de pilha de páginas */}
        <div className="absolute -left-[6px] top-3 w-[3px] h-[94%] bg-gray-300/60 rounded-md blur-[1px]" />
        <div className="absolute -right-[6px] top-3 w-[3px] h-[94%] bg-gray-300/60 rounded-md blur-[1px]" />

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
          className="rounded-xl overflow-hidden"
        >
          {/* CAPA */}
          <div className="bg-gradient-to-br from-gray-600 to-gray-700 text-white flex items-center justify-center p-10 border border-gray-800 rounded-xl shadow-inner">
            <p className="opacity-90 text-xl font-semibold drop-shadow-md">📖 Sua História</p>
          </div>

          {/* PÁGINAS */}
          {pages.map((page, idx) => (
            <div
              key={idx}
              className={`relative p-6 flex items-start justify-start text-lg leading-relaxed font-serif ${pageStyle}`}
            >
              {/* Vinco central sutil */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/[0.04] to-transparent pointer-events-none" />
              {/* Bordas suaves */}
              <div className="absolute inset-0 border border-black/5 rounded-xl pointer-events-none" />
              <p className="relative z-10 text-justify">{page}</p>
            </div>
          ))}

          {/* CONTRA-CAPA */}
          <div className="bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center p-10 border border-gray-400 dark:border-gray-700 rounded-xl shadow-inner">
            <p className="text-gray-700 dark:text-gray-300 italic">
              Fim 📖 Obrigado por ler!
            </p>
          </div>
        </HTMLFlipBook>
      </div>
    </div>
  );
};

export default EbookViewer;