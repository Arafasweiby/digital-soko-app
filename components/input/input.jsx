import React from "react";

function Input(props) {
  return (
    <div onChange={props.onChange}>
      <label htmlFor={props.id} className="font-bold">
        {props.label}
      </label>
      <div>
        <input
          id={props.id}
          name={props.name}
          type="text"
          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
          placeholder="Location"
        />
      </div>
    </div>
  );
}

export default Input;
