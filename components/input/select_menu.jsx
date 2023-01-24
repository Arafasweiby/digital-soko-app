/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { HiCheck, HiSelector } from "react-icons/hi";
import { useField } from "formik";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function SelectMenu({ label, name, items, placeholder }) {
  const [field, meta] = useField({ name });

  const [selected, setSelected] = useState(
    field.value
      ? items.find((e) => e.value === field.value)
      : {
          name: placeholder ?? "",
          value: "",
        }
  );

  return (
    <div>
      <Listbox
        value={field.value}
        onChange={(item) => {
          setSelected(item);
          field.onChange({ target: { value: item.value, name } });
        }}
      >
        {({ open }) => (
          <>
            <Listbox.Label className="block text-sm font-medium text-gray-700">
              {label}
            </Listbox.Label>
            <div className="mt-1 relative">
              <Listbox.Button
                className={`${
                  meta.touched && meta.error
                    ? "border border-red-400 focus:border-2 focus:border-red-400 focus:outline-none"
                    : ""
                } bg-white relative w-full border h-10 border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-soko-blue focus:border-soko-blue sm:text-sm `}
              >
                <span className="block truncate">{selected.name}</span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <HiSelector
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-10 mt-2 max-h-56 w-full overflow-auto rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {items.map((item, i) => (
                    <Listbox.Option
                      key={i}
                      className={({ active }) =>
                        classNames(
                          active ? "bg-soko-blue text-white" : "text-gray-900",
                          "relative cursor-default select-none py-2 pl-3 pr-9"
                        )
                      }
                      value={item}
                    >
                      {({ selected, active }) => (
                        <>
                          <span className="block truncate">{item.name}</span>
                          {selected ? (
                            <span
                              className={classNames(
                                active ? "text-white" : "text-soko-blue",
                                "absolute inset-y-0 right-0 flex items-center pr-4"
                              )}
                            >
                              <HiCheck className="h-5 w-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
      {meta.touched && meta.error && (
        <p className="mt-1 text-sm text-red-500">{meta.error}</p>
      )}
    </div>
  );
}
