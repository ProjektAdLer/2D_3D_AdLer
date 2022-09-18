import { useEffect, useRef, useState } from "react";
import { H5P as H5PPlayer } from "h5p-standalone";
import ElementModalViewModel from "../ElementModalViewModel";
import H5PElementData from "../../../../../Domain/Entities/ElementData/H5PElementData";
import { config } from "../../../../../../../config";

export default function NewH5PContent({
  viewModel,
}: {
  viewModel: ElementModalViewModel<H5PElementData>;
}) {
  const h5pContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const debug = async () => {
      if (h5pContainerRef.current) {
        const el = h5pContainerRef.current;

        const baseURL = config.serverURL.replace(
          "https://api.cluuub.xyz/api",
          "https://api.cluuub.xyz/"
        );

        let h5pJsonURL =
          baseURL +
          viewModel.elementData.Value.fileName
            .replaceAll("wwwroot/", "")
            .replaceAll("\\", "/");

        const options = {
          h5pJsonPath: h5pJsonURL,
          frameJs: baseURL + "common/h5pBase/frame.bundle.js",
          frameCss: baseURL + "common/h5pBase/styles/h5p.css",
        };

        await new H5PPlayer(el, options);
        //@ts-ignore
        // H5P.externalDispatcher.on("xAPI", (event: any) => {
        //   //do something useful with the event
        //   logger.log("xAPI event: ", event);
        // });
      }
    };
    debug();
  }, []);

  return (
    <div className="App">
      <div
        className="w-[800px] h-[600px] aspect-video"
        id="h5p-container"
        ref={h5pContainerRef}
      ></div>
    </div>
  );
}
