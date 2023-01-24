import React from "react";

function SimpleSelectMenu(props) {
  return (
    <div onChange={props.onChange}>
      <label htmlFor={props.id} className="font-bold">
        {props.label}
      </label>
      <select
        id={props.id}
        name={props.name}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        defaultValue={props.options[0]}
      >
        {props.options.map((option, i) => (
          <option key={i}>{option}</option>
        ))}
      </select>
    </div>
  );
}

export default SimpleSelectMenu;
