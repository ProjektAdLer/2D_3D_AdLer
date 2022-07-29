import { useEffect, useRef, useState } from "react";
import { H5P as H5PPlayer } from "h5p-standalone";
import LearningElementModalViewModel from "../LearningElementModalViewModel";
import H5PLearningElementData from "../../../../Domain/Entities/SpecificLearningElements/H5PLearningElementData";
import { config } from "../../../../../../config";
import { logger } from "../../../../../../Lib/Logger";

export default function NewH5PContent({
  viewModel,
}: {
  viewModel: LearningElementModalViewModel<H5PLearningElementData>;
}) {
  const h5pContainerRef = useRef<HTMLDivElement>(null);

  const [h5pShown, setH5pShown] = useState(false);

  useEffect(() => {
    const debug = async () => {
      if (h5pContainerRef.current && !h5pShown) {
        const el = h5pContainerRef.current;

        const options = {
          h5pJsonPath:
            config.serverURL +
            "/TestH5P/" +
            viewModel.learningElementData.Value.fileName,
          frameJs: config.serverURL + "/TestH5P/" + "/h5pBase/frame.bundle.js",
          frameCss: config.serverURL + "/TestH5P/" + "/h5pBase/styles/h5p.css",
        };
        new H5PPlayer(el, options).then(() => {
          //@ts-ignore
          H5P.externalDispatcher.on("xAPI", (event: any) => {
            //do something useful with the event
            logger.log("xAPI event: ", event);
          });
        });

        setH5pShown(true);
      }
    };
    debug();
  }, []);

  return (
    <div className="App">
      <div
        id="h5p-container"
        style={{
          width: "800px",
        }}
        ref={h5pContainerRef}
      ></div>
    </div>
  );
}
