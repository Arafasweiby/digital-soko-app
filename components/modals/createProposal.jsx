import {
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";
import { FieldValue, Timestamp } from "firebase/firestore";

import { Formik } from "formik";
import Router, { useRouter } from "next/router";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { CgClose } from "react-icons/cg";
import { useRecoilValue } from "recoil";
import * as Yup from "yup";
import { auth } from "../../lib/firebase";
import { accountState } from "../../recoil/account";
import { createProposal } from "../../services/jobs";
import { showToast } from "../../utils/ui";
import OutlineButton from "../buttons/outlineButton";
import SolidButton from "../buttons/solidButton";
import TextAreaWithValidationError from "../input/text_area_with_validation";

export default function CreateProposalModal({ isOpen, onClose, job }) {
  const router = useRouter();
  const toast = useToast();
  const [user] = useAuthState(auth);
  const account = useRecoilValue(accountState);

  const formInitialValues = {
    proposal: "",
  };
  const formValidationSchema = Yup.object({
    proposal: Yup.string().required("Required"),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      await createProposal({
        jobId: job.id,
        data: {
          ...values,
          freelancerName: `${account.firstName} ${account.lastName}`,
          freelancerUid: user.uid,
          freelancerEmail: user.email,
          freelancerPhotoUrl: user.photoURL,
          jobId: job.id,
          companyId: job.companyId,
          applicationDate: Date.now(),
          status: "pending",
        },
      });
      showToast({
        toast,
        title: "Success",
        description: "Job proposal created successfuly",
        status: "success",
      });
      onClose();
      router.reload();
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
              Create Job Proposal
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
                <TextAreaWithValidationError
                  name="proposal"
                  label="Job Proposal"
                  rows={5}
                />
                <div className="ml-auto flex w-full gap-2 pt-2 sm:w-80">
                  <OutlineButton
                    label="Cancel"
                    type="button"
                    onClick={onClose}
                  />
                  <SolidButton
                    label="Create Proposal"
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
