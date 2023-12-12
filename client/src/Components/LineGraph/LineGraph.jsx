import React, { useState, useEffect } from "react";
import "./LineGraph.css";
import { Chart, defaults, scales } from "chart.js/auto";
import { Line } from "react-chartjs-2";
// import revenueData from "./Data/revenueData.json";
import api from "../../api/api";
import { useInfoContext } from "../../context/InfoContext";
import { capitalizeFirstLetter, range } from "../utils";
defaults.responsive = true;
// defaults.maintainAspectRatio = false;
Chart.defaults.font.size = 14;
const LineGraph = () => {
  const [lineGraphData, setLineGraph] = useState([]);
  const { category, value, startYear, endyear } = useInfoContext();
  const getLineGraph = async () => {
    try {
      const getGraph = await api.get(
        `/line?category=${category}&value=${value}&start_year_range=${startYear[0]}-${startYear[1]}&end_year_range=${endyear[0]}-${endyear[1]}`
      );
      console.log("get line Graph", getGraph);
      setLineGraph(getGraph.data);
    } catch (err) {
      console.log("Error in getting Line Graph", err);
    }
  };
  useEffect(() => {
    getLineGraph();
  }, [category, value, startYear, endyear]);
  return (
    <>
      <div className="LineGraph_container graph_container">
        <div className="LineGraph">
          <Line
            data={{
              labels: range(startYear[0], startYear[1] + 1),
              datasets: lineGraphData.map((el) => {
                return {
                  label: el.category,
                  data: el.values,
                  // backgroundColor:"rgba(43,68,300,0.4)"
                };
              }),
            }}
            options={{
              scales: {
                x: {
                  title: {
                    display: true,
                    text: "Year",
                    color: "black",
                    font: {
                      size: 20,
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
                      size: 20,
                      weight: 700,
                    },
                  },
                  beginAtZero: true,
                  grid: {
                    drawOnChartArea: false,
                  },
                },
              },
              maintainAspectRatio: false,

              plugins: {
                legend: {
                  labels: {
                    display: "true",
                    usePointStyle: "true",
                    //   color:'blue',

                    //   strokeStyle: ' #FF9F43',
                    lineWidth: 5,
                    pointStyle: "circle",
                    borderRadius: 50,

                    // font:20,
                    //   rotation:7
                    boxWidth: 70,
                  },
                },
              },
            }}
          />
        </div>
      </div>
    </>
  );
};

export default LineGraph;
