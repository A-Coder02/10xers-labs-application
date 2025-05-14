import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import TextField from "./form-ui/TextField";
import Modal from "./layout-ui/Modal";
import Button from "./form-ui/Button";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  price: Yup.number()
    .required("Price is required")
    .positive("Price must be positive"),
  description: Yup.string().required("Description is required"),
  image: Yup.string().url("Invalid URL").required("Image URL is required"),
});

const ProductModal = ({
  show,
  setShow,
  title,
  initialValues,
  onSubmit,
  loading = false,
}) => {
  const isUpdate = initialValues.id ? true : false;
  return (
    <Modal loading={loading} show={show} setShow={setShow} title={title}>
      <div className="p-4">
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-2">
                <TextField
                  name="name"
                  label="Enter Name"
                  placeholder={"iPhone 16"}
                />
                <TextField
                  name="price"
                  label="Enter Price"
                  placeholder={"99"}
                />

                <TextField
                  name="image"
                  label="Enter Image Url"
                  placeholder={"https://img-16.jpg"}
                  type="url"
                />

                <TextField
                  name="description"
                  label="Enter Description"
                  placeholder={"iPhone 16 is ..."}
                />

                <Button type="submit" disabled={loading} isLoading={loading}>
                  {isUpdate ? "Made Changes" : "Submit"}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  );
};

export default ProductModal;
