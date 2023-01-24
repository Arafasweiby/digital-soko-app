import React from "react";

function RadioFilters(props) {
  return (
    <div onChange={props.onChange} className="flex flex-col">
      {props.options.map((option, i) => (
        <label key={i}>
          <input type="radio" value={option} name={props.label} /> {option}
        </label>
      ))}
    </div>
  );
}

export default RadioFilters;
