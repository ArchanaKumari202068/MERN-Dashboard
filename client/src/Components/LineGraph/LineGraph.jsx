import React from 'react'
import './LineGraph.css'
import {Chart,defaults} from "chart.js/auto";
import {Line} from "react-chartjs-2"
const LineGraph = () => {
  return (
    <>
    <div className='LineGraph_container'>
    <Line data={{
        labels:revenueData.map((data)=>data.label),
        datasets:[
          {
            label:"Revenue",
            data:revenueData.map((data)=>data.revenue),
            borderColor:"rgba(160,68,300,0.8)",
            backgroundColor:"rgba(43,68,300,0.4)",
            pointRadius: 8,
          },
          {
            label:"Cost",
            data:revenueData.map((data)=>data.cost),
            borderColor:"rgba(30,180,190,0.8)",
            pointStyle: 'triangle',
            pointRadius: 8,
            
            hoverRadius: 15,
          },
          
        ]
      }}

      // options={{
      //   animations: {
      //     tension: {
      //       duration: 5000,
      //       easing: 'linear',
      //       from: 1,
      //       to: 0,
      //       // loop: true
      //     }
      //   },
      // }}
      
      />

    </div>
    </>
  )
}

export default LineGraph