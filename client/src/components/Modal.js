import React, { useContext } from "react";
import { bool, func } from "prop-types";
import { Context } from "../context";
import { deleteUser } from "../context/api";

const propTypes = {
  isModal: bool.isRequired,
  setIsModal: func.isRequired
};

function Modal({ isModal, setIsModal }) {
  const context = useContext(Context);

  function onConfirmDelete() {
    deleteUser({ context });
  }

  return (
    <div className={"modal" + (isModal ? " is-active" : "")}>
      <div className="modal-background" />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">
            Are you sure you want to delete this User?
          </p>
          <button
            className="delete"
            aria-label="close"
            onClick={() => setIsModal(false)}
          />
        </header>
        <footer className="modal-card-foot">
          <button
            onClick={onConfirmDelete}
            type="button"
            className="button is-danger"
          >
            Delete
          </button>
          <button
            type="button"
            onClick={() => setIsModal(false)}
            className="button"
          >
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );
}

Modal.propTypes = propTypes;

export default Modal;
