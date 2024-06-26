import { MoonIcon } from "@heroicons/react/24/solid";
import React, { useContext } from "react";
import ThemeContext from "../context/ThemeContext";
import { ThemeContextProps } from "../App";

const ThemeIcon = () => {
  const { darkMode, setDarkMode } = useContext(
    ThemeContext
  ) as ThemeContextProps;

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  return (
    <button
      onClick={toggleDarkMode}
      className={`rounded-lg border-1 border-neutral-400 p-2 absolute right-8 xl:right-32 shadow-lg ${
        darkMode ? "shadow-gray-800" : null
      }`}
    >
      <MoonIcon
        className={`h-8 w-8 cursor-pointer stroke-1 fill-none stroke-neutral-400 ${
          darkMode
            ? "fill-yellow-400 stroke-yellow-400"
            : "fill-none stroke-neutral-400"
        }`}
      />
    </button>
  );
};

export default ThemeIcon;
