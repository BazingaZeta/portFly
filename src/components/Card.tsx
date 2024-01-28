import React, { ReactNode, useContext } from "react";
import { ThemeContextProps } from "../App";
import ThemeContext from "../context/ThemeContext";

interface CardProps {
  children: ReactNode;
}

const Card: React.FC<CardProps> = ({ children }) => {
  const { darkMode } = useContext(ThemeContext) as ThemeContextProps;
  return (
    <div
      className={`w-full h-full rounded-md relative p-8 border-2 bg-white border-neutral-200 ${
        darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-neutral-200"
      }`}
    >
      {children}
    </div>
  );
};

export default Card;
