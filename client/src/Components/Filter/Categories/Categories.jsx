import React from "react";
import "./Categories.css";
import { FaBookOpen } from "react-icons/fa";
import { FaGlobe } from "react-icons/fa";
import { FaBriefcase } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaFortAwesome } from "react-icons/fa";

import { FaBook } from "react-icons/fa";

let categories =[
  {
    name:"Countries",
    icon:<FaGlobe />
  },
  {
    name:"Topics",
    icon:<FaBookOpen />
  },
  {
    name:"Sectors",
    icon:<FaBriefcase />
  },
  {
    name:"Regions",
    icon:<FaMapMarkerAlt />
  },
  {
    name:"Pestle",
    icon:<FaFortAwesome />
  },
  {
    name:"Sources",
    icon:<FaBook />
  },

]

function Categories() {
  return (
    <>
      <div className=" Categories">
        <p>Categories</p>
      </div>
      <div className="Categories_container">
         {
          categories.map((el)=>{
            return <div className="Categories_part">
             <div className="Categories_content">
                  <p className="Categories_icon">{el.icon}</p>
                  <p>{el.name}</p>
             </div>

              
            </div>
          })
         }
      </div>
      
    </>
  );
}

export default Categories;
