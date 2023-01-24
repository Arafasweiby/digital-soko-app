import { HiUsers } from "react-icons/hi";
import { useField } from "formik";

export default function InputWithLeadingIcon({ icon, label, ...props }) {
  const [field, meta] = useField(props);

  return (
    <div>
      <label
        htmlFor={label}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <div className="mt-1 relative rounded-md">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {icon}
        </div>
        <input
          {...field}
          {...props}
          className="focus:ring-soko-blue focus:border-soko-blue block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
        />
      </div>
      {meta.touched && meta.error ? (
        <p className="text-red-400">{meta.error}</p>
      ) : null}
    </div>
  );
}
