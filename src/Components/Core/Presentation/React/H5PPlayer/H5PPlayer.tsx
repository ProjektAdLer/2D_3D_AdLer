import React, { useEffect } from "react";

import { H5P as H5PStandalone } from "h5p-standalone"; //you need you an alias due to conflict
import { logger } from "../../../../../Lib/Logger";
export default function H5PPlayer() {
  useEffect(function () {
    func();

    async function func() {
      const el = document.getElementById("h5p-container");
      const options = {
        h5pJsonPath: "ThirdParty/extracted",
        frameJs: "ThirdParty/assets/frame.bundle.js",
        frameCss: "ThirdParty/assets/styles/h5p.css",
        export: true,
      };

      await new H5PStandalone(el, options);

      logger.log("Geladen!");

      //@ts-ignore
      H5P.externalDispatcher.on("xAPI", (event) => {
        //do something useful with the event
        logger.log("xAPI event: ", event);
        if (
          event.data.statement.verb.id ===
          "http://adlnet.gov/expapi/verbs/completed"
        ) {
          logger.log("Completed!");
        }
      });
    }
  });
  return <div id="h5p-container" style={{ width: "800px" }}></div>;
}
