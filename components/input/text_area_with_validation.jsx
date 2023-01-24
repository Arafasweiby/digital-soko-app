import { useField } from "formik";
import { HiExclamationCircle } from "react-icons/hi";

export default function TextAreaWithValidationError({ label, ...props }) {
  const [field, meta] = useField(props);

  return (
    <div>
      <label
        htmlFor={label}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <div className="mt-1 relative rounded-md shadow-sm">
        <textarea
          {...field}
          {...props}
          className={`${
            meta.touched && meta.error
              ? `border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500`
              : ``
          }block w-full pr-10  focus:outline-none  sm:text-sm rounded-md p-2 border-gray-300`}
        />
        {meta.touched && meta.error && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <HiExclamationCircle className="h-5 w-5 text-red-500" />
          </div>
        )}
      </div>
      {meta.touched && meta.error && (
        <p className="mt-1 text-sm text-red-500">{meta.error}</p>
      )}
    </div>
  );
}
