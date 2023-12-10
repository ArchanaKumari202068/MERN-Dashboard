import React from "react";
import "./Filter.css";
import Categories from "./Categories/Categories";
import Values from "./Values/Values";
import { useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import MultiRangeSlider from "../MultiRangeSlider/MultiRangeSlider";
import { useInfoContext } from "../../context/InfoContext";
function Filter() {
  const [isOpen, setIsOpen] = useState(false);
  const {
    category,
    setCategory,
    value,
    setValue,
    startYear,
    setStartYear,
    endyear,
    setEndYear,
  } = useInfoContext();
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
              selectedCategory={category}
              setSelectedCategory={setCategory}
            />
          </div>
          <div className="Values_section">
            <Values selectedValue={value} setSelectedValue={setValue} />
          </div>
          <div className="sliders">
            <div className="slider-container">
              <p className="slider-heading">Start Year</p>
              <div className="multirange-slider">
                <MultiRangeSlider
                  minYear={2016}
                  maxYear={2200}
                  values={startYear}
                  setValues={setStartYear}
                />
              </div>
            </div>
            <div className="slider-container">
              <p className="slider-heading">End Year</p>
              <div className="multirange-slider">
                <MultiRangeSlider
                  minYear={2016}
                  maxYear={2080}
                  values={endyear}
                  setValues={setEndYear}
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
