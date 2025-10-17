import React, { useState } from 'react';
import StoryForm from '../components/StoryForm';
import { promptAPI } from '../services/promptAPI';
import { buildStoryPrompt } from '../utils/buildStoryPrompt';

const CreateHistory = () => {
  const [generatedStory, setGeneratedStory] = useState('');

  const handleFormSubmit = async (data) => {
    try {
      const prompt = buildStoryPrompt(data);
      const story = await promptAPI(prompt);
      setGeneratedStory(story);
    } catch (err) {
      console.error("Erro ao gerar a história:", err);
      setGeneratedStory("Erro ao gerar a história. Tente novamente.");
    }
  };

  const handleRestart = () => setGeneratedStory('');

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start p-4 sm:p-8" >
      {!generatedStory ? (
        <StoryForm onSubmit={handleFormSubmit} />
      ) : (
        <div className="w-full max-w-3xl bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-3xl font-extrabold text-blue-800 mb-4">📖 História Gerada</h2>
          <pre className="whitespace-pre-wrap text-gray-800">{generatedStory}</pre>
          <button
            onClick={handleRestart}
            className="mt-6 w-full py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition duration-300 shadow-lg"
          >
            Recomeçar
          </button>
        </div>
      )}
    </div>
  );
};

export default CreateHistory;
