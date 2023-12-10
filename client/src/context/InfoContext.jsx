import React, { createContext, useState, useContext } from "react";

const InfoContext = createContext();

export const InfoProvider = ({ children }) => {
  const [category, setCategory] = useState("country");
  const [value, setValue] = useState("impact");
  const [startYear, setStartYear] = useState([2016, 2040]);
  const [endyear, setEndYear] = useState([2016, 2040]);
  return (
    <InfoContext.Provider
      value={{
        category,
        setCategory,
        value,
        setValue,
        startYear,
        setStartYear,
        endyear,
        setEndYear,
      }}
    >
      {children}
    </InfoContext.Provider>
  );
};

export const useInfoContext = () => {
  const context = useContext(InfoContext);
  return context;
};
