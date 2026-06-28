export const wordsCount = (text: string): number => {
  if (!text.trim()) return 0;

  return text.trim().split(/\s+/).length;
};

export const calculateReadTime = (text: string): number => {
  const words = wordsCount(text);

  return Math.ceil(words / 50);
};

