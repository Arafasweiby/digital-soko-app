import { Spinner } from "@chakra-ui/react";
import { Formik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";
import { HiLockClosed, HiMail } from "react-icons/hi";
import * as Yup from "yup";
import InputWithLeadingIcon from "../components/input/input_with_leading_icon";
import { createUser } from "../services/user";
import { useToast } from "@chakra-ui/react";
import { showToast } from "../utils/ui";

export default function Page() {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Please input a valid email")
      .required("Please input an email"),
    password: Yup.string()
      .min(6, "Password should be 6 or more characters")
      .required("Please input a password"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Please input a password"),
  });
  const onSubmit = async (values) => {
    setLoading(true);
    try {
      await createUser({ email: values.email, password: values.password });
      router.push("/login");
      showToast({
        toast,
        title: "Success",
        description: "Account created successfuly",
        status: "success",
      });
    } catch (error) {
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
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-soko-light-blue">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Sign Up for Digital Soko
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
                icon={
                  <HiLockClosed
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                }
              />
              <InputWithLeadingIcon
                name="confirmPassword"
                type="password"
                placeholder="Confirm password"
                icon={
                  <HiLockClosed
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                }
              />
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-soko-blue hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {loading == true ? <Spinner /> : <span>Sign Up</span>}
              </button>
            </form>
          )}
        </Formik>
        <div className="space-y-4">
          <p className="w-full flex justify-center">
            Already have an account ?
          </p>

          <button
            className="group relative w-full flex justify-center py-2 px-4 border border-soko-blue font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-soko-blue"
            onClick={() => router.push("/login")}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
