import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import EditWord from "../components/EditWord";
import SaveStoryButton from "../components/SaveStoryButton";


const HistoryView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { storyText, title = "Minha História" } = location.state || {};
  const [story, setStory] = useState(storyText || "");
  const [showEditModal, setShowEditModal] = useState(false);

  if (!storyText) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <p className="text-gray-600 mb-4">Nenhuma história foi gerada ainda.</p>
        <button
          onClick={() => navigate("/create")}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          Voltar e Criar História
        </button>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center justify-center mt-4">
      <div className="w-full max-w-3xl bg-white p-6 rounded-xl shadow-lg relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-extrabold text-blue-800">
            📖 {title}
          </h2>

          <SaveStoryButton storyText={storyText} title={title} />

          <button
            onClick={() => setShowEditModal(true)}
            className="py-2 px-4 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition font-semibold shadow"
          >
            ✨ Refinar História
          </button>
        </div>

        <div className="h-[70vh] overflow-y-auto border border-gray-200 p-4 rounded mb-6 whitespace-pre-wrap text-gray-800 leading-relaxed">
          {story}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => navigate("/flipbook", { state: { storyText: story, title } })}
            className="w-full py-3 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 transition duration-300 shadow-lg"
          >
            📚 Ver como Livro Folheável
          </button>

          <button
            className="w-full py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition duration-300 shadow-lg"
          >
            ⬇️ Baixar como EPUB
          </button>

          <button
            onClick={() => navigate("/create-history")}
            className="w-full py-3 bg-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-300 transition duration-300 shadow-lg"
          >
            🔁 Criar Nova História
          </button>
        </div>
      </div>

      {/* Modal de Refinar História */}
      {showEditModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">
                Refinar História
              </h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-500 hover:text-gray-800 font-bold"
              >
                ✕
              </button>
            </div>
            <EditWord storyText={story} setStoryText={setStory} />
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoryView;
