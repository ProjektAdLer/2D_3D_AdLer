import { useEffect, useRef } from "react";
import { H5P as H5PPlayer } from "h5p-standalone";
import ElementModalViewModel from "../ElementModalViewModel";
import { config } from "../../../../../../../config";
import IElementModalController from "../IElementModalController";

export default function H5PContent({
  viewModel,
  controller,
}: {
  viewModel: ElementModalViewModel;
  controller: IElementModalController;
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
          controller.h5pEventCalled(event);
        });
        //@ts-ignore
        H5P.xAPICompletedListener = function (t) {
          if (
            ("completed" === t.getVerb() || "answered" === t.getVerb()) &&
            !t.getVerifiedStatementValue([
              "context",
              "contextActivities",
              "parent",
            ])
          ) {
            let n = t.getScore(),
              r = t.getMaxScore(),
              i = t.getVerifiedStatementValue([
                "object",
                "definition",
                "extensions",
                "http://h5p.org/x-api/h5p-local-content-id",
              ]);
            //@ts-ignore
            e.setFinished(i, n, r);
          }
        };
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
        className="h-[90vh] lg:w-[90vw] aspect-video"
        id="h5p-container"
        ref={h5pContainerRef}
      ></div>
    </div>
  );
}
