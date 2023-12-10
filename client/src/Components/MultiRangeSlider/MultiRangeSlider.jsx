import React from "react";
import ReactSlider from "react-slider";
import "./multi-range-slider.css";

const range = (start, end, step = 1) => {
  let output = [];
  if (typeof end === "undefined") {
    end = start;
    start = 0;
  }
  for (let i = start; i < end; i += step) {
    output.push(i);
  }
  return output;
};

const MultiRangeSlider = ({ minYear, maxYear, values, setValues }) => {
  return (
    <>
      <div className="min-max-years">
        <p>{minYear}</p>
        <p>{maxYear}</p>
      </div>
      <ReactSlider
        min={minYear}
        max={maxYear}
        value={values}
        onChange={(value, index) => setValues(value)}
        marks={range(minYear, maxYear + 1)}
        className="horizontal-slider"
        markClassName="example-mark"
        thumbClassName="example-thumb"
        trackClassName="example-track"
        renderThumb={(props, state) => (
          <div {...props}>
            {" "}
            <span>{state.valueNow}</span>
          </div>
        )}
        // pearling
        minDistance={1}
      />
    </>
  );
};

export default MultiRangeSlider;
