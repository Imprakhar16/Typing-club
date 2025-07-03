import React from "react";
import { Link } from "react-router-dom";

const Home = () => (
  <div className="home">
    <h2>Welcome to Typing Master</h2>
    <p>Improve your typing speed and accuracy with real-time feedback.</p>
    <Link to="/test">
      <button>Start Typing Test</button>
    </Link>
  </div>
);

export default Home;
