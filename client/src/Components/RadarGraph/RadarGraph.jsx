import React, { useState, useEffect } from "react";
import "./RadarGraph.css";
import { Radar } from "react-chartjs-2";
import revenueData from "./Data/RevenuData.json";
import api from "../../api/api";
import { useInfoContext } from "../../context/InfoContext";
import { capitalizeFirstLetter } from "../utils";
const RadarGraph = () => {
  const [seletedData, setSelectedData] = useState([]);
  const [radarGraph, setRadarGraph] = useState([]);
  const { category, value, startYear, endyear } = useInfoContext();

  const getRadarGraph = async () => {
    try {
      const getGraph = await api.get(
        `/radar?category=${category}&start_year_range=${startYear[0]}-${startYear[1]}&end_year_range=${endyear[0]}-${endyear[1]}`
      );
      console.log("get radar graph", getGraph);

      let allData = getGraph.data.map((el) => {
        return { ...el, isActive: false };
      });
      let selected = [];

      for (let i = 0; i < 3; i++) {
        if (i < allData.length) {
          allData[i].isActive = true;
          selected.push({
            label: allData[i].category,
            data: [
              allData[i].frequency * 100,
              allData[i].impact * 100,
              allData[i].intensity * 100,
              allData[i].likelihood * 100,
              allData[i].relevance * 100,
            ],
          });
        }
      }

      setRadarGraph(allData);
      setSelectedData(selected);
    } catch (err) {
      console.log("error in getting Radar Graph", err);
    }
  };

  const handleLabelClick = (cat, data, isActive) => {
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
          data: data,
        },
      ]);
    }
    const filtered = radarGraph.map((el) => {
      if (el.category == cat) {
        el.isActive = !isActive;
      }
      return el;
    });

    setRadarGraph(filtered);
  };

  useEffect(() => {
    getRadarGraph();
  }, [category, startYear, endyear]);
  return (
    <>
      <div className="RadarGraph_container">
        <div className="labels">
          {radarGraph.map((el) => {
            return (
              <p
                onClick={() => {
                  let data = [
                    el.frequency * 100,
                    el.impact * 100,
                    el.intensity * 100,
                    el.likelihood * 100,
                    el.relevance * 100,
                  ];
                  handleLabelClick(el.category, data, el.isActive);
                }}
                className={`label ${el.isActive ? "active" : ""}`}
              >
                {el.category}
              </p>
            );
          })}
        </div>
        <div className="radar-graph">
          <Radar
            data={{
              labels: [
                "frequency",
                "impact",
                "intensity",
                "likelihood",
                "relevance",
              ],
              datasets: seletedData,
              // datasets: radarGraph.map((el) => {
              //   return {
              //     label: el.category,
              // data: [
              //   el.frequency * 100,
              //   el.impact * 100,
              //   el.intensity * 100,
              //   el.likelihood * 100,
              //   el.relevance * 100,
              // ],
              //   };
              // }),
            }}
            options={{
              // maintainAspectRatio: false,
              plugins: {
                title: {
                  display: "true",
                  text: capitalizeFirstLetter(category),
                  // Alignment:end,
                  font: {
                    size: 20,
                  },
                  // weight:600
                },
                // elements: {
                //   line: {
                //     borderWidth: 3
                //   },
                legend: {
                  labels: {
                    display: "true",
                    usePointStyle: "true",
                    color: "black",
                    strokeStyle: "color",
                    borderWidth: 30,
                    // lineWidth: 5,
                    pointStyle: "circle",
                    // borderRadius:'50',
                    rotation: 7,
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

export default RadarGraph;
