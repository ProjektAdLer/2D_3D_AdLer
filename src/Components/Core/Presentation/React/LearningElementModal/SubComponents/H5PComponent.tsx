import { useRef } from "react";
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

export default function H5PContent(props: { h5pEntityId: string }) {
  // const [learningElementEntity] = useEntity<EH5PLearningElement>(
  //   props.h5pEntityId,
  //   EH5PLearningElement
  // );

  const iframeRef = useRef<HTMLIFrameElement>(null);

  // if (!learningElementEntity)
  //   return (
  //     <div>
  //       <h1>Lernelement wird geladen</h1>
  //     </div>
  //   );

  return (
    <iframe
      className="rounded-lg"
      ref={iframeRef}
      allowFullScreen
      src={createIframeUrl(
        0, //learningElementEntity.h5PcontextId.Value,
        "ololo" //learningElementEntity.h5PFileName.Value
      )}
      style={{ width: "95%" }}
      title="Embedded H5P"
    ></iframe>
  );
}
