import { useToast } from "@chakra-ui/react";
import { Formik } from "formik";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilValue } from "recoil";
import { v4 } from "uuid";
import * as Yup from "yup";
import "yup-phone";
import OutlineButton from "../components/buttons/outlineButton";
import SolidButton from "../components/buttons/solidButton";
import InputWithValidationError from "../components/input/input_with_validation_error";
import SelectMenu from "../components/input/select_menu";
import TextAreaWithValidationError from "../components/input/text_area_with_validation";
import UploadFilesField from "../components/input/upload_files";
import NavBar from "../components/layout/navBar";
import { industries, workHours } from "../lib/data";
import { auth } from "../lib/firebase";
import { uploadFile, validatePhoneNumber } from "../lib/helpers";
import { accountState } from "../recoil/account";
import { updateAccount } from "../services/user";
import { showToast } from "../utils/ui";

export default function Page() {
  const toast = useToast();
  const [user] = useAuthState(auth);
  const account = useRecoilValue(accountState);
  const router = useRouter();
  const initialValues = {
    firstName: account.firstName,
    lastName: account.lastName,
    email: account.email,
    phoneNumber: account.phoneNumber,
    cvDocUrl: [account.cvDocUrl],
    biography: account.biography,
    industry: account.industry,
    workHours: account.workHours,
  };
  const validationSchema = Yup.object({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    phoneNumber: Yup.string("Invalid phone number")
      .required("Required")
      .test(
        "phoneNumberValidation",
        "Invalid phone number",
        validatePhoneNumber
      ),
    cvDocUrl: Yup.array().min(1, "Upload a document"),
    biography: Yup.string().required("Required"),
    industry: Yup.string().required("Required"),
    workHours: Yup.string().required("Required"),
  });
  const onSubmit = async (values, { setSubmitting }) => {
    const cvDocUrl = await uploadFile({
      file: values.cvDocUrl[0],
      fileName: v4(),
      path: "/cv",
    });

    try {
      await updateAccount({ uid: user.uid, data: { ...values, cvDocUrl } });
      showToast({
        toast,
        description: "Successfuly updated account details",
        status: "success",
      });
      router.back();
    } catch (error) {
      showToast({
        toast,
        description: "Failed to update account details",
        status: "error",
      });
    }
    setSubmitting(false);
  };
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="p-16 ">
        <div className="max-w-7xl w-full mx-auto">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {(props) => (
              <>
                <div>
                  <div className="md:grid md:grid-cols-3 md:gap-6">
                    <div className="md:col-span-1">
                      <div className="px-4 sm:px-0">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">
                          Update your Profile
                        </h3>
                      </div>
                    </div>
                    <div className="mt-5 md:mt-0 md:col-span-2">
                      <form onSubmit={props.handleSubmit}>
                        <div className="shadow sm:rounded-md sm:overflow-hidden">
                          <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                            <div className="grid grid-cols-6 gap-6">
                              <div className="col-span-6 sm:col-span-3">
                                <InputWithValidationError
                                  name="firstName"
                                  type="text"
                                  label="First Name"
                                />
                              </div>
                              <div className="col-span-6 sm:col-span-3">
                                <InputWithValidationError
                                  name="lastName"
                                  type="text"
                                  label="Last Name"
                                />
                              </div>
                            </div>
                            <div className="grid grid-cols-6 gap-6">
                              <div className="col-span-6 sm:col-span-3">
                                <InputWithValidationError
                                  name="phoneNumber"
                                  type="tel"
                                  label="Phone Number"
                                  placeholder="254XX XXX XXX"
                                />
                              </div>
                              <div className="col-span-6 sm:col-span-3">
                                <InputWithValidationError
                                  name="email"
                                  type="email"
                                  label="Email"
                                />
                              </div>
                            </div>
                            <UploadFilesField
                              id="upload-files"
                              label="Upload your CV"
                              name="cvDocUrl"
                            />
                            <div>
                              <TextAreaWithValidationError
                                name="biography"
                                label="Biography"
                                type="text"
                                rows={10}
                              />
                            </div>
                            <div className="grid grid-cols-6 gap-6">
                              <div className="col-span-6 sm:col-span-3">
                                <SelectMenu
                                  name="industry"
                                  label="Industry"
                                  items={industries}
                                  placeholder="Select industry"
                                />
                              </div>
                              <div className="col-span-6 sm:col-span-3">
                                <SelectMenu
                                  name="workHours"
                                  label="Work Hours"
                                  items={workHours}
                                  placeholder="Select work hours"
                                />
                              </div>
                            </div>
                            <div className="w-fit flex justify-items-end gap-2 ml-auto">
                              <OutlineButton
                                label="Cancel"
                                type="button"
                                onClick={() => router.push("/")}
                              />
                              <SolidButton
                                isSubmitting={props.isSubmitting}
                                label="Save"
                                type="submit"
                              />
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

Page.auth = true;
Page.layout = NavBar;
