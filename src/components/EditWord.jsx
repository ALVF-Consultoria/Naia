import React, { useState } from "react";
import { promptAPI } from "../services/promptAPI"; // sua função de chamada da IA

const EditWord = ({ storyText, setStoryText }) => {
  const [findWord, setFindWord] = useState("");
  const [replaceWord, setReplaceWord] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReplace = async () => {
    if (!findWord || !replaceWord) return;
    setLoading(true);

    try {
      // Prompt ajustado para retornar APENAS o texto atualizado
      const prompt = `
Substitua todas as ocorrências da palavra "${findWord}" por "${replaceWord}" no texto abaixo. 
Retorne apenas o texto atualizado, sem comentários, explicações ou repetições do prompt.
Texto original: """${storyText}"""
`;

      const updatedStory = await promptAPI(prompt); // chama sua IA
      setStoryText(updatedStory);
      setFindWord("");
      setReplaceWord("");
    } catch (err) {
      console.error(err);
      alert("Erro ao atualizar a história.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-3 p-4 bg-gray-50 rounded-lg shadow-md w-full max-w-2xl">
      <label>
        Onde tem:
        <input
          type="text"
          value={findWord}
          onChange={(e) => setFindWord(e.target.value)}
          className="border p-2 rounded w-full mt-1"
          placeholder="Palavra a ser substituída"
        />
      </label>

      <label>
        Troque por:
        <input
          type="text"
          value={replaceWord}
          onChange={(e) => setReplaceWord(e.target.value)}
          className="border p-2 rounded w-full mt-1"
          placeholder="Nova palavra"
        />
      </label>

      <button
        onClick={handleReplace}
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
      >
        {loading ? "Atualizando..." : "Aplicar"}
      </button>
    </div>
  );
};

export default EditWord;
