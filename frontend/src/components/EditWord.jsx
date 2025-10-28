import React, { useState } from "react";
import { promptAPI } from "../services/promptAPI"; // your AI call function

const EditWord = ({ storyText, setStoryText }) => {
  const [findWord, setFindWord] = useState("");
  const [replaceWord, setReplaceWord] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReplace = async () => {
    if (!findWord || !replaceWord) return;
    setLoading(true);

    try {
      // Adjusted prompt to return ONLY the updated text
      const prompt = `
Replace all occurrences of the word "${findWord}" with "${replaceWord}" in the text below.
Return only the updated text, without comments, explanations, or repetitions of the prompt.
Original text: """${storyText}"""
`;

      const updatedStory = await promptAPI(prompt); // calls your AI
      setStoryText(updatedStory);
      setFindWord("");
      setReplaceWord("");
    } catch (err) {
      console.error(err);
      alert("Error updating the story.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-3 p-4 bg-gray-50 rounded-lg shadow-md w-full max-w-2xl">
      <label>
        Find word:
        <input
          type="text"
          value={findWord}
          onChange={(e) => setFindWord(e.target.value)}
          className="border p-2 rounded w-full mt-1"
          placeholder="Word to be replaced"
        />
      </label>

      <label>
        Replace with:
        <input
          type="text"
          value={replaceWord}
          onChange={(e) => setReplaceWord(e.target.value)}
          className="border p-2 rounded w-full mt-1"
          placeholder="New word"
        />
      </label>

      <button
        onClick={handleReplace}
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
      >
        {loading ? "Updating..." : "Apply"}
      </button>
    </div>
  );
};

export default EditWord;
