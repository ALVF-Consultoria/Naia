import React from "react";
import StoryForm from "../components/StoryForm";
import StoryGenerationOverlay from "../components/StoryGenerationOverlay";
import { promptAPI } from "../services/promptAPI";
import { buildStoryPrompt } from "../utils/buildStoryPrompt";
import { useStory } from "../context/StoryContext";
import { useNavigate } from "react-router";

const CreateHistory = () => {
  const { formData, setFinalStory, isGenerating, setIsGenerating } = useStory();
  const navigate = useNavigate();

  const handleGenerateStory = async () => {
    setIsGenerating(true);
    try {
      const prompt = buildStoryPrompt(formData);

      console.log(prompt)

      const response = await promptAPI(prompt);

      console.log(response)

      // Clean possible code blocks ```...```
      let cleaned = response.trim();
      if (cleaned.startsWith("```")) {
        const firstLineBreak = cleaned.indexOf("\n");
        const lastBackticks = cleaned.lastIndexOf("```");
        cleaned = cleaned.substring(firstLineBreak + 1, lastBackticks).trim();
      }

      // If it returns JSON {"title": "...", "story": "..."}
      let storyText = cleaned;
      let title = formData.title || "My Story";

      try {
        const parsed = JSON.parse(cleaned);
        if (parsed.story) storyText = parsed.story;
        if (parsed.title) title = parsed.title;
      } catch {
        // if not JSON, assume plain text
      }

      // Save in context
      setFinalStory(storyText, title);

      // Navigate to story view
      navigate("/history-view");
    } catch (error) {
      console.error("Error generating the story:", error);
      alert("Error generating the story. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 sm:p-8 relative">
      <StoryForm onSubmit={handleGenerateStory} />
      <StoryGenerationOverlay visible={isGenerating} />
    </div>
  );
};

export default CreateHistory;
