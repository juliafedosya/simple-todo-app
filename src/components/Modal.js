import React from "react";

const Modal = (props) => {
  return (
    // overlay of the modal
    <div
      id="modal-outer-layer"
      onClick={(e) => {
        // close modal when the outer part of the modal is clicked
        // check is required to avoid closing of the modal whe clicked on modal content
        if (e.target.id === "modal-outer-layer") {
          props.closeModal();
        }
      }}
    >
       {/* modal itself  */}
      <div style={{ backgroundColor: "white", padding: 20 }}>
        {props.children}
      </div>
    </div>
  );
};

export default Modal;