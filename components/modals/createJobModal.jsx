import {
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";
import { Timestamp } from "firebase/firestore";

import { Formik } from "formik";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { CgClose } from "react-icons/cg";
import { useRecoilValue } from "recoil";
import * as Yup from "yup";
import { auth } from "../../lib/firebase";
import { accountState } from "../../recoil/account";
import { createJob } from "../../services/jobs";
import { counties, experience, jobTypes } from "../../utils/constants";
import { showToast } from "../../utils/ui";
import OutlineButton from "../buttons/outlineButton";
import SolidButton from "../buttons/solidButton";
import AutoCompleteDropdown from "../input/autocomplete_dropdown";
import DatePickerField from "../input/date_picker";
import InputWithValidationError from "../input/input_with_validation_error";
import SelectMenu from "../input/select_menu";
import TextAreaWithValidationError from "../input/text_area_with_validation";

export default function CreateJobModal({ isOpen, onClose, reloadDataHandler }) {
  const toast = useToast();
  const [user] = useAuthState(auth);
  const account = useRecoilValue(accountState);
  const clientJob = JSON.parse(localStorage.getItem("clientJob"));

  const formInitialValues = {
    title: clientJob?.title ?? "",
    brief: clientJob?.brief ?? "",
    location: clientJob?.location ?? "",
    timeNeeded: clientJob?.timeNeeded ?? "",
    experience: clientJob?.experience ?? "",
    type: clientJob?.type ?? "",
    compensation: clientJob?.compensation ?? "",
    deadline: clientJob?.deadline ?? "",
    proposalCount: 0,
  };
  const formValidationSchema = Yup.object({
    title: Yup.string().required("Required"),
    brief: Yup.string().required("Required"),
    location: Yup.string().required("Required"),
    timeNeeded: Yup.number().required("Required"),
    experience: Yup.string().required("Required"),
    type: Yup.string().required("Required"),
    compensation: Yup.number().required("Required"),
    deadline: Yup.string().required("Required"),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      await createJob({
        data: {
          ...values,
          deadline: Date.parse(values.deadline),
          companyId: user.uid,
          companyName: account.companyName,
        },
      });
      showToast({
        toast,
        title: "Success",
        description: "Job posting created successfuly",
        status: "success",
      });
      reloadDataHandler();
      onClose();
    } catch (error) {
      showToast({
        toast,
        title: "Error",
        description: error,
        status: "error",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered={true}
      size="2xl"
      blockScrollOnMount={false}
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalBody className="m-4">
          <div className="relative flex items-center justify-between">
            <h3 className="text-2xl font-semibold text-lipad-black">
              Create Job Posting
            </h3>
            <CgClose className="h-6 w-6 cursor-pointer" onClick={onClose} />
          </div>
          <Formik
            initialValues={formInitialValues}
            validationSchema={formValidationSchema}
            onSubmit={onSubmit}
          >
            {(props) => (
              <form className="space-y-4 py-4" onSubmit={props.handleSubmit}>
                <InputWithValidationError
                  name="title"
                  label="Job Title"
                  type="text"
                />
                <TextAreaWithValidationError
                  name="brief"
                  label="Job Brief"
                  rows={5}
                />
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-8 ">
                  <AutoCompleteDropdown
                    name="location"
                    label="Location"
                    items={counties.map((e) => ({
                      id: e,
                      name: e,
                      value: e,
                    }))}
                  />
                  <SelectMenu
                    name="type"
                    label="Job Type"
                    items={jobTypes.map((e) => ({
                      id: e,
                      name: e,
                      value: e,
                    }))}
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-8">
                  <InputWithValidationError
                    name="timeNeeded"
                    label="Time (Hrs)"
                    type="number"
                  />
                  <InputWithValidationError
                    name="compensation"
                    label="Compensation (KES)"
                    type="number"
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-8">
                  <SelectMenu
                    name="experience"
                    label="Experience"
                    items={experience.map((e) => ({
                      id: e,
                      name: e,
                      value: e,
                    }))}
                  />
                  <DatePickerField
                    name="deadline"
                    label="Application Deadline"
                  />
                </div>
                <div className="ml-auto flex w-full gap-2 pt-2 sm:w-80">
                  <OutlineButton
                    label="Cancel"
                    type="button"
                    onClick={onClose}
                  />
                  <SolidButton
                    label="Create Job"
                    type="submit"
                    isSubmitting={props.isSubmitting}
                  />
                </div>
              </form>
            )}
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
