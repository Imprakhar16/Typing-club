const wordsList = [
    "cat", "dog", "keyboard", "react", "javascript", "node", "apple", "sun",
    "computer", "mouse", "monitor", "function", "arrow", "const", "variable",
  ];
  
  const generateWords = (count = 30) => {
    return Array.from({ length: count }, () =>
      wordsList[Math.floor(Math.random() * wordsList.length)]
    ).join(" ");
  };
  
  export default generateWords;
  