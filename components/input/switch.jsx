import React, { useState } from "react";
import { Switch } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function SwitchComponent(props) {
  return (
    <div className="flex gap-2 items-center">
      <Switch
        checked={props.enabled}
        onChange={props.onChange}
        className={classNames(
          props.enabled ? "bg-indigo-600" : "bg-gray-200",
          "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 "
        )}
      >
        <span
          className={classNames(
            props.enabled ? "translate-x-5" : "translate-x-0",
            "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
          )}
        />
      </Switch>
      <p>Only remote</p>
    </div>
  );
}
