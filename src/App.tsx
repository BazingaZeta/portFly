import React, { useState } from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
import ThemeContext from "./context/ThemeContext";
import StockContext from "./context/StockContext";

export interface ThemeContextProps {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [stockSymbol, setStockSymbol] = useState("MSFT");

  const themeContextValue: ThemeContextProps = {
    darkMode,
    setDarkMode,
  };

  return (
    <ThemeContext.Provider value={themeContextValue}>
      <StockContext.Provider value={{ stockSymbol, setStockSymbol }}>
        <Dashboard />
      </StockContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;
