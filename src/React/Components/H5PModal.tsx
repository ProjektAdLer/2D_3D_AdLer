import React from "react";

export default function H5PModal(props: any) {
  if (!props.show) {
    return null;
  }
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h4>Erstes H5P</h4>
        </div>
        <div className="modal-body">Kommt hier rein</div>
        <div className="modal-footer">
          <button onClick={props.onClose} className="button">
            close
          </button>
        </div>
      </div>
    </div>
  );
}
