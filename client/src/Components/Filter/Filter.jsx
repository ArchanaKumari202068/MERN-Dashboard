import React from "react";
import "./Filter.css";
import Categories from "./Categories/Categories";
import Values from "./Values/Values";

function Filter() {
    return ( 
        <div className="Filter">
          <div className="Filter_desc">
             <h3>Filters</h3>
             <p>Analyze by difference categories and values</p>
          </div>
          <div className="Categories_section">
            <Categories/>
          </div>
          <div className="Values_section">
              <Values/>
          </div>
             
        </div>
     );
}

export default Filter;