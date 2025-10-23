// src/pages/StoriesPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
// import { saveAs } from "file-saver";
import EbookViewer from "../components/EbookViewer";

const StoriesPage = () => {
  const navigate = useNavigate();
  const [stories, setStories] = useState([]);

  // Carrega as histórias do localStorage
  useEffect(() => {
    const savedStories = JSON.parse(localStorage.getItem("stories")) || [];
    setStories(savedStories);
  }, []);


  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center">📚 Minhas Histórias</h1>

      {stories.length === 0 && (
        <p className="text-center text-gray-500">Nenhuma história criada ainda.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map((story, idx) => (
          <div
            key={idx}
            className="bg-white p-4 rounded-xl shadow-lg flex flex-col justify-between"
          >
            <p className="text-gray-800 mb-4 line-clamp-5">{story}</p>
            <div className="flex justify-between mt-auto">
              <button
                className="px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                onClick={() =>
                  navigate("/flipbook", { state: { storyText: story } })
                }
              >
                📖 Folheável
              </button>
              <button
                className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                
              >
                ⬇️ EPUB
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoriesPage;
