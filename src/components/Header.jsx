import React from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

const Header = () => (
  <header className="header">
    <h1>Typing Master</h1>
    <nav>
      <Link to="/">Home</Link>
      <Link to="/test">Typing Test</Link>
      <Link to="/dashboard">Dashboard</Link>
      <ThemeToggle />
    </nav>
  </header>
);

export default Header;
