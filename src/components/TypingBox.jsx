import React, { useState, useEffect, useRef } from "react";
import generateWords from "../utils/wordGenerator";

const TOTAL_TIME = 60;

const TypingBox = ({ onSessionEnd }) => {
  const [words, setWords] = useState(generateWords());
  const [input, setInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const startTimeRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setTimeout(() => setTimeLeft(t => t - 1), 1000);
    } else if (timeLeft === 0) finishTest();
    return () => clearTimeout(intervalRef.current);
  }, [timeLeft, isRunning]);

  useEffect(() => {
    if (!isRunning) return;
    const elapsed = TOTAL_TIME - timeLeft;
    const typedWords = input.trim().split(/\s+/).filter(Boolean);
    const origWords = words.split(" ");
    const correct = typedWords.reduce((c, w, i) => (w === origWords[i] ? c + 1 : c), 0);
    const currWpm = elapsed > 0 ? (correct / elapsed) * 60 : 0;
    const currAcc = typedWords.length > 0 ? (correct / typedWords.length) * 100 : 100;
    setWpm(Math.round(currWpm));
    setAccuracy(Math.round(currAcc));
  }, [input, timeLeft]);

  const startTest = () => {
    setIsRunning(true);
    setTimeLeft(TOTAL_TIME);
    setInput("");
    setWpm(0);
    setAccuracy(100);
    setWords(generateWords());
    startTimeRef.current = Date.now();
  };

  const finishTest = () => {
    clearTimeout(intervalRef.current);
    setIsRunning(false);
    const session = { date: Date.now(), wpm, accuracy };
    onSessionEnd(session);
  };

  const handleChange = e => isRunning && setInput(e.target.value);

  return (
    <div className="typing-container">
      <div className="top-bar">
        <button onClick={startTest}>{isRunning ? "Restart" : "Start Test"}</button>
        <p>Time Left: {timeLeft}s</p>
      </div>

      <div className="words-box">
        <div className="words">{words}</div>
      </div>

      <textarea
        value={input}
        onChange={handleChange}
        disabled={!isRunning}
        placeholder="Start typing when ready..."
      />

      <div className="stats">
        <p>WPM: {wpm}</p>
        <p>Accuracy: {accuracy}%</p>
      </div>
    </div>
  );
};

export default TypingBox;
 