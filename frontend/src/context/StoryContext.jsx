// src/context/StoryContext.jsx
import React, { createContext, useContext, useState } from "react";

/**
 * StoryContext fornece:
 * - formData: dados do formulário (etapas)
 * - updateFormData(partial): merge parcial dos dados do form
 * - storyData: texto completo gerado (string)
 * - setFinalStory(text): define a história final
 * - isGenerating / setIsGenerating: estado de geração (overlay)
 */

const StoryContext = createContext(null);

export const StoryProvider = ({ children }) => {
  const [formData, setFormData] = useState({});
  const [storyData, setStoryData] = useState(""); // string com a história
  const [isGenerating, setIsGenerating] = useState(false);

  const updateFormData = (partial) => {
    setFormData((prev) => ({ ...prev, ...partial }));
  };

  const setFinalStory = (text) => {
    setStoryData(text);
  };

  return (
    <StoryContext.Provider
      value={{
        formData,
        updateFormData,
        storyData,
        setFinalStory,
        isGenerating,
        setIsGenerating,
      }}
    >
      {children}
    </StoryContext.Provider>
  );
};

export const useStory = () => {
  const ctx = useContext(StoryContext);
  if (!ctx) throw new Error("useStory must be used within StoryProvider");
  return ctx;
};
