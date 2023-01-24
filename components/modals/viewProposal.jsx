import {
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";

import React, { useState } from "react";
import { CgClose } from "react-icons/cg";
import { updateProposal } from "../../services/jobs";
import { showToast } from "../../utils/ui";
import OutlineButton from "../buttons/outlineButton";
import SolidButton from "../buttons/solidButton";

export default function ViewProposalModal({
  isOpen,
  onClose,
  proposal,
  reloadDataHandler,
}) {
  const toast = useToast();
  const [loading, setloading] = useState("");

  async function updateProposalFunc(status) {
    setloading(`${status}Loading`);
    try {
      await updateProposal({ id: proposal.id, data: { status } });
      showToast({
        toast,
        title: "Success",
        description: "Proposal updated successfuly",
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
    }
    setloading("");
  }

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
              View Job Proposal
            </h3>
            <CgClose className="h-6 w-6 cursor-pointer" onClick={onClose} />
          </div>
          <p className="py-4">{proposal?.proposal ?? ""}</p>
          <div className="ml-auto flex w-full gap-2 pt-2 sm:w-80">
            <OutlineButton
              label="Reject"
              isSubmitting={loading == "rejectedLoading"}
              onClick={() => updateProposalFunc("rejected")}
            />
            <SolidButton
              label="Accept"
              isSubmitting={loading == "acceptedLoading"}
              onClick={() => updateProposalFunc("accepted")}
            />
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
