import { useEffect, useRef, useState } from "react";

import { H5P } from "h5p-standalone";
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
        const options = {
          h5pJsonPath: "https://api.cluuub.xyz/userlogin/h5p/",
          frameJs: "../../ThirdParty/assets/frame.bundle.js",
          frameCss: "../../ThirdParty/styles/h5p.css",
        };
        await new H5P(el, options);
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
