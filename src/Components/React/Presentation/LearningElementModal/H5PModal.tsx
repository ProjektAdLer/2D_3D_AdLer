import { useEffect, useRef, useState } from "react";
import ICoreFactory from "../../../Core/API/ICoreFactory";
import { H5PForCoursesAPIResponse } from "../../../Core/Types/H5PTypes";
import CoreFactory from "../../../Core/API/CoreFactory";
import { useInjection } from "inversify-react";
import CORE_TYPES from "../../../Core/DependencyInjection/CoreTypes";
import INewEntityManager from "../../../Core/BusinessLogic/EntityManager/NewEntityManager/INewEntityManager";
import usePrimitive from "../../CustomHooks/usePrimitive";

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
  //show: boolean;
  h5pId: number;
  h5pFileName: string;
  title?: string;
}) {
  const [h5pData, setH5pData] = useState<H5PForCoursesAPIResponse>();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const entityManager = useInjection<INewEntityManager>(
    CORE_TYPES.INewEntityManager
  );
  const rootEntity = entityManager.getRootEntity();

  const [primitive] = usePrimitive(rootEntity.Value.memberx);
  const [showModal] = usePrimitive(rootEntity.Value.showModal);

  useEffect(() => {
    if (!showModal) {
      return;
    }

    const coreFactory: ICoreFactory = new CoreFactory();
    const engineCore = coreFactory.createCore();

    const fetchH5ps = async () => {
      const h5p = await engineCore.getAllH5Ps(5);
      setH5pData(h5p);
    };

    fetchH5ps();

    return () => {
      console.log("H5P Unmountsed");
    };
  }, [showModal]);
  if (!showModal) {
    return null;
  }

  // Dont render anything if the H5P is not shown

  // contextId: wird in der REST Antwort als "context" angezeigt
  // fileName: wird in der Rest Antwort als "filename" angezeigt

  // We use a Factory here, because React does not support DI - PG

  return (
    <div className="modal flex justify-center items-center fixed top-0 left-0 right-0 bottom-0 bg-blacktrans50">
      <div className="modal-content bg-white w-2/3 border-8 border-blue-200 rounded-lg">
        <div className="modal-header flex justify-between items-center p-2 h-16 text-xl">
          {props.title || <h3>H5P Aufgabe</h3>}
          <button onClick={props.onClose} className="button-close m-2 p-2">
            X
          </button>
        </div>
        <div className="modal-body p-2 border-t-2 border-b-2 border-blue-200">
          {" "}
          <iframe
            ref={iframeRef}
            src={createIframeUrl(278, "Metriken Teil 1.h5p")}
            width=":w"
            height="100%"
            // allowfullscreen="allowfullscreen"
            // class="h5p-player w-100 border-0"
            style={{ height: "400px", width: "100%" }}
            // id="621fa7f7f1cfb621fa7f7dd88914-h5player"
            onLoad={(e) => {
              console.log("Iframe loaded");
            }}
          ></iframe>
        </div>
        <div className="modal-footer flex justify-between items-center p-2 h-16">
          <p>
            {
              ///@ts-ignore
              primitive
            }
            {/* Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum. */}
          </p>
        </div>
      </div>
    </div>
  );
}
