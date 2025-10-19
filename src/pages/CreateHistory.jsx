// src/pages/CreateHistory.jsx
import React, { useState } from 'react';
import StoryForm from '../components/StoryForm';
import EditWord from '../components/EditWord';
import StoryGenerationOverlay from '../components/StoryGenerationOverlay';
import { promptAPI } from '../services/promptAPI';
import { buildStoryPrompt } from '../utils/buildStoryPrompt';

const CreateHistory = () => {
  const [generatedStory, setGeneratedStory] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [generating, setGenerating] = useState(false);

  const handleFormSubmit = async (data) => {
    try {
      setGenerating(true);
      const prompt = buildStoryPrompt(data);
      const story = await promptAPI(prompt);
      setGeneratedStory(story);
    } catch (err) {
      console.error("Erro ao gerar a história:", err);
      setGeneratedStory("Erro ao gerar a história. Tente novamente.");
    } finally {
      setGenerating(false);
    }
  };

  const handleRestart = () => {
    setGeneratedStory('');
    setShowEditModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start p-4 sm:p-8 relative">
      {!generatedStory ? (
        <StoryForm onSubmit={handleFormSubmit} />
      ) : (
        <div className="w-full max-w-3xl bg-white p-6 rounded-xl shadow-lg flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-3xl font-extrabold text-blue-800">📖 História Gerada</h2>
            <button
              onClick={() => setShowEditModal(true)}
              className="py-1 px-3 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
            >
              Refinar História
            </button>
          </div>

          {/* Container rolável da história */}
          <div className="h-96 overflow-y-auto border border-gray-200 p-4 rounded mb-4 whitespace-pre-wrap text-gray-800">
            {generatedStory}
          </div>

          <button
            onClick={handleRestart}
            className="mt-2 w-full py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition duration-300 shadow-lg"
          >
            Recomeçar
          </button>
        </div>
      )}

      {/* Modal flutuante */}
      {showEditModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Refinar História</h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-500 hover:text-gray-800 font-bold"
              >
                X
              </button>
            </div>
            <EditWord storyText={generatedStory} setStoryText={setGeneratedStory} />
          </div>
        </div>
      )}

      {/* Overlay de geração */}
      <StoryGenerationOverlay visible={generating} />
    </div>
  );
};

export default CreateHistory;
