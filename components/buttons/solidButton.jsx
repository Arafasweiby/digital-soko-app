import { Spinner } from "@chakra-ui/react";
import React from "react";

function SolidButton({ label, isSubmitting, ...props }) {
  return (
    <button
      {...props}
      className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-soko-blue hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      {isSubmitting == true ? <Spinner /> : <span>{label}</span>}
    </button>
  );
}

export default SolidButton;
