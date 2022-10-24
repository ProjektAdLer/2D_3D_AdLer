import { useEffect, useRef, useState } from "react";
import { H5P as H5PPlayer } from "h5p-standalone";
import ElementModalViewModel from "../ElementModalViewModel";
import { config } from "../../../../../../../config";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import IScoreH5PElement from "src/Components/Core/Application/UseCases/ScoreH5PElement/IScoreH5PElement";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import { useInjection } from "inversify-react";
import IGetElementSourceUseCase from "src/Components/Core/Application/UseCases/GetElementSourceUseCase/IGetElementSourceUseCase";

export const h5pEventCalled = (
  event: any,
  viewModel: ElementModalViewModel
) => {
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
    });
  }
};

export default function NewH5PContent({
  viewModel,
}: {
  viewModel: ElementModalViewModel;
}) {
  const h5pContainerRef = useRef<HTMLDivElement>(null);

  const getElementSourceUseCase = useInjection<IGetElementSourceUseCase>(
    USECASE_TYPES.IGetElementSource
  );

  useEffect(() => {
    const debug = async () => {
      if (h5pContainerRef.current) {
        const el = h5pContainerRef.current;

        let baseURL = config.serverURL.replace(/api\/?$/, "");

        const filePath = await getElementSourceUseCase.executeAsync({
          courseId: viewModel.parentCourseId.Value,
          elementId: viewModel.id.Value,
        });

        let h5pJsonURL =
          baseURL + filePath.replaceAll("\\", "/").replaceAll("wwwroot/", "");

        const options = {
          h5pJsonPath: h5pJsonURL,
          frameJs:
            window.location.protocol +
            "//" +
            window.location.host +
            "/h5pBase/frame.bundle.js",
          frameCss:
            window.location.protocol +
            "//" +
            window.location.host +
            "/h5pBase/styles/h5p.css",
        };

        await new H5PPlayer(el, options);

        /* istanbul ignore next */
        //@ts-ignore
        H5P.externalDispatcher.on("xAPI", (event: any) => {
          /* istanbul ignore next */
          h5pEventCalled(event, viewModel);
        });
      }
    };
    debug();

    return () => {
      // Remove event listener
      //@ts-ignore
      H5P.externalDispatcher.off("xAPI");
      //@ts-ignore
      H5PIntegration.contents = {};
    };
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
