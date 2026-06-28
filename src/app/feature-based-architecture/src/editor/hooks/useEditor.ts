import { useState } from "react";
import { calculateReadTime, wordsCount } from "../utils/index";

export const useEditor = () => {
  const [content, setContent] = useState<string>("");

  const wordCount = wordsCount(content);
  const readTime = calculateReadTime(content);

  return {
    content,
    setContent,
    wordCount,
    readTime,
  };
};
