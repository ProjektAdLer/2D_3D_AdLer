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
import CookieConsentBlocker from "./CookieConsentBlocker";
import H5PIndexedDBServer from "../../../../../Adapters/H5PIndexedDBServer/H5PIndexedDBServer";

// variable cannot be react state because state update is asynchronious and wont trigger with resizeObserver ~ sb
let lastRenderedWidth: number = 0;

export default function H5PContent({
  viewModel,
  controller,
}: {
  readonly viewModel: LearningElementModalViewModel;
  controller: ILearningElementModalController;
}) {
  const h5pContainerRef = useRef<HTMLDivElement>(null);
  const [isVisible] = useObservable<boolean>(viewModel.isVisible);
  const [cookieConsent] = useObservable(viewModel.cookieConsent);
  const [dimensions, setDimensions] = useState({
    contentWidth: 0,
    contentHeight: 0,
    refWidth: 0,
    refHeight: 0,
  });

  const hasConsent = cookieConsent === "accepted";

  // sets modal visible after timeout
  useEffect(() => {
    if (isVisible && h5pContainerRef.current && hasConsent) {
      h5pContainerRef.current.style.visibility = "visible";
    }
  }, [isVisible, hasConsent]);

  useEffect(() => {
    if (!hasConsent) return;

    const setup = async () => {
      if (h5pContainerRef.current) {
        // Wait for Service Worker to be ready before loading H5P
        // This ensures IndexedDB-based H5P files can be served
        try {
          await H5PIndexedDBServer.getInstance().init();
        } catch (error) {
          console.warn(
            "[PrimitiveH5PContent] Service Worker not available:",
            error,
          );
        }

        // Clear any existing H5P content first
        h5pContainerRef.current.innerHTML = "";

        const el = h5pContainerRef.current;

        await new H5PPlayer(el, createH5POptions(viewModel));

        // Load H5P polyfill for missing utility functions
        //@ts-ignore
        if (typeof H5P !== "undefined" && !H5P.isEmpty) {
          //@ts-ignore
          H5P.isEmpty = function (value) {
            if (value === null || value === undefined) return true;
            if (typeof value === "string") return value.trim() === "";
            if (Array.isArray(value)) return value.length === 0;
            if (typeof value === "object")
              return Object.keys(value).length === 0;
            return false;
          };
          //@ts-ignore
          H5P.trim = function (str) {
            return (str || "").trim();
          };
        }

        // FIX: Attach event listeners directly to the H5P instance instead of externalDispatcher
        // When using div (not iframe), H5P events don't bubble to externalDispatcher automatically
        //@ts-ignore
        if (
          //@ts-ignore
          typeof H5P !== "undefined" &&
          //@ts-ignore
          H5P.instances &&
          //@ts-ignore
          H5P.instances.length > 0
        ) {
          // Get the most recent instance (the one we just created)
          //@ts-ignore
          const instance = H5P.instances[H5P.instances.length - 1];

          // Attach xAPI event listener directly to the instance
          instance.on("xAPI", (event: any) => {
            controller.h5pEventCalled(event);
          });
        }
      }
    };
    setup();

    return () => {
      //@ts-ignore
      H5PIntegration.contents = {};
    };
  }, [viewModel, hasConsent, controller]);

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

        if (entry.contentRect) {
          lastRenderedWidth = Math.round(entry.contentRect.width);
        }
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

  if (!hasConsent) {
    return <CookieConsentBlocker controller={controller} />;
  }

  return (
    <div
      className="App max-h-[85vh] overflow-y-scroll"
      id="h5p-container"
      style={{ visibility: "hidden", width: "90vw" }}
      ref={h5pContainerRef}
      data-testid="primitiveH5pContent-testid"
    ></div>
  );
}
