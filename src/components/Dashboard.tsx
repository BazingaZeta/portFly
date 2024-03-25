import { useEffect, useState, useContext } from "react";
import { CompanyDetails, StockQuote } from "../constants/mock";
import Header from "./Header";
import Details from "./Details";
import Overview from "./Overview";
import Chart from "./Chart";
import ThemeContext from "../context/ThemeContext";
import { ThemeContextProps } from "../App";
import StockContext, { StockContextProps } from "../context/StockContext";
import { fetchQuote, fetchStockDetails } from "../api/stock-api";

const Dashboard = () => {
  const { darkMode } = useContext(ThemeContext) as ThemeContextProps;
  const { stockSymbol } = useContext(StockContext) as StockContextProps;

  const [stockDetails, setStockDetails] = useState<CompanyDetails | {}>({});
  const [quote, setQuote] = useState<StockQuote | {}>({});

  useEffect(() => {
    const updateStockDetails = async () => {
      try {
        const result = await fetchStockDetails(stockSymbol);
        setStockDetails(result);
      } catch (error) {
        setStockDetails({});
        console.log(error);
      }
    };
    const updateStockOverview = async () => {
      try {
        const result = await fetchQuote(stockSymbol);
        setQuote(result);
      } catch (error) {
        setQuote({});
        console.log(error);
      }
    };

    updateStockDetails();
    updateStockOverview();
  }, [stockSymbol]);

  return (
    <div
      className={`h-screen grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 grid-rows-8 md:grid-rows-7 xl:grid-rows-5 auto-rows-fr gap-6 p-10 font-quicksand  ${
        darkMode ? "bg-gray-900 text-gray-300" : "bg-neutral-100"
      }`}
    >
      <>
        <div className="col-span-1 md:col-span-3 xl:col-span-3 row-span-1 flex justify-start items-center">
          <Header name={(stockDetails as CompanyDetails)?.name} />
        </div>
        <div className="md:col-span-2 row-span-4">
          <Chart />
        </div>
        <div>
          <Overview
            symbol={(stockDetails as CompanyDetails)?.ticker}
            price={(quote as StockQuote)?.pc}
            change={(quote as StockQuote)?.d}
            changePercent={(quote as StockQuote)?.dp}
            currency={(stockDetails as CompanyDetails)?.currency}
          />
        </div>
        <div className="row-span-2 xl:row-span-3">
          <Details details={stockDetails as CompanyDetails} />
        </div>
      </>
    </div>
  );
};

export default Dashboard;
