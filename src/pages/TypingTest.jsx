import React from "react";
import TypingBox from "../components/TypingBox";

const TypingTest = ({ onSessionEnd }) => (
  <div className="typing-test-page">
    <TypingBox onSessionEnd={onSessionEnd} />
  </div>
);

export default TypingTest;
