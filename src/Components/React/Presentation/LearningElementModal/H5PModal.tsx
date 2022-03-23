import { useRef } from "react";
import H5PElement from "../../../Core/Entities/Entities/LearningElements/H5PElement";
import useEntity from "../../CustomHooks/useEntity";

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

export default function H5PModal(props: { elementId: string }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [H5PElementEntity] = useEntity<H5PElement>(props.elementId, H5PElement);

  return (
    <iframe
      ref={iframeRef}
      src={createIframeUrl(
        H5PElementEntity.h5pContextId.Value,
        H5PElementEntity.h5pFileName.Value
      )}
      width=":w"
      height="100%"
      style={{ height: "400px", width: "100%" }}
    ></iframe>
  );
}
