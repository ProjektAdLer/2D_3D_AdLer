import React from "react";

export default function H5PModal(props: any) {
  if (!props.show) {
    return null;
  }
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Das Wasserfallmodell</h3>
        </div>
        <div className="modal-body">
          {" "}
          <iframe
            src="http://moodle.cluuub.xyz/h5p/embed.php?url=https%3A%2F%2Fmoodle.cluuub.xyz%2Fpluginfile.php%2F278%2Fmod_h5pactivity%2Fpackage%2F0%2FMetriken%2520Teil%25201.h5p"
            width=":w"
            height="100%"
            // allowfullscreen="allowfullscreen"
            // class="h5p-player w-100 border-0"
            style={{ height: "400px", width: "100%" }}
            // id="621fa7f7f1cfb621fa7f7dd88914-h5player"
          ></iframe>
        </div>
        <div className="modal-footer">
          <button onClick={props.onClose} className="button">
            close
          </button>
        </div>
      </div>
    </div>
  );
}
