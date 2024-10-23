import { useEffect, useRef, useState } from "react";
import { H5P as H5PPlayer } from "h5p-standalone";
import LearningElementModalViewModel from "../LearningElementModalViewModel";
import ILearningElementModalController from "../ILearningElementModalController";
import {
  createH5POptions,
  getH5PContentSizeDecision,
  getH5PDivs,
  shrinkH5PElement,
} from "./H5pUtils";
import useObservable from "~ReactComponents/ReactRelated/CustomHooks/useObservable";

// variable cannot be react state because state update is asynchronious and wont trigger with resizeObserver ~ sb
let lastRenderedWidth: number = 0;

export default function H5PContent({
  viewModel,
  controller,
}: {
  viewModel: LearningElementModalViewModel;
  controller: ILearningElementModalController;
}) {
  const h5pContainerRef = useRef<HTMLDivElement>(null);
  const [isVisible] = useObservable<boolean>(viewModel.isVisible);
  const [dimensions, setDimensions] = useState({
    contentWidth: 0,
    contentHeight: 0,
    refWidth: 0,
    refHeight: 0,
  });

  // sets modal visible after timeout
  useEffect(() => {
    if (isVisible && h5pContainerRef.current) {
      h5pContainerRef.current.style.visibility = "visible";
    }
  }, [isVisible]);

  useEffect(() => {
    const debug = async () => {
      if (h5pContainerRef.current) {
        const el = h5pContainerRef.current;
        await new H5PPlayer(el, createH5POptions(viewModel)).then(() => {
          //@ts-ignore
          H5P.externalDispatcher.on("xAPI", controller.h5pEventCalled);
          // @ts-ignore
          H5P.xAPICompletedListener = controller.xAPICompletedListener;
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

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const result = getH5PDivs(h5pContainerRef);
        if (result === null) {
          return;
        }
        const decision = getH5PContentSizeDecision(
          h5pContainerRef,
          entry,
          lastRenderedWidth,
        );

        if (decision.shrinkContent) {
          setDimensions({
            contentWidth: Math.round(entry.contentRect.width),
            contentHeight: Math.round(entry.contentRect.height),
            refWidth: Math.round(result.ref.clientWidth),
            refHeight: Math.round(result.ref.clientHeight),
          });
        } else if (decision.resetContent) {
          result.div.style.width = "90vw";
        }

        lastRenderedWidth = Math.round(entry.contentRect.width);
        window.dispatchEvent(new Event("resize"));
      }
    });

    if (h5pContainerRef.current) {
      observer.observe(h5pContainerRef.current, { box: "border-box" });
    }

    // Cleanup function
    return () => {
      observer.disconnect();
      lastRenderedWidth = 0;
    };
  }, []);

  useEffect(() => {
    shrinkH5PElement(h5pContainerRef, dimensions);
  }, [dimensions]);

  return (
    <div
      className="App max-h-[85vh] overflow-y-scroll"
      id="h5p-container"
      style={{ visibility: "hidden", width: "90vw" }}
      ref={h5pContainerRef}
    ></div>
  );
}
