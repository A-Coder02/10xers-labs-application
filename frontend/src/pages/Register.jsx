import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import TextField from "../components/TextField";
import Button from "../components/Button";
import Select from "../components/Select";
import { Link } from "react-router-dom";

const Register = () => {
  // Validation schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    role: Yup.string()
      .oneOf(["ADMIN", "CUSTOMER"], "Select a valid role")
      .required("Role is required"),
  });

  // Initial form values
  const initialValues = {
    email: "",
    password: "",
    role: "CUSTOMER",
  };

  // Form submission handler
  const onSubmit = (values) => {
    console.log("Form data", values);
  };

  return (
    <div className="bg-amber-50 flex justify-center items-center min-h-screen">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col gap-4 px-4 py-6 bg-white shadow-lg md:min-w-sm">
            <h2 className="text-xl font-semibold text-gray-700">Register</h2>
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
            <Select
              label="Role"
              name="role"
              options={[
                { value: "ADMIN", label: "Admin" },
                { value: "CUSTOMER", label: "Customer" },
              ]}
            />

            <Button
              type="submit"
              disabled={isSubmitting}
              isLoading={isSubmitting}
            >
              Register
            </Button>
            <p className="text-center mt-6">
              Have an Account?
              <Link to={"/login"} className="underline text-blue-500">
                Login
              </Link>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
