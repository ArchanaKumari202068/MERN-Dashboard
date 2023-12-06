import React from "react";
import "./Values.css";
import { FaAnchor } from "react-icons/fa";
import { FaBalanceScale } from "react-icons/fa";
import { FaChartLine } from "react-icons/fa";
import { FaBattleNet } from "react-icons/fa";



let values =[
    {
      name:"Impact",
      icon:<FaAnchor />
    },
    {
        name:"Relevance",
        icon:<FaBalanceScale />
    },
    {
        name:"Likelihood",
        icon:<FaChartLine />
    },
    {
        name:"Intensity",
        icon:<FaBattleNet />
    },
    
    
    
  
  ]

function Values() {
    return ( 
        <>
        <div className="Values">
            <p>Values</p>
        </div>
        <div className="Values_container">
           {
            values.map((el)=>
            {
                return <div className="values_part">
                   <p className="values_icon">{el.icon}</p>
                   <p>{el.name}</p>
                </div>
            })
           }
        </div>
        </>
     );
}

export default Values;