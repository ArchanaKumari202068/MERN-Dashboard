import React from "react";
import "./LineGraph.css";
import { Chart, defaults, scales } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import revenueData from "./Data/revenueData.json";
defaults.responsive = true;
// defaults.maintainAspectRatio = false;
Chart.defaults.font.size = 14;
const LineGraph = () => {
  return (
    <>
      <div className="LineGraph_container">
        <div className="LineGraph">
          <Line
            data={{
              labels: revenueData.map((data) => data.label),
              datasets: [
                {
                  label: "Revenue",
                  data: revenueData.map((data) => data.revenue),
                  borderColor: "rgba(160,68,300,0.8)",
                  backgroundColor: "rgba(43,68,300,0.4)",
                //   width:100,
                  //   pointRadius: 8,
                },
                {
                  label: "Cost",
                  data: revenueData.map((data) => data.cost),
                  borderColor: "rgba(30,180,190,0.8)",
                  //   pointStyle: "triangle",
                  //   pointRadius: 8,
                  //   hoverRadius: 15,
                },
              ],
            }}
            options={{
              scales: {
                x: {
                  title: {
                    display: true,
                    text: "YEAR",
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
                    text: "Impact",
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
                    borderRadius:50,

                    // font:20,
                    //   rotation:7
                    boxWidth: 70
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
