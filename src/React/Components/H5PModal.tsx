import { useEffect } from "react";
import CoreFactory from "../../Babylon/Components/Core/API/CoreFactory";
import ICoreFactory from "../../Babylon/Components/Core/API/ICoreFactory";

const createIframeUrl = (contextId: number, fileName: string) => {
  // In addition to contextId and fileName, in the future, we will also need a package
  // the package number is indicated by the size of the array returned by the REST call
  const baseUrl = "https://moodle.cluuub.xyz/h5p/embed.php";
  const template = `https://moodle.cluuub.xyz/pluginfile.php/${contextId}/mod_h5pactivity/package/0/${encodeURIComponent(
    fileName
  )}`;

  return (
    baseUrl +
    "?url=" +
    encodeURIComponent(template) +
    "&component=mod_h5pactivity"
  );
};

export default function H5PModal(props: {
  onClose: () => void;
  show: boolean;
  h5pId: number;
  h5pFileName: string;
  title?: string;
}) {
  useEffect(() => {
    if (!props.show) {
      return;
    }

    const coreFactory: ICoreFactory = new CoreFactory();
    const engineCore = coreFactory.createCore();

    engineCore.setupMoodle();

    return () => {
      // engineCore.dispose(); // TODO
    };
  }, [props.show]);

  if (!props.show) {
    return null;
  }

  // Dont render anything if the H5P is not shown

  // contextId: wird in der REST Antwort als "context" angezeigt
  // fileName: wird in der Rest Antwort als "filename" angezeigt

  // We use a Factory here, because React does not support DI - PG

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          {props.title || <h3>H5P Aufgabe</h3>}
        </div>
        <div className="modal-body">
          {" "}
          <iframe
            src={createIframeUrl(props.h5pId, props.h5pFileName)}
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
