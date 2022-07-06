import { useRef } from "react";
import { config } from "../../../../../../config";
const createIframeUrl = (contextId: number, fileName: string) => {
  // In addition to contextId and fileName, in the future, we will also need a package
  // the package number is indicated by the size of the array returned by the REST call
  const baseUrl = config.serverURL + "/h5p/embed.php";
  const template =
    config.serverURL +
    `/pluginfile.php/${contextId}/mod_h5pactivity/package/0/${encodeURIComponent(
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
  const iframeRef = useRef<HTMLIFrameElement>(null);

  return (
    <div className="flex justify-center items-top max-h-90pro sm:w-[300px] md:w-[315px] lg:w-[700px] xl:w-[900px] 2xl:w-[1100px]">
      <iframe
        className="rounded-lg"
        ref={iframeRef}
        allowFullScreen
        src={createIframeUrl(
          278, //learningElementEntity.h5PcontextId.Value,
          "Metriken Teil 1.h5p" //learningElementEntity.h5PFileName.Value
        )}
        title="Embedded H5P"
      ></iframe>
    </div>
  );
}
