import React from "react";
import { Scatter } from "react-chartjs-2";
import revenueData from "./Data/RevenuData.json";
const ScatterGraph = () => {
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
