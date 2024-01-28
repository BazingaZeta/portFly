import React from "react";

export interface StockContextProps {
  stockSymbol: string;
  setStockSymbol: React.Dispatch<React.SetStateAction<string>>;
}

const StockContext = React.createContext<StockContextProps | undefined>(
  undefined
);

export default StockContext;
