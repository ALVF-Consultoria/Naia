import React from "react";

const SaveStoryButton = ({ storyText, title = "Minha História" }) => {
  const handleSaveStory = () => {
    if (!storyText || storyText.trim().length === 0) {
      alert("Nenhuma história para salvar!");
      return;
    }

    // Pega histórias já salvas
    const savedStories = JSON.parse(localStorage.getItem("stories")) || [];

    // Cria um novo objeto de história
    const newStory = {
      id: Date.now(),
      title,
      text: storyText,
      createdAt: new Date().toLocaleString(),
    };

    // Adiciona e salva
    const updatedStories = [newStory, ...savedStories];
    localStorage.setItem("stories", JSON.stringify(updatedStories));

    alert("✅ História salva com sucesso!");
  };

  return (
    <button
      onClick={handleSaveStory}
      className=" p-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition duration-300 shadow-lg"
    >
      💾 Salvar no Meus Livros
    </button>
  );
};

export default SaveStoryButton;
