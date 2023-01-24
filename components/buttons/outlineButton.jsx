import { Spinner } from "@chakra-ui/react";
import React from "react";

function OutlineButton({ label, isSubmitting, ...props }) {
  return (
    <button
      {...props}
      className="group relative w-full flex justify-center py-2 px-4 border-2 border-soko-blue text-sm font-medium rounded-md text-soko-blue hover:border-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      {isSubmitting == true ? <Spinner /> : <span>{label}</span>}
    </button>
  );
}

export default OutlineButton;
