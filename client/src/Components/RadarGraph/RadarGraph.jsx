import React from 'react'
import "./RadarGraph.css";
import { Radar } from "react-chartjs-2";
import revenueData from "./Data/RevenuData.json";
const RadarGraph = () => {
  return (
    <>
    <div className='RadarGraph_container'>
         <Radar data={{
          labels:revenueData.map((data)=>data.label),
          datasets:[
            {
              label:"Revenue",
              data:revenueData.map((data)=>data.revenue),
              backgroundColor:[
                // "rgba(43,68,300,0.4)",
                // "rgba(160,68,300,0.4)",
                "rgba(43,180,290,0.4)"
              ],
              borderRadius:5,
             
              borderColor:[
                // "rgba(43,68,300,0.6)",
                // "rgba(160,68,300,0.6)",
                "rgba(43,180,290,0.6)"
              ],
              borderWidth:2,          
              base:0,
              categoryPercentage:0.3,
              pointStyle:'circle',
              spacing:5

            },
            {
                  label: "Cost",
                  
                  data: revenueData.map((data) => data.cost),
                  backgroundColor:"red",
                  borderColor: "rgba(30,180,190,0.8)",
                 
                },
            
           
          ]
        }}
        options={{
          // maintainAspectRatio: false,
          plugins:{
            title:{
              display:"true",
              text:"Revenue Sources",
              // Alignment:end,
              font:{
                size:30
                
              },
              // weight:600
            },
            // elements: {
            //   line: {
            //     borderWidth: 3
            //   },
            legend:{
             
                labels:{
                  display:"true",
                  usePointStyle:"true",
                  color:'black',
                  strokeStyle: 'color',
                  borderWidth:30,
                  // lineWidth: 5,
                  pointStyle: 'circle',
                  // borderRadius:'50',
                  rotation:7
                }     
            }  
          }
        }}
        />
        </div>
    </>
  )
}

export default RadarGraph