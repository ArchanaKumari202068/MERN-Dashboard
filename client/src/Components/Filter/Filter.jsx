import React, { useState, useEffect } from "react";
import "./Filter.css";
import Categories from "./Categories/Categories";
import Values from "./Values/Values";
import { RiArrowDropDownLine } from "react-icons/ri";
import MultiRangeSlider from "../MultiRangeSlider/MultiRangeSlider";
import { useInfoContext } from "../../context/InfoContext";

import api from "../../api/api";
import { capitalizeFirstLetter } from "../utils";
function Filter() {
  const [yearRange, setYearRange] = useState({
    start_year:{
      minyear: 0,
      maxYear: 0
    },
    end_year:{
      minyear: 0,
      maxYear: 0
    }
  });
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

  const getFilterYear = async () => {
    try {
      const getYearRange = await api.get("/year-ranges");
      console.log(getYearRange);
      setYearRange(getYearRange.data);
      setStartYear([getYearRange.data.start_year.minyear,getYearRange.data.start_year.maxYear])
      setEndYear([getYearRange.data.end_year.minyear,getYearRange.data.end_year.maxYear])
      console.log("YearRange", yearRange);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getFilterYear();
  }, []);
  return (
    <div className="Filter">
      <div className="Filter_desc" onClick={() => setIsOpen(!isOpen)}>
        <h3>Filters</h3>
        <div className="filter_dropdown">
          <p>Analyze by difference categories and values</p>
          <p>category: {capitalizeFirstLetter(category)} value: {capitalizeFirstLetter(value)}</p>
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
                  minYear={yearRange.start_year.minyear}
                  maxYear={yearRange.start_year.maxYear}
                  values={startYear}
                  setValues={setStartYear}
                />
              </div>
            </div>
            <div className="slider-container">
              <p className="slider-heading">End Year</p>
              <div className="multirange-slider">
                <MultiRangeSlider
                  minYear={yearRange.end_year.minyear}
                  maxYear={yearRange.end_year.maxYear}
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
