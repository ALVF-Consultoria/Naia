// src/pages/FlipbookPage.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import EbookViewer from "../components/EbookViewer";

const FlipbookPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Recebe a história pela rota
  const storyText = location.state?.storyText || null;

  if (!storyText) {
    return (
      <div className="p-6">
        <p>Nenhuma história encontrada.</p>
        <button onClick={() => navigate(-1)}>Voltar</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold mb-4 text-center">📖 Livro Folheável</h1>
      <div className="flex justify-center">
        <EbookViewer storyText={storyText} />
      </div>
      <div className="text-center">
        <button
          onClick={() => navigate(-1)}
          className="mt-6 px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition"
        >
          Voltar
        </button>
      </div>
    </div>
  );
};

export default FlipbookPage;
