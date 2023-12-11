import React,{useState,useEffect} from "react";
import { Scatter } from "react-chartjs-2";
import revenueData from "./Data/RevenuData.json";
import api from "../../api/api";
import { useInfoContext } from "../../context/InfoContext";
import { capitalizeFirstLetter } from "../utils";
const ScatterGraph = () => {
  const [scatterGraph,setscatterGraph] =useState([])
  const {
    category,
    value,
    startYear,
    endyear,
  } = useInfoContext();
  const getScatterGraph = async() =>{
    try {
      const getGraph = await api.get(`/scatter?category=${category}&start_year_range=${startYear[0]}-${startYear[1]}&end_year_range=${endyear[0]}-${endyear[1]}`)
      
    } catch (err) {
      console.log("Error in getting Scatter graph",err)
      
    }
  }
  return (
    <div>
      <Scatter
        data={{
          labels: revenueData.map((data) => data.label),
          datasets: [
            {
              label: "Revenue",
              data: 
               revenueData.map((data,idx)=>{
                return {
                    x:data.cost,
                    y:data.revenue
                }
               })

            ,
              // revenueData.map((data)=>data.revenue),
              borderColor: "rgba(160,68,300,0.8)",
              backgroundColor: "rgba(43,68,300,0.4)",
              pointRadius: 8,
            },
          ],
        }}
        options={{
            scales: {
                x: {
                  title: {
                    display: true,
                    text: "Impact",
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
                    text: "Intensity",
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
              plugins:{
                title:{
                    display:"true",
                    text:"Impact Vs Intensity",
                    // Alignment:"start",
                    font:{
                      size:30
                      
                    },
                }
              }
        }}
      />
    </div>
  );
};

export default ScatterGraph;
