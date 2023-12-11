import React from "react";
import TableContent from "./TableContent";
import "./TableGraph.css";
import data from "./data.json";
const TableGraph = () => {
  return (
    <>
      <div className="Table">
        <p className="table_heading">Impact - Countries</p>
        <p>Analyze by how much impact increased this year</p>

        <div className="table_content_container">
          {data.map((ele) => (
            <TableContent
            category={ele.category}
            value ={ele.value}
            increment ={ele.increment}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default TableGraph;
