import React from "react";
import Modal from "./layout-ui/Modal";
import Button from "./form-ui/Button";

const RemoveModal = ({
  show,
  setShow,
  initialValues,
  onSubmit,
  loading = false,
}) => {
  return (
    <Modal loading={loading} show={show} setShow={setShow} title={"Sure??"}>
      <div className="p-4">
        <div className="flex flex-col gap-2">
          <p>Are you sure want to remove {initialValues?.name}?</p>
          <Button
            type="submit"
            disabled={loading}
            isLoading={loading}
            onClick={() => onSubmit(initialValues)}
          >
            Sure
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default RemoveModal;
