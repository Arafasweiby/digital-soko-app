import { Spinner } from "@chakra-ui/react";
import { Combobox, Transition } from "@headlessui/react";
import { useField } from "formik";
import { Fragment, useState } from "react";
import { HiCheck } from "react-icons/hi";
import { MdArrowDropDown } from "react-icons/md";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function AutoCompleteDropdown({
  name,
  items,
  loading,
  placeholder,
  label,
}) {
  const [field, meta] = useField({ name });

  const [selected, setSelected] = useState(
    meta.initialValue
      ? items.find((item) => item.name === meta.initialValue)
      : undefined
  );
  const [query, setQuery] = useState("");

  const filteredItems =
    query === ""
      ? items
      : items.filter((item) => {
          return item.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <div>
      <Combobox
        value={field.value}
        onChange={(item) => {
          setSelected(item);
          field.onChange({ target: { value: item.value, name } });
        }}
      >
        {(props) => (
          <>
            <div className="relative">
              <label
                htmlFor={label}
                className="block text-sm font-medium text-gray-700"
              >
                {label}
              </label>
              <Combobox.Input
                placeholder={placeholder}
                className={`${
                  meta.touched && meta.error
                    ? "border border-red-400 focus:border-2 focus:border-red-400"
                    : ""
                } mt-1 relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-soko-blue sm:text-sm h-10`}
                displayValue={(item) => selected?.name ?? ""}
                onChange={(event) => setQuery(event.target.value)}
              />
              {loading ? (
                <div className="absolute bottom-3 right-0 pr-2">
                  <Spinner />
                </div>
              ) : (
                <Combobox.Button className="absolute bottom-3 right-0 pr-2">
                  <MdArrowDropDown className="h-5 w-5 text-soko-blue" />
                </Combobox.Button>
              )}
              <Transition
                show={props.open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Combobox.Options className="absolute z-10 mt-2 max-h-56 w-full overflow-auto rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {filteredItems &&
                    filteredItems.map((item, i) => (
                      <Combobox.Option
                        key={i}
                        className={({ active }) =>
                          classNames(
                            active
                              ? "bg-soko-blue text-white"
                              : "text-gray-900",
                            "relative cursor-default select-none py-2 pl-3 pr-9"
                          )
                        }
                        value={item}
                      >
                        {({ selected, active }) => (
                          <>
                            <div className="flex items-center">
                              <span className="block truncate">
                                {item.name}
                              </span>
                            </div>

                            {selected ? (
                              <span
                                className={classNames(
                                  active ? "text-white" : "text-soko-blue",
                                  "absolute inset-y-0 right-0 flex items-center pr-4"
                                )}
                              >
                                <HiCheck
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Combobox.Option>
                    ))}
                </Combobox.Options>
              </Transition>
            </div>
          </>
        )}
      </Combobox>
      {meta.touched && meta.error && (
        <p className="mt-1 text-sm text-red-500">{meta.error}</p>
      )}
    </div>
  );
}
