import React, { useState, useEffect } from "react";
import "./Statistics.css";
import { FaNewspaper } from "react-icons/fa";
import { FaBookOpen } from "react-icons/fa";
import { FaBriefcase } from "react-icons/fa";
import { FaBook } from "react-icons/fa";
import { FaGlobe } from "react-icons/fa";
import api from "../../api/api";
import { useInfoContext } from "../../context/InfoContext";
function Statistics() {
  const [statistics, setStatistics] = useState({
    article: 0,
    country: 0,
    sector: 0,
    source: 0,
    topic: 0,
  });
  const { startYear, endyear } = useInfoContext();

  const getStatistics = async () => {
    try {
      const getStatisticsData = await api.get(
        `/statistics?start_year_range=${startYear[0]}-${startYear[1]}&end_year_range=${endyear[0]}-${endyear[1]}`
      );
      console.log("get statistics graph", getStatisticsData);
      setStatistics(getStatisticsData.data);
    } catch (err) {
      console.log("Error in getting statistics graph", err);
    }
  };
  useEffect(() => {
    getStatistics();
  }, [startYear,endyear]);

  return (
    <div className="Statistics_main">
      <p className="Statistics_heading">Statistics</p>
      <div className="Statistics">
        <div className="Statistics_container">
          <div className="Statistics_icon_news stat_icon_container">
            <FaNewspaper className="stat_icon" />
          </div>
          <div className="Statistics_container_right">
            <p className="Statistics_container_right1">{statistics.article}</p>
            <p className="Statistics_container_right2">Articles</p>
          </div>
        </div>
        <div className="Statistics_container">
          <div className="Statistics_icon_openbook stat_icon_container">
            <FaBookOpen className="stat_icon" />
          </div>

          <div className="Statistics_container_right">
            <p className="Statistics_container_right1">{statistics.topic}</p>
            <p className="Statistics_container_right2">Topics</p>
          </div>
        </div>
        <div className="Statistics_container">
          <div className="Statistics_icon_brief stat_icon_container">
            <FaBriefcase className="stat_icon" />
          </div>

          <div className="Statistics_container_right">
            <p className="Statistics_container_right1">{statistics.sector}</p>
            <p className="Statistics_container_right2">Sectors</p>
          </div>
        </div>
        <div className="Statistics_container">
          <div className="Statistics_icon_book stat_icon_container">
            <FaBook className="stat_icon" />
          </div>

          <div className="Statistics_container_right">
            <p className="Statistics_container_right1">{statistics.source}</p>
            <p className="Statistics_container_right2">Sources</p>
          </div>
        </div>
        <div className="Statistics_container">
          <div className="Statistics_icon_globe stat_icon_container">
            <FaGlobe className="stat_icon" />
          </div>

          <div className="Statistics_container_right">
            <p className="Statistics_container_right1">{statistics.country}</p>
            <p className="Statistics_container_right2">Countries</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Statistics;
