import React from "react";
import "./Filter.css";
import Categories from "./Categories/Categories";
import Values from "./Values/Values";
import { useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import MultiRangeSlider from "../MultiRangeSlider/MultiRangeSlider";
function Filter() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("Impact");
  const [selectedCategory, setSelectedCategory] = useState("Countries");
  const [startYearValues, setStartYearValues] = useState([2016, 2040]);
  const [endYearValues, setEndYearValues] = useState([2016, 2040]);
  return (
    <div className="Filter">
      <div className="Filter_desc" onClick={() => setIsOpen(!isOpen)}>
        <h3>Filters</h3>
        <div className="filter_dropdown">
          <p>Analyze by difference categories and values</p>
          <div className="dropdown">
            <RiArrowDropDownLine
              className={`down-icon ${isOpen ? "active" : ""}`}
            />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="drop_content">
          <div className="Categories_section">
            <Categories
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </div>
          <div className="Values_section">
            <Values
              selectedValue={selectedValue}
              setSelectedValue={setSelectedValue}
            />
          </div>
          <div className="sliders">
            <div className="slider-container">
              <p className="slider-heading">Start Year</p>
              <div className="multirange-slider">
                <MultiRangeSlider
                  minYear={2016}
                  maxYear={2200}
                  values={startYearValues}
                  setValues={setStartYearValues}
                />
              </div>
            </div>
            <div className="slider-container">
              <p className="slider-heading">End Year</p>
              <div className="multirange-slider">
                <MultiRangeSlider
                  minYear={2016}
                  maxYear={2080}
                  values={endYearValues}
                  setValues={setEndYearValues}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Filter;
