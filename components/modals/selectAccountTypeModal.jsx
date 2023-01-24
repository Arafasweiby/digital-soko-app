import { Modal, ModalBody, ModalContent, ModalOverlay } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { CgClose } from "react-icons/cg";
import { FaLaptop } from "react-icons/fa";
import { IoMdPerson } from "react-icons/io";
import SolidButton from "../buttons/solidButton";

function SelectAccountTypeModal({ isOpen, onClose }) {
  const router = useRouter();

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered={true} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalBody className="m-4">
          <div className="relative flex items-center justify-between">
            <h3 className="text-2xl font-semibold text-lipad-black">
              Select Account Type
            </h3>
            <CgClose className="h-6 w-6 cursor-pointer" onClick={onClose} />
          </div>
          <div className="flex flex-col items-center gap-6 p-4 sm:flex-row sm:items-start sm:justify-center sm:gap-12">
            <div className="flex flex-col items-center gap-3">
              <FaLaptop className="h-16 w-16 text-lipad-green" />
              <h2 className="text-xl font-semibold text-lipad-black">
                Freelancer
              </h2>
              {/* <p className="text-center">Lorem ipsum.</p> */}
              <div className="w-48">
                <SolidButton
                  label="Create Profile"
                  onClick={() => {
                    router.push("/freelancer-create-profile");
                    onClose();
                  }}
                />
              </div>
            </div>
            <div className="flex flex-col items-center gap-3">
              <IoMdPerson className="h-16 w-16 text-lipad-green" />
              <h2 className="text-xl font-semibold text-lipad-black">Client</h2>
              {/* <p className="text-center">Lorem ipsum.</p> */}
              <div className="w-48">
                <SolidButton
                  label="Create Profile"
                  onClick={() => {
                    router.push("/client-create-profile");
                    onClose();
                  }}
                />
              </div>
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default SelectAccountTypeModal;
