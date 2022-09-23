import { useEffect, useRef, useState } from "react";
import { H5P as H5PPlayer } from "h5p-standalone";
import ElementModalViewModel from "../ElementModalViewModel";
import H5PElementData from "../../../../../Domain/Entities/ElementData/H5PElementData";
import { config } from "../../../../../../../config";
import { logger } from "src/Lib/Logger";
import XAPI from "@xapi/xapi";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import IScoreH5PElement from "src/Components/Core/Application/UseCases/ScoreH5PElement/IScoreH5PElement";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";

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
          "https://localhost/api",
          "https://localhost/"
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
        H5P.externalDispatcher.on("xAPI", (event: any) => {
          //do something useful with the event
          //logger.log("xAPI event: ", event);
          const xapiData = event.data.statement;
          if (
            xapiData.verb.id === "http://adlnet.gov/expapi/verbs/completed" ||
            (xapiData.verb.id === "http://adlnet.gov/expapi/verbs/answered" &&
              typeof xapiData.result.success !== "undefined")
          ) {
            CoreDIContainer.get<IScoreH5PElement>(
              USECASE_TYPES.IScoreH5PElement
            ).executeAsync({
              xapiData: xapiData,
              h5pContextId: viewModel.elementData.Value.contextId,
            });
          }
        });
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
