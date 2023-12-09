import React from "react";
import "./Statistics.css";
import { FaNewspaper } from "react-icons/fa";
import { FaBookOpen } from "react-icons/fa";
import { FaBriefcase } from "react-icons/fa";
import { FaBook } from "react-icons/fa";
import { FaGlobe } from "react-icons/fa";


function Statistics() {
    return ( 
        <div className="Statistics_main">
            <p className="Statistics_heading">Statistics</p>
         <div className="Statistics">
            <div className="Statistics_container">
              <div className="Statistics_icon_news">
                 <FaNewspaper />
              </div>
              <div className="Statistics_container_right">
                <p className="Statistics_container_right1">300K</p>
                <p className="Statistics_container_right2">Articles</p>
              </div>
            </div>
            <div className="Statistics_container">
              <div className="Statistics_icon_openbook">
                <FaBookOpen />
              </div>
              
              <div className="Statistics_container_right">
                <p className="Statistics_container_right1">300K</p>
                <p className="Statistics_container_right2">Topics</p>
              </div>
            </div>
            <div className="Statistics_container">
               <div className="Statistics_icon_brief">
                  <FaBriefcase />
               </div>
              
              <div className="Statistics_container_right">
                <p className="Statistics_container_right1">300K</p>
                <p className="Statistics_container_right2">Sectors</p>
              </div>
            </div>
            <div className="Statistics_container">
               <div className="Statistics_icon_book">
                  <FaBook />
               </div>
              
              <div className="Statistics_container_right">
                <p className="Statistics_container_right1">300K</p>
                <p className="Statistics_container_right2">Sources</p>
              </div>
            </div>
            <div className="Statistics_container">
              <div className="Statistics_icon_globe">
                 <FaGlobe />
              </div>
              
              <div className="Statistics_container_right">
                <p className="Statistics_container_right1">300K</p>
                <p className="Statistics_container_right2">Countries</p>
              </div>
            </div>
        </div>
        </div> 
        
    );
}

export default Statistics;