import React from "react";
import "./Filter.css";
import Categories from "./Categories/Categories";
import Values from "./Values/Values";
import { useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";

function Filter() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue,setSelectedValue] = useState('Impact')
  const [selectedCategory,setSelectedCategory] = useState('Countries')

  return (
    <div  className="Filter">
      <div className="Filter_desc" onClick={() => setIsOpen(!isOpen)}>
        <h3>Filters</h3>
        <div className="filter_dropdown">
           <p>Analyze by difference categories and values</p>
           <div className="dropdown">
             <RiArrowDropDownLine />
           </div>
        </div>
      </div>
      {isOpen && (
        <div className="drop_content">
          <div className="Categories_section">
            <Categories selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
          </div>
          <div className="Values_section">
            <Values selectedValue={selectedValue} setSelectedValue={setSelectedValue} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Filter;
