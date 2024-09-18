import {
  useEffect,
  useRef,
  CSSProperties,
  useReducer,
  useState,
  useCallback,
} from "react";
import { H5P as H5PPlayer } from "h5p-standalone";
import LearningElementModalViewModel from "../LearningElementModalViewModel";
import ILearningElementModalController from "../ILearningElementModalController";
import { createH5POptions } from "./H5pUtils";

export default function H5PContent({
  viewModel,
  controller,
}: {
  viewModel: LearningElementModalViewModel;
  controller: ILearningElementModalController;
}) {
  const h5pContainerRef = useRef<HTMLDivElement>(null);

  function h5pResizing() {
    if (h5pContainerRef.current?.style.visibility) {
      const h5pDiv = h5pContainerRef.current;
      const h5pRef = document.getElementsByClassName(
        "h5p-iframe-wrapper"
      )[0] as HTMLDivElement;
      const h5pRatio = h5pRef.clientWidth / h5pRef.clientHeight;

      //Set Overflow to H5P Content

      const targetViewPort = {
        height: window.innerHeight,
        width: window.innerWidth,
        ratio: window.innerWidth / window.innerHeight,
      };

      if (h5pRatio < targetViewPort.ratio) {
        h5pDiv.style.width = targetViewPort.height * 0.80 * h5pRatio + "px";
      } else {
        h5pDiv.style.width = "90vw";
      }

      window.dispatchEvent(new Event("resize"));
      h5pDiv.style.visibility = "visible";
    }
  }

  useEffect(() => {
    const debug = async () => {
      if (h5pContainerRef.current) {
        const el = h5pContainerRef.current;
        await new H5PPlayer(el, createH5POptions(viewModel)).then(() => {
          //@ts-ignore
          H5P.externalDispatcher.on("xAPI", controller.h5pEventCalled);
          // @ts-ignore
          H5P.xAPICompletedListener = controller.xAPICompletedListener;

          setTimeout(() => {
            h5pResizing();
          }, 1000);
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
  }, [controller, viewModel]);

  return (
    <div className="App max-h-[90vh] overflow-y-auto">
      <div
        id="h5p-container"
        style={{ visibility: "hidden", width: "90vw" }}
        ref={h5pContainerRef}
      ></div>
    </div>
  );
}
