// src/pages/CreateHistory.jsx
import React, { useState } from 'react';
import StoryForm from '../components/StoryForm';
import StoryGenerationOverlay from '../components/StoryGenerationOverlay';
import { promptAPI } from '../services/promptAPI';
import { buildStoryPrompt } from '../utils/buildStoryPrompt';
import { useStory } from '../context/StoryContext';
import { useNavigate } from "react-router";

const CreateHistory = () => {
  const { formData } = useStory();
  const [generating, setGenerating] = useState(false);
  const navigate = useNavigate();

  const handleGenerateStory = async () => {
    try {
      setGenerating(true);
      const prompt = buildStoryPrompt(formData);
      const story = await promptAPI(prompt);
      
      // ✅ Navega para nova rota, enviando a história gerada
      navigate("/history-view", { state: { storyText: story, title: formData.title } });
    } catch (err) {
      console.error("Erro ao gerar a história:", err);
      alert("Erro ao gerar a história. Tente novamente.");
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 sm:p-8 relative">
      <StoryForm onSubmit={handleGenerateStory} />
      <StoryGenerationOverlay visible={generating} />
    </div>
  );
};

export default CreateHistory;
