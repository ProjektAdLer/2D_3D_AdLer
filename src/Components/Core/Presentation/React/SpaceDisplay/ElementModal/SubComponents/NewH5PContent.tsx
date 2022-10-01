import { useEffect, useRef } from "react";
import { H5P as H5PPlayer } from "h5p-standalone";
import ElementModalViewModel from "../ElementModalViewModel";
import { config } from "../../../../../../../config";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import IScoreH5PElement from "src/Components/Core/Application/UseCases/ScoreH5PElement/IScoreH5PElement";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import IBackendAdapter from "src/Components/Core/Adapters/BackendAdapter/IBackendAdapter";
import CORE_TYPES from "~DependencyInjection/CoreTypes";

export default function NewH5PContent({
  viewModel,
}: {
  viewModel: ElementModalViewModel;
}) {
  const h5pContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const debug = async () => {
      if (h5pContainerRef.current) {
        const el = h5pContainerRef.current;

        const baseURL = config.serverURL
          .replace("https://localhost/api", "https://localhost/")
          .replace("https://api.cluuub.xyz/api", "https://api.cluuub.xyz/");

        const filePath = await CoreDIContainer.get<IBackendAdapter>(
          CORE_TYPES.IBackendAdapter
        ).getElementSource(viewModel.id.Value, 1);

        let h5pJsonURL =
          baseURL + filePath.replaceAll("\\", "/").replaceAll("wwwroot/", "");

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
              elementId: viewModel.id.Value,
              courseId: 1, // TODO: get from somewhere
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
