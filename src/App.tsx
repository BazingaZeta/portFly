import React, { useState } from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
import ThemeContext from "./context/ThemeContext";

export interface ThemeContextProps {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const themeContextValue: ThemeContextProps = {
    darkMode,
    setDarkMode,
  };

  return (
    <ThemeContext.Provider value={themeContextValue}>
      <Dashboard />
    </ThemeContext.Provider>
  );
}

export default App;
