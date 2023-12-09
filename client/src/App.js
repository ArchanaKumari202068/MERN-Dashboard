import React from "react";
import Filter from "../src/Components/Filter/Filter";
import Statistics from "./Components/Statistics/Statistics";
import "./App.css";
import LineGraph from "./Components/LineGraph/LineGraph";
import RadarGraph from "./Components/RadarGraph/RadarGraph"
import TableGraph from "./Components/TableGraph/TableGraph";
function App() {
  return (
    <div className="App">
      <p className="heading">Articles Dashboard</p>
      <div className="filter_section">
        <div className="filter_section_part">
          <Filter />
        </div>
      </div>
      <div className="Statistics_section">
        <Statistics />
      </div>
      <LineGraph />
      <div className="Radar-Table">
        <TableGraph/>
        <RadarGraph />
      </div>
    </div>
  );
}

export default App;
