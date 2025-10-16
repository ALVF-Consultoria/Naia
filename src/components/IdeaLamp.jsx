// src/components/IdeaLamp.jsx
import React, { useState } from "react";
import { Lamp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { promptAPI } from "../services/promptAPI";

const IdeaLamp = ({ currentStepData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAsk = async () => {
    if (!question.trim()) return;
    setIsLoading(true);
    try {
      const prompt = `User is on step: ${currentStepData?.title || "unknown"}.
Question: ${question}
Respond briefly to help with story creation.`;

      const response = await promptAPI(prompt);
      setAnswer(response);
      setQuestion(""); // limpa o input após enviar
    } catch (err) {
      console.error(err);
      setAnswer("Error processing your question. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Botão da lâmpada */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        animate={{ y: [0, -6, 0], rotate: [0, 10, -10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        whileHover={{ scale: 1.2, boxShadow: "0px 0px 20px rgba(59, 130, 246, 0.6)" }}
        className={`bg-yellow-400 p-4 rounded-full shadow-lg relative z-10 ${
          isOpen ? "shadow-[0_0_20px_#3b82f6]" : ""
        }`}
      >
        <Lamp size={24} className={`${isOpen ? "text-blue-600" : "text-white"}`} />
      </motion.button>

      {/* Janela AI */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.8 }}
            transition={{ duration: 0.4 }}
            className="mt-4 w-80 bg-white bg-opacity-90 backdrop-blur-md rounded-2xl shadow-2xl p-4 flex flex-col gap-3 border border-blue-100"
          >
            <h4 className="font-bold text-blue-700 text-lg flex items-center gap-2">
              💡 Ask the AI
            </h4>

            {/* Resposta da IA com scroll */}
            {answer && (
              <div className="max-h-40 overflow-y-auto p-2 bg-gray-100 rounded-lg text-gray-800 whitespace-pre-wrap">
                {answer}
              </div>
            )}

            {/* Input da pergunta */}
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Type your question..."
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              onClick={handleAsk}
              disabled={isLoading}
              className="bg-blue-600 text-white rounded-lg py-2 font-bold hover:bg-blue-700 transition"
            >
              {isLoading ? "Thinking..." : "Ask AI"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default IdeaLamp;
