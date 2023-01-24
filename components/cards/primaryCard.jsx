import React from "react";

export default function PrimaryCard({ description, value }) {
  return (
    <div className="grid overflow-hidden rounded-lg border-[0.5px] bg-white p-4 shadow sm:p-6  w-full">
      <dl className="space-y-3">
        <dt className="flex gap-3">
          <div
            className={`bg-[#5957eb] h-3 w-3 rounded-full`}
          ></div>
          <span className="text-xs font-medium uppercase text-lipad-grey">
            {description}
          </span>
        </dt>
        <dd>
          <div className="font-bold tracking-wide text-lipad-dark-gray sm:text-2xl">
          {value}
          </div>
        </dd>
      </dl>   
    </div>
  );
}
