import "./index.scss";

import Modal from "@mui/material/Modal";
import React from "react";

const ErrorModal = ({
  open,
  handleOkay,
  message,
}: {
  open: boolean;
  handleOkay: () => void;
  message: string;
}) => {
  return (
    <Modal
      open={open}
      onClose={handleOkay}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="error-modal-container">
        <div className="error-modal">
          <div className="error-modal-header">
            <h1 className="error-modal-title">Error</h1>
            <hr className="error-modal-line" />
          </div>
          <span className="error-modal-subtitle">
            We have encountered an error. {message}
          </span>
          <hr className="error-modal-line" />
          <div className="error-modal-buttons">
            <button
              className="error-modal-button okay-button"
              onClick={handleOkay}
            >
              Ok
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ErrorModal;
