import { useEffect, useRef, useState } from "react";

import { H5P as H5PPlayer } from "h5p-standalone";
import LearningElementModalViewModel from "../LearningElementModalViewModel";
import { logger } from "../../../../../../Lib/Logger";
import H5PLearningElementData from "../../../../Domain/Entities/SpecificLearningElements/H5PLearningElementData";
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
        const serverURL =
          process.env.REACT_APP_API_SERVER_URL || "https://localhost:1771";
        const options = {
          h5pJsonPath:
            serverURL +
            "/TestH5P/" +
            viewModel.learningElementData.Value.fileName,
          frameJs: serverURL + "/TestH5P/" + "/h5pBase/frame.bundle.js",
          frameCss: serverURL + "/TestH5P/" + "/h5pBase/styles/h5p.css",
        };
        new H5PPlayer(el, options).then(() => {
          console.log("H5P Geladen");
          //@ts-ignore
          H5P.externalDispatcher.on("xAPI", (event: any) => {
            //do something useful with the event
            console.log("xAPI event: ", event);
          });
        });

        setH5pShown(true);
      }
    };
    debug();
  }, []);

  console.log("VM", viewModel);

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
