import React, { useEffect, useState } from "react";
import TableContent from "./TableContent";
import "./TableGraph.css";
import data from "./data.json";
import { useInfoContext } from "../../context/InfoContext";
import api from "../../api/api";
const TableGraph = () => {
  const { category } = useInfoContext();
  const [tableData, setTableData] = useState([]);
  const getTableData = async () => {
    const response = await api.get(`/articles-increased?category=${category}`);
    console.log(response);
    setTableData(response.data);
  };
  useEffect(() => {
    getTableData();
  }, [category]);
  return (
    <>
      <div className="Table">
        <p className="table_heading">Impact - Countries</p>
        <p>Analyze by how many articles increased this year</p>

        <div className="table_content_container">
          {tableData.map((ele) => (
            <TableContent
              category={ele.category}
              value={ele.countCurrent}
              increment={Math.round(ele.percentageIncrease)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default TableGraph;
