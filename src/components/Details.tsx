import React, { useContext } from "react";
import Card from "./Card";
import { CompanyDetails } from "../constants/mock";
import { ThemeContextProps } from "../App";
import ThemeContext from "../context/ThemeContext";

interface DetailsProps {
  details: CompanyDetails;
}
const Details: React.FC<DetailsProps> = ({ details }) => {
  const { darkMode } = useContext(ThemeContext) as ThemeContextProps;

  const detailsList = {
    name: "Name",
    country: "Country",
    currency: "Currency",
    exchange: "Exhange",
    ipo: "IPO Date",
    marketCapitalization: "Market Capitalization",
    finnhubIndustry: "Industry",
  };

  const convertMillionToBillion = (number: number) => {
    return (number / 1000).toFixed(2);
  };
  return (
    <Card>
      <ul
        className={`w-full h-full flex flex-col justify-between divide-y-1 ${
          darkMode ? "divide-gray-800" : null
        }`}
      >
        {Object.keys(detailsList).map((item) => {
          return (
            <li
              key={item}
              className="flex-1 flex justify-between items-center "
            >
              <span>{detailsList[item as keyof typeof detailsList]}</span>
              <span>
                {item === "marketCapitalization"
                  ? `${convertMillionToBillion(details[item])}B`
                  : details[item as keyof typeof detailsList]}
              </span>
            </li>
          );
        })}
      </ul>
    </Card>
  );
};

export default Details;
