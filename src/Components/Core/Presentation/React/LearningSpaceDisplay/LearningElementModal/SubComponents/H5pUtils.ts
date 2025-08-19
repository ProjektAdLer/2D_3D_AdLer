import LearningElementModalViewModel from "../LearningElementModalViewModel";
import { config } from "../../../../../../../config";
import { RefObject } from "react";

export function createH5POptions(viewModel: LearningElementModalViewModel) {
  let h5pJsonPath: string;
  const filePath = viewModel.filePath.Value;

  if (config.useFakeBackend) {
    // Für das Mock-Backend: extrahiere nur den Pfad-Teil der URL
    if (filePath.startsWith("http://") || filePath.startsWith("https://")) {
      // Extrahiere den Pfad aus der vollständigen URL
      const url = new URL(filePath);
      h5pJsonPath = url.pathname; // z.B. "/2D_3D_AdLer/SampleLearningElementData/MultipleChoiceDemo"
    } else {
      // Fallback für relative Pfade
      const currentPath = window.location.pathname;
      const publicUrl = currentPath.startsWith("/2D_3D_AdLer")
        ? "/2D_3D_AdLer"
        : "";
      h5pJsonPath = publicUrl + filePath.replaceAll("\\", "/");
    }
  } else {
    // Für das echte Backend verwenden wir die Server-URL
    let baseURL = config.serverURL.replace(/api\/?$/, "");
    h5pJsonPath =
      baseURL + filePath.replaceAll("\\", "/").replaceAll("wwwroot/", "");
  }

  const options = {
    h5pJsonPath: h5pJsonPath,
    frameJs: "/2D_3D_AdLer/h5pBase/frame.bundle.js",
    frameCss: "/2D_3D_AdLer/h5pBase/styles/h5p.css",
  };
  return options;
}

export function getH5PDivs(
  reference: RefObject<HTMLDivElement>,
): { ref: HTMLDivElement; div: HTMLDivElement } | null {
  const iframeWrapper = document.getElementsByClassName(
    "h5p-iframe-wrapper",
  ) as HTMLCollection;

  if (iframeWrapper.length === 0) {
    return null;
  }
  const ref = iframeWrapper[0] as HTMLDivElement;
  if (!reference.current) {
    return null;
  }
  const h5pDiv = reference.current;
  return {
    ref: ref,
    div: h5pDiv,
  };
}

export function getH5PContentSizeDecision(
  reference: RefObject<HTMLDivElement>,
  entry: ResizeObserverEntry,
  lastRenderedWidth: number,
): {
  resetContent: boolean;
  shrinkContent: boolean;
} {
  const result = getH5PDivs(reference);

  if (result === null) {
    return {
      resetContent: false,
      shrinkContent: false,
    };
  }

  const targetViewPort = {
    height: window.innerHeight,
    width: window.innerWidth,
    ratio: window.innerWidth / window.innerHeight,
  };
  const ref = result.ref;

  const shouldResetContentToFullWidth = (): boolean => {
    // added buffer to avoid cyclical shrinking and reseting to full width
    return (
      Math.round(targetViewPort.width * 0.8) > entry.contentRect.width &&
      Math.round(targetViewPort.height * 0.75) > entry.contentRect.height &&
      lastRenderedWidth !== 0 &&
      lastRenderedWidth === Math.round(entry.contentRect.width)
    );
  };

  const shouldShrinkContent = (): boolean => {
    return (
      Math.round(ref.clientHeight) > Math.round(entry.contentRect.height) &&
      lastRenderedWidth !== 0 &&
      lastRenderedWidth === Math.round(entry.contentRect.width)
    );
  };

  return {
    resetContent: shouldResetContentToFullWidth(),
    shrinkContent: shouldShrinkContent(),
  };
}

export function shrinkH5PElement(
  reference: RefObject<HTMLDivElement>,
  dimensions: {
    contentWidth: number;
    contentHeight: number;
    refWidth: number;
    refHeight: number;
  },
) {
  const result = getH5PDivs(reference);
  if (result) {
    const div = result.div;
    const targetViewPort = {
      height: window.innerHeight,
      width: window.innerWidth,
      ratio: window.innerWidth / window.innerHeight,
    };
    const maxModalHeight = Math.round(targetViewPort.height * 0.85);
    const diff = dimensions.refHeight - maxModalHeight;
    const ratio = dimensions.refWidth / dimensions.refHeight;
    // added buffer to shrinked content as precaution if small ui elements spawn above/below h5p-content
    const percent =
      (ratio * (dimensions.contentHeight - 30)) / targetViewPort.width;
    let offset = 0;
    if (div.style.width.includes("90")) {
      offset = 5;
    }
    const vw = Math.floor(percent * 100);
    const vwMod = vw - offset;
    if (diff > 0) {
      // only modify width if more than half of viewport width will be used
      if (vwMod > 50) {
        div.style.width = vwMod + "vw";
      } else {
        div.style.width = "90vw";
      }
    }
    window.dispatchEvent(new Event("resize"));
  }
}
