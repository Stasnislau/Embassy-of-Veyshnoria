import "./index.scss";

import Modal from "@mui/material/Modal";
import React from "react";

const SurenessModal = ({
  open,
  handleConfirm,
  handleClose,
  text,
}: {
  open: boolean;
  handleConfirm: () => void;
  handleClose: () => void;
  text: string;
}) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="sureness-modal-container">
        <div className="sureness-modal">
          <div className="sureness-modal-header">
            <h1 className="sureness-modal-title">Confirmation?</h1>
            <hr className="sureness-modal-line" />
          </div>
          <span className="sureness-modal-subtitle">
            Are you sure you want to {text}?
          </span>
          <div className="sureness-modal-buttons">
            <button
              className="sureness-modal-button yes-button"
              onClick={handleConfirm}
            >
              Yes
            </button>
            <button
              className="sureness-modal-button no-button"
              onClick={handleClose}
            >
              No
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SurenessModal;
