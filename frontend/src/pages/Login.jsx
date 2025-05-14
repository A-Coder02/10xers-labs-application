import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import TextField from "../components/form-ui/TextField";
import Button from "../components/form-ui/Button";
import Select from "../components/form-ui/Select";
import { Link } from "react-router-dom";

const Login = () => {
  // Validation schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  // Initial form values
  const initialValues = {
    email: "",
    password: "",
  };

  // Form submission handler
  const onSubmit = (values) => {
    console.log("Form data", values);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col gap-4 px-4 py-6 bg-white shadow-lg md:min-w-sm">
            <h2 className="text-xl font-semibold text-gray-700">Login</h2>
            <TextField
              name="email"
              label="Email"
              placeholder={"johndoe@mail.com"}
            />

            <TextField
              name="password"
              type="password"
              label="Password"
              placeholder={"***"}
            />

            <Button
              type="submit"
              disabled={isSubmitting}
              isLoading={isSubmitting}
            >
              Login
            </Button>
            <p className="text-center mt-6">
              No Account?
              <Link to={"/register"} className="underline text-blue-500">
                Create Account
              </Link>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
