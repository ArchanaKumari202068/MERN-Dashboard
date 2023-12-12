import React, { useState, useEffect } from "react";
import { Scatter } from "react-chartjs-2";
import revenueData from "./Data/RevenuData.json";
import api from "../../api/api";
import "./ScatterGraph.css";
import { useInfoContext } from "../../context/InfoContext";
import { capitalizeFirstLetter } from "../utils";
const ScatterGraph = () => {
  const [scatterGraph, setscatterGraph] = useState([]);
  const { category, value, startYear, endyear } = useInfoContext();
  const getScatterGraph = async () => {
    try {
      const getGraph = await api.get(
        `/scatter?category=${category}&start_year_range=${startYear[0]}-${startYear[1]}&end_year_range=${endyear[0]}-${endyear[1]}&xvalue=intensity&yvalue=${value}`
      );
      console.log(getGraph);
      setscatterGraph(getGraph.data);
    } catch (err) {
      console.log("Error in getting Scatter graph", err);
    }
  };
  useEffect(() => {
    getScatterGraph();
  }, [category, value, startYear, endyear]);
  return (
    <div className="Scatter graph_container">
      <Scatter
        data={{
          // labels: revenueData.map((data) => data.label),
          datasets: scatterGraph,
        }}
        options={{
          scales: {
            x: {
              title: {
                display: true,
                text: "Intensity",
                color: "black",
                font: {
                  size: 25,
                  weight: 700,
                },
              },
              grid: {
                drawOnChartArea: false,
              },
            },
            y: {
              title: {
                display: true,
                text: capitalizeFirstLetter(value),
                color: "black",
                font: {
                  size: 25,
                  weight: 700,
                },
              },
              beginAtZero: true,
              grid: {
                drawOnChartArea: false,
              },
            },
          },
          plugins: {
            title: {
              display: "true",
              text: "Impact Vs Intensity",
              // Alignment:"start",
              font: {
                size: 30,
              },
            },
          },
        }}
      />
    </div>
  );
};

export default ScatterGraph;
