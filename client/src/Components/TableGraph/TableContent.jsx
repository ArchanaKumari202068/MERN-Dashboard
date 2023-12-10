import React from "react";
import "./TableContent.css";
import TableGraph from "./TableGraph";
import { IoIosArrowUp,IoIosArrowDown  } from "react-icons/io";

const TableContent = (props) => {
  return (
    <>
      <div className="reuseTableBox">
        <p>{props.category}</p>
        <p>{props.value}</p>
        <div className="tableBox">
          {props.increment > 0 ? (<span className="incArrowUp"><IoIosArrowUp /></span> ): (<span className="decArrowdDown"><IoIosArrowDown /></span>)}
          <span className={`increamentValue ${props.increment >0? "incArrowUp":"decArrowdDown"}`}>{Math.abs(props.increment)}%</span>
        </div>
      </div>
    </>
  );
};

export default TableContent;
