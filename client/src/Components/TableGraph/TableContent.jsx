import React from "react";
import "./TableContent.css";
import TableGraph from "./TableGraph";
const TableContent = (props) => {
  return (
    <>
      <div className="reuseTableBox">
        <p>{props.category}</p>
        <p>{props.value}</p>
        <div className="tableBox">
          {props.increment > 0 ? (<span>⬆️</span> ): (<span>⬇️</span>)}
          <span>{props.increment}</span>
        </div>
      </div>
    </>
  );
};

export default TableContent;
