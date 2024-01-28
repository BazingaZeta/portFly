import React from "react";

interface ThemeContextProps {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const ThemeContext = React.createContext<ThemeContextProps | undefined>(
  undefined
);

export default ThemeContext;
