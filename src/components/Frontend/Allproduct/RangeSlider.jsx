/* eslint-disable react/prop-types */

import { useState, useEffect } from "react";
import Slider from "react-slider";

const RangeSlider = ({ minPrice, maxPrice, values, onChange }) => {
  const [localValues, setLocalValues] = useState([minPrice, maxPrice]);

  useEffect(() => {
    setLocalValues(values);
  }, [values]);

  const handleInputChange = (index, value) => {
    const newValue = Math.max(minPrice, Math.min(maxPrice, Number(value)));
    const newValues = [...localValues];
    newValues[index] = newValue;
    setLocalValues(newValues);
    onChange(newValues);
  };

  return (
    <div className="box w-full px-4 py-2 border rounded shadow">
      <h5 className="whitespace-nowrap py-2 font-medium text-base md:text-lg">
        Price
      </h5>
      <hr />
      <Slider
        className="slider my-5 w-full h-1"
        onChange={onChange}
        value={localValues}
        min={minPrice}
        max={maxPrice}
        thumbClassName="size-5 -top-2 bg-white rounded-full border-2 border-blue-900 shadow-lg cursor-pointer transition-transform transform hover:scale-125"
        trackClassName="bg-gradient-to-r from-blue-500 to-blue-900 h-full rounded-lg"
      />
      <div className="flex justify-between my-2">
        <input
          type="number"
          value={localValues[0]}
          onChange={(e) => handleInputChange(0, e.target.value)}
          className="text-center border p-1 rounded w-1/3"
          min={minPrice}
          max={localValues[1]}
        />
        <span className="value mt-1 mx-2">to</span>
        <input
          type="number"
          value={localValues[1]}
          onChange={(e) => handleInputChange(1, e.target.value)}
          className="text-center border p-1 rounded w-1/3"
          min={localValues[0]}
          max={maxPrice}
        />
      </div>
      <div className="text-center mt-5 mb-2">
        <button className="rounded px-8 hover:text-white hover:bg-gradient-to-b from-teal-500 to-teal-700 hover:border-teal-500 py-1 border">
          Apply
        </button>
      </div>
    </div>
  );
};

export default RangeSlider;
