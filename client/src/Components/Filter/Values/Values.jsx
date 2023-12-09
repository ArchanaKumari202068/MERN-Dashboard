import React, { useState } from "react";
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

function Values({selectedValue,setSelectedValue}) {

    


    

    return ( 
        <>
        <div className="value_main">
        <div className="Values">
            <p>Values</p>
        </div>
        <div className="Values_container">
           {
            values.map((el)=>
            {
                return <div className={`value_part ${selectedValue===el.name?'active':''}`} onClick={()=>{setSelectedValue(el.name)}}>
                   <div className="value_content">
                       <p className="values_icon">{el.icon}</p>
                       <p className="values_name">{el.name}</p>
                   </div>

                </div>
            })
           }
        </div>
        </div>
        </>
     );
}

export default Values;