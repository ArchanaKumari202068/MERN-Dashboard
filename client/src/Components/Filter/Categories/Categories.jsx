import React from "react";
import "./Categories.css";
import { FaBookOpen } from "react-icons/fa";
import { FaGlobe } from "react-icons/fa";
import { FaBriefcase } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaFortAwesome } from "react-icons/fa";

import { FaBook } from "react-icons/fa";

let categories = [
  {
    name: "Countries",
    icon: <FaGlobe />,
    value: "country",
  },
  {
    name: "Topics",
    icon: <FaBookOpen />,
    value: "topic",
  },
  {
    name: "Sectors",
    icon: <FaBriefcase />,
    value: "sector",
  },
  {
    name: "Regions",
    icon: <FaMapMarkerAlt />,
    value: "region",
  },
  {
    name: "Pestle",
    icon: <FaFortAwesome />,
    value: "pestle",
  },
  {
    name: "Sources",
    icon: <FaBook />,
    value: "source",
  },
];

function Categories({ selectedCategory, setSelectedCategory }) {
  return (
    <>
      <div className="Categories_main">
        <div className=" Categories">
          <p>Categories</p>
        </div>
        <div className="Categories_container">
          {categories.map((el) => {
            return (
              <div
                className={`Categories_part ${
                  selectedCategory === el.value ? "active" : ""
                }`}
                onClick={() => {
                  setSelectedCategory(el.value);
                }}
              >
                <div className="Categories_content">
                  <p className="Categories_icon">{el.icon}</p>
                  <p className="Categories_name">{el.name}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Categories;
