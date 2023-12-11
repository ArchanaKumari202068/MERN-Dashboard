import React, { useState, useEffect } from "react";
import "./RadarGraph.css";
import { Radar } from "react-chartjs-2";
import revenueData from "./Data/RevenuData.json";
import api from "../../api/api";
import { useInfoContext } from "../../context/InfoContext";
import { capitalizeFirstLetter } from "../utils";
const RadarGraph = () => {
  const [radarGraph, setRadarGraph] = useState([]);
  const { category, value, startYear, endyear } = useInfoContext();

  const getRadarGraph = async () => {
    try {
      const getGraph = await api.get(
        `/radar?category=${category}&start_year_range=${startYear[0]}-${startYear[1]}&end_year_range=${endyear[0]}-${endyear[1]}`
      );
      console.log("get radar graph", getGraph);
      setRadarGraph(getGraph.data);
    } catch (err) {
      console.log("error in getting Radar Graph", err);
    }
  };
  useEffect(() => {
    getRadarGraph();
  }, [category,startYear,endyear]);
  return (
    <>
      <div className="RadarGraph_container">
        <Radar
          data={{
            labels:['frequency','impact','intensity','likelihood','relevance'],
            datasets: radarGraph.map((el)=>{
              if (el.category == "")return {}
              return {
                label:el.category,
                data:[el.frequency,el.impact,el.intensity,el.likelihood,el.relevance]
              }
            }),
          }}
          options={{
            // maintainAspectRatio: false,
            plugins: {
              title: {
                display: "true",
                text: "Revenue Sources",
                // Alignment:end,
                font: {
                  size: 30,
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
    </>
  );
};

export default RadarGraph;
