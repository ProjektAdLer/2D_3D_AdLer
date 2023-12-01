import { useEffect, useRef } from "react";
import { H5P as H5PPlayer } from "h5p-standalone";
import LearningElementModalViewModel from "../LearningElementModalViewModel";
import { config } from "../../../../../../../config";

export default function H5PContent({
  viewModel,
}: {
  readonly viewModel: LearningElementModalViewModel;
}) {
  const h5pContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const setup = async () => {
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
      }
    };
    setup();
  }, [viewModel.filePath.Value]);

  return (
    <div className="App">
      <div
        className=" w-[80vw] h-[80vh] sm:h-[80vh] sm:w-[90vw] xl:h-[85vh] xl:w-[80vw] "
        id="h5p-container"
        ref={h5pContainerRef}
      ></div>
    </div>
  );
}
