import React, { useEffect, useState } from "react";
import "./BarGraph.css";
import sourceData from "./Data/sourceData.json";
import { Chart, defaults, scales } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import api from "../../api/api";
import { useInfoContext } from "../../context/InfoContext";
import { capitalizeFirstLetter } from "../utils";
function BarGraph() {
  const [barGraphData, setBarGraphData] = useState([]);
  const { category, value, startYear, endyear } = useInfoContext();

  const getBarGraph = async () => {
    try {
      const getGraph = await api.get(
        `/bar?category=${category}&value=${value}&start_year_range=${startYear[0]}-${startYear[1]}&end_year_range=${endyear[0]}-${endyear[1]}`
      );
      console.log("get Bar graph data", getGraph);
      setBarGraphData(getGraph.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getBarGraph();
  }, [category, value, startYear, endyear]);

  return (
    <div className="BarGraph_main_container graph_container">
      <Bar
        data={{
          // labels:["A","B","C"],
          labels: barGraphData.map((data) => data.category),
          datasets: [
            {
              label: "Count",
              data: barGraphData.map((data) => data.value),
              backgroundColor: [
                "rgba(43,68,300,0.4)",
                "rgba(160,68,300,0.4)",
                "rgba(43,180,290,0.4)",
              ],
              borderRadius: 5,
              borderColor: "rgba(0,0,0,0.3)",
              borderWidth: 2,
              base: 0,
              categoryPercentage: 0.3,
              pointStyle: "circle",
            },
          ],
        }}
        options={{
          scales: {
            x: {
              title: {
                display: true,
                text: `${capitalizeFirstLetter(category)}`,
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
                text: `${capitalizeFirstLetter(value)}`,
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
  );
}

export default BarGraph;
