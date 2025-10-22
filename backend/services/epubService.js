import Epub from "epub-gen";
import path from "path";

export const generateEpub = async (title, author, storyText) => {
  const chapters = storyText.split("\n\n").map((para, i) => ({
    title: `Capítulo ${i + 1}`,
    data: para,
  }));

  const options = {
    title,
    author,
    content: chapters,
  };

  const filePath = path.join(process.cwd(), "output", `${title}.epub`);
  await new Epub(options, filePath);
  return filePath;
};
