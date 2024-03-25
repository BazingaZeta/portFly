import React, { useContext, useEffect, useState } from "react";
import { HistoricalData, mockHistoricalData } from "../constants/mock";
import {
  convertDateToUnixTimestamp,
  convertUnixTimestampToDate,
  createDate,
} from "../helpers/date-helper";
import Card from "./Card";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartFilters, chartConfig } from "../constants/config";
import { ThemeContextProps } from "../App";
import ThemeContext from "../context/ThemeContext";
import { fetchHistoricalData } from "../api/stock-api";
import StockContext, { StockContextProps } from "../context/StockContext";
import { ChartFilter } from "./ChartFilter";
import _ from "lodash";

interface ChartProps {}

const Chart: React.FC<ChartProps> = () => {
  const [data, setData] = useState<any | []>(mockHistoricalData);
  const [filter, setFilter] = useState("1D");

  const { darkMode } = useContext(ThemeContext) as ThemeContextProps;
  const { stockSymbol } = useContext(StockContext) as StockContextProps;

  const formatData = (data: HistoricalData) => {
    return (
      !_.isUndefined(data) &&
      data.c.map((item, index) => {
        return {
          value: item.toFixed(2),
          date: convertUnixTimestampToDate(data.t[index]),
        };
      })
    );
  };

  useEffect(() => {
    const getDateRange = () => {
      const { days, weeks, months, years } =
        chartConfig[filter as ChartFilters];
      const endDate = new Date();
      const startDate = createDate({
        date: endDate,
        days: -days,
        weeks: -weeks,
        months: -months,
        years: -years,
      });

      const startTimestampUnix = convertDateToUnixTimestamp(startDate);
      const endTimestampUnix = convertDateToUnixTimestamp(endDate);

      return { startTimestampUnix, endTimestampUnix };
    };
    const updateChartData = async () => {
      try {
        const { startTimestampUnix, endTimestampUnix } = getDateRange();
        const resolution = chartConfig[filter as ChartFilters].resolution;
        const result = await fetchHistoricalData(
          stockSymbol,
          resolution,
          startTimestampUnix,
          endTimestampUnix
        );

        setData(formatData(result));
      } catch (error) {
        setData([]);
        console.log(error);
      }
    };
    updateChartData();
  }, [stockSymbol, filter]);

  return (
    <Card>
      <ul className="flex absolute top-2 right-2 z-40">
        {Object.keys(chartConfig).map((item) => (
          <li key={item}>
            <ChartFilter
              text={item}
              active={filter === item}
              onClick={() => {
                setFilter(item);
              }}
            />
          </li>
        ))}
      </ul>
      <ResponsiveContainer>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="chartColor" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor={darkMode ? "#312e81" : "rgb(199 210 254)"}
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor={darkMode ? "#312e81" : "rgb(199 210 254)"}
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          <Area
            type={"monotone"}
            dataKey={"value"}
            stroke="#312e81"
            fillOpacity={1}
            fill="url(#chartColor)"
            strokeWidth={0.5}
          />
          <Tooltip
            contentStyle={darkMode ? { backgroundColor: "#111827" } : {}}
            itemStyle={darkMode ? { color: "#818cf8" } : {}}
          />
          <XAxis dataKey={"date"} />
          <YAxis domain={["dataMin", "dataMax"]} />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default Chart;
