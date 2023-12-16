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
  const [seletedData, setSelectedData] = useState([]);
  const { category, value, startYear, endyear } = useInfoContext();
  const getLineGraph = async () => {
    try {
      const getGraph = await api.get(
        `/line?category=${category}&value=${value}&start_year_range=${startYear[0]}-${startYear[1]}&end_year_range=${endyear[0]}-${endyear[1]}`
      );
      console.log("get line Graph", getGraph);
      let allData = getGraph.data.map((el) => {
        return { ...el, isActive: false };
      });

      let seleted = [];
      for (let i = 0; i < 3; i++) {
        if (i < allData.length) {
          allData[i].isActive = true;
          seleted.push({ label: allData[i].category, data: allData[i].values });
        }
      }
      setLineGraph(allData);
      setSelectedData(seleted);
    } catch (err) {
      console.log("Error in getting Line Graph", err);
    }
  };

  const handleLabelClick = (cat, vals, isActive) => {
    if (isActive) {
      const filtered = seletedData.filter((el) => {
        return el.label != cat;
      });
      setSelectedData(filtered);
    } else {
      setSelectedData([
        ...seletedData,
        {
          label: cat,
          data: vals,
        },
      ]);
    }
    const filtered = lineGraphData.map((el) => {
      if (el.category == cat) {
        el.isActive = !isActive;
      }
      return el;
    });
    setLineGraph(filtered);
  };
  useEffect(() => {
    getLineGraph();
  }, [category, value, startYear, endyear]);
  return (
    <>
      <div className="LineGraph_container graph_container">
        <div className="labels">
          {lineGraphData.map((el) => {
            return (
              <p
                onClick={() => {
                  handleLabelClick(el.category, el.values, el.isActive);
                }}
                className={`label ${el.isActive ? "active" : ""}`}
              >
                {el.category}
              </p>
            );
          })}
        </div>

        <div className="LineGraph">
          <Line
            data={{
              labels: range(startYear[0], startYear[1] + 1),
              datasets: seletedData,
              // datasets: lineGraphData.map((el) => {
              //   return {
              //     label: el.category,
              //     data: el.values,
              //     // backgroundColor:"rgba(43,68,300,0.4)"
              //   };
              // }),
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
