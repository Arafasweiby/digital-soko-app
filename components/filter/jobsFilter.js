import { Dialog, Transition } from "@headlessui/react";
import { Formik } from "formik";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import { BsSliders } from "react-icons/bs";
import { HiX } from "react-icons/hi";
import * as Yup from "yup";
import { counties, jobTypes } from "../../utils/constants";
import OutlineButton from "../buttons/outlineButton";
import SolidButton from "../buttons/solidButton";
import AutoCompleteDropdown from "../input/autocomplete_dropdown";
import SelectMenu from "../input/select_menu";

const experience = [
  {
    name: "Junior",
    value: "Junior",
  },
  {
    name: "Intermediate",
    value: "Intermediate",
  },
  {
    name: "Senior",
    value: "Senior",
  },
];

export default function JobsFilter({ filterPaymentsHandler }) {
  const router = useRouter();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const initialValues = {
    experience: "",
    location: "",
    type: "",
  };
  const validationSchema = Yup.object({});
  const onSubmit = (values, { setSubmitting }) => {
    filterPaymentsHandler(values);
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize={true}
    >
      {(props) => (
        <form onSubmit={props.handleSubmit}>
          <div className="flex w-full justify-end xl:hidden">
            <button
              type="button"
              className="flex w-auto items-center gap-2 rounded-md border border-gray-300 bg-white py-2 px-4 font-semibold text-lipad-blue shadow"
              onClick={() => setMobileFiltersOpen(true)}
            >
              <BsSliders />
              <span className="truncate text-sm sm:text-base">Filters</span>
            </button>
          </div>
          <Transition.Root show={mobileFiltersOpen} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-40 xl:hidden"
              onClose={setMobileFiltersOpen}
            >
              <Transition.Child
                as={Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
              </Transition.Child>

              <div className="fixed inset-0 z-40 flex">
                <Transition.Child
                  as={Fragment}
                  enter="transition ease-in-out duration-300 transform"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transition ease-in-out duration-300 transform"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                    <div className="flex items-center justify-between px-4">
                      <h2 className="text-xl font-medium text-gray-900">
                        Filters
                      </h2>
                      <button
                        type="button"
                        className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                        onClick={() => setMobileFiltersOpen(false)}
                      >
                        <span className="sr-only">Close menu</span>
                        <HiX className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>

                    {/* Filters */}
                    <div className="mt-4 border-t border-gray-200 ">
                      <div className="space-y-4 px-4 py-3">
                        <div className="w-full">
                          <SelectMenu
                            name="experience"
                            items={experience}
                            placeholder="Select experience"
                            label="Experience"
                          />
                        </div>
                        <AutoCompleteDropdown
                          placeholder="Select location"
                          name="location"
                          label="Location"
                          items={counties.map((e) => ({
                            id: e,
                            name: e,
                            value: e,
                          }))}
                        />
                        <div className="w-full">
                          <SelectMenu
                            placeholder="Select job type"
                            name="type"
                            label="Job Type"
                            items={jobTypes.map((e) => ({
                              id: e,
                              name: e,
                              value: e,
                            }))}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex gap-2 px-3">
                      <OutlineButton
                        type="submit"
                        label="Clear Filters"
                        onClick={() => {
                          router.reload();
                        }}
                      />
                      <SolidButton
                        type="submit"
                        label="Apply Filter"
                        onClick={() => setMobileFiltersOpen(false)}
                      />
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition.Root>
          <div className="hidden rounded-xl border p-4 xl:block bg-white">
            <div className="flex justify-between gap-4">
              <div className="flex gap-4">
                <div className="w-48">
                  <SelectMenu
                    name="experience"
                    items={experience}
                    placeholder="Select experience"
                    label="Experience"
                  />
                </div>
                <AutoCompleteDropdown
                  placeholder="Select location"
                  name="location"
                  label="Location"
                  items={counties.map((e) => ({
                    id: e,
                    name: e,
                    value: e,
                  }))}
                />
                <div className="w-48">
                  <SelectMenu
                    placeholder="Select job type"
                    name="type"
                    label="Job Type"
                    items={jobTypes.map((e) => ({
                      id: e,
                      name: e,
                      value: e,
                    }))}
                  />
                </div>
              </div>
              <div className="flex items-end gap-4">
                <div className="w-fit">
                  <OutlineButton
                    type="button"
                    label="Clear Filters"
                    onClick={() => {
                      router.reload();
                    }}
                  />
                </div>
                <div className="w-fit">
                  <SolidButton type="submit" label="Apply Filter" />
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
}
