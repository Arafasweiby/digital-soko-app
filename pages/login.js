import { useDisclosure, useToast } from "@chakra-ui/react";
import { Formik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";
import { HiLockClosed, HiMail } from "react-icons/hi";
import { useSetRecoilState } from "recoil";
import * as Yup from "yup";
import SolidButton from "../components/buttons/solidButton";
import InputWithLeadingIcon from "../components/input/input_with_leading_icon";
import SelectAccountTypeModal from "../components/modals/selectAccountTypeModal";
import { accountState } from "../recoil/account";
import { getAccount, signInUser } from "../services/user";
import { showToast } from "../utils/ui";

export default function Page() {
  const toast = useToast();
  const setAccount = useSetRecoilState(accountState);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Please input a valid email")
      .required("Please input an email"),
    password: Yup.string()
      .min(6, "Password should be 6 or more characters")
      .required("Please input a password"),
  });
  const onSubmit = async (values) => {
    setLoading(true);
    try {
      const uid = await signInUser({
        email: values.email,
        password: values.password,
      });
      const account = await getAccount(uid);
      setAccount({
        ...account,
        type: account.companyProfile ? "client" : "freelancer",
      });
      showToast({
        toast,
        title: "Success",
        description: "Account logged in successfuly",
        status: "success",
      });

      if (account.companyProfile) router.push("/jobs");
      else router.push("/");
    } catch (error) {
      console.log(error);
      if (error === "Account details do not exist") {
        onOpen();
      } else
        showToast({
          toast,
          title: "Error",
          description: error,
          status: "error",
        });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SelectAccountTypeModal isOpen={isOpen} onClose={onClose} />
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-soko-light-blue">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="text-center text-3xl font-extrabold text-gray-900">
              Log in to Digital Soko
            </h2>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {(props) => (
              <form className="mt-8 space-y-4" onSubmit={props.handleSubmit}>
                <InputWithLeadingIcon
                  name="email"
                  type="email"
                  placeholder="Email"
                  icon={
                    <HiMail
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  }
                />
                <InputWithLeadingIcon
                  name="password"
                  type="password"
                  placeholder="Password"
                  autoComplete="on"
                  icon={
                    <HiLockClosed
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  }
                />
                <SolidButton
                  type="submit"
                  isSubmitting={loading}
                  label="Sign in"
                />
              </form>
            )}
          </Formik>
          <div className="space-y-4">
            <p className="w-full flex justify-center">
              Don’t have a Digital Soko account?
            </p>

            <button
              className="group relative w-full flex justify-center py-2 px-4 border border-soko-blue font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-soko-blue"
              onClick={() => router.push("/sign-up")}
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
