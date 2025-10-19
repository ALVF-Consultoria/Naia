// src/components/StoryGenerationOverlay.jsx
import React, { useEffect, useState } from "react";

const steps = [
  "Criando Personagem...",
  "Definindo Cenário...",
  "Ajustando Atmosfera...",
  "Elaborando Conflitos...",
  "Dando os Últimos Toques..."
];

const StoryGenerationOverlay = ({ visible }) => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (!visible) return;
    setCurrentStep(0);
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 1200);
    return () => clearInterval(interval);
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex flex-col items-center justify-center text-white">
      <div className="p-8 rounded-xl shadow-lg flex flex-col items-center gap-6">
        <h2 className="text-2xl font-bold">Gerando História</h2>
        <div className="text-lg animate-pulse">{steps[currentStep]}</div>

        {/* Spinner */}
        <div className="mt-4 w-16 h-16 border-4 border-t-blue-500 border-l-blue-500 border-gray-200 rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default StoryGenerationOverlay;
