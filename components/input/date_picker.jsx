import { useField } from "formik";
import React from "react";

function DatePicker({ label, ...props }) {
  const [field, meta] = useField(props);

  return (
    <div className="space-y-1">
      <label
        htmlFor={label}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <input
        {...field}
        {...props}
        type="datetime-local"
        className={`${
          meta.touched && meta.error
            ? `border-red-300 focus:border-red-500 focus:ring-red-500`
            : `border-gray-300  focus:border-lipad-blue focus:ring-lipad-blue`
        } mt-1 w-full appearance-none rounded-md border border-gray-300 sm:text-sm ring-0 focus:border-lipad-green focus:ring-0 h-10`}
      />
      {meta.touched && meta.error && (
        <p className="mt-1 text-sm text-red-500">{meta.error}</p>
      )}
    </div>
  );
}

export default DatePicker;
