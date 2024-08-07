import { useEffect, useRef } from "react";
import { H5P as H5PPlayer } from "h5p-standalone";
import LearningElementModalViewModel from "../LearningElementModalViewModel";
import { config } from "../../../../../../../config";
import ILearningElementModalController from "../ILearningElementModalController";

function fixLocalhost(url: string) {
  if (url.includes("localhost")) {
    return url.replace("http:", "");
  }
  return url;
}

export default function H5PContent({
  viewModel,
  controller,
}: {
  viewModel: LearningElementModalViewModel;
  controller: ILearningElementModalController;
}) {
  const h5pContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const debug = async () => {
      if (h5pContainerRef.current) {
        const el = h5pContainerRef.current;

        let baseURL = config.serverURL.replace(/api\/?$/, "");

        let h5pJsonURL =
          baseURL +
          viewModel.filePath.Value.replaceAll("\\", "/").replaceAll(
            "wwwroot/",
            ""
          );

        const options = {
          h5pJsonPath: fixLocalhost(h5pJsonURL),
          frameJs: "/h5pBase/frame.bundle.js",
          frameCss: "/h5pBase/styles/h5p.css",
        };

        await new H5PPlayer(el, options);

        //@ts-ignore
        H5P.externalDispatcher.on("xAPI", controller.h5pEventCalled);
        // @ts-ignore
        H5P.xAPICompletedListener = controller.xAPICompletedListener;
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
  }, [controller, viewModel.filePath.Value]);

  return (
    <div className="App">
      <div
        className=" w-[80vw] h-[80vh] sm:h-[80vh] sm:w-[90vw] xl:h-[85vh] xl:w-[80vw] xl:scale-75"
        id="h5p-container"
        ref={h5pContainerRef}
      ></div>
    </div>
  );
}
