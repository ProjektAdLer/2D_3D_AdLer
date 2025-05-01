import { useTranslation } from "react-i18next";
import tailwindMerge from "../../../Utils/TailwindMerge";
import { AdLerUIComponent } from "src/Components/Core/Types/ReactTypes";

import leftClickIcon from "src/Assets/icons/left-click.svg";
import middleMouseIcon from "src/Assets/icons/middle-mouse-click.svg";
import middleMouseDragIcon from "src/Assets/icons/middle-mouse-click-and-drag.svg";
import touchIcon from "src/Assets/icons/touch.svg";
import touchDragIcon from "src/Assets/icons/touch-and-drag.svg";
import touchZoomIcon from "src/Assets/icons/touch-zoom.svg";
import hintIcon from "src/Assets/icons/hint.svg";

import LearningElementUnsolvedIcon from "src/Assets/icons/HighlightColors/LearningElementUnsolvedIcon.svg";
import LearningElementSolvedIcon from "src/Assets/icons/HighlightColors/LearningElementSolvedIcon.svg";
import NonLearningElementBaseIcon from "src/Assets/icons/HighlightColors/NonLearningElementBaseIcon.svg";

export default function ControlsExplanationContent({
  className,
}: AdLerUIComponent<{}>) {
  const { t: translate } = useTranslation("controls");
  return (
    <div
      className={tailwindMerge(
        className,
        "grid grid-rows-6 grid-flow-row gap-x-8 gap-y-3 pb-4 text-xs max-w-[85vw] mobile-landscape:justify-center mobile-landscape:grid-cols-1 mobile-landscape:grid-rows-auto mobile-landscape:grid-flow-row mobile-landscape:gap-y-3 mobile-landscape:pb-0 mobile-landscape:text-2xs mobile-landscape:gap-x-1 portrait:grid-flow-row portrait:grid-cols-1 portrait:grid-rows-auto portrait-gap-y-1 lg:text-sm xl:gap-2",
      )}
    >
      {/* Avatar Controls */}
      <h3 className="self-center font-bold text-adlerdarkblue">
        {translate("controlAvatar")}
      </h3>
      <div className="flex flex-row items-start justify-start gap-2">
        <img className="w-6" alt="Linksklick" src={leftClickIcon}></img>
        <p>{translate("controlAvatarMouse")}</p>
      </div>
      <div className="flex flex-row items-start justify-start gap-2">
        <img className="w-6" alt="Einfacher Touch" src={touchIcon}></img>
        <p>{translate("controlAvatarTouch")}</p>
      </div>
      <div className="flex flex-row items-start justify-start gap-2 portrait:pb-3 ">
        <img className="w-6" alt="Icon" src={hintIcon}></img>
        <p>{translate("controlAvatarHint")}</p>
      </div>

      {/* Open Content Controls */}
      <h3 className="self-center font-bold text-adlerdarkblue">
        {translate("openContent")}
      </h3>
      <div className="flex flex-row items-start justify-start gap-2">
        <img className="w-6" alt="Icon" src={leftClickIcon}></img>
        <p>{translate("openContentMouse")}</p>
      </div>
      <div className="flex flex-row items-start justify-start gap-2">
        <img className="w-6" alt="Icon" src={touchIcon}></img>
        <p>{translate("openContentTouch")}</p>
      </div>
      <div className="flex flex-row items-start justify-start gap-2 portrait:pb-3">
        <img className="w-6" alt="Icon" src={hintIcon}></img>
        <div className="flex flex-col gap-1">
          <p>{translate("openContentHint1")}</p>
          <p>{translate("openContentHint2")}</p>
        </div>
      </div>

      {/* Rotate Camera Controls */}
      <h3 className="self-center font-bold text-adlerdarkblue">
        {translate("rotateCamera")}
      </h3>
      <div className="flex flex-row items-start justify-start gap-2">
        <img className="w-6" alt="Icon" src={middleMouseDragIcon}></img>
        <p>{translate("rotateCameraMouse")}</p>
      </div>
      <div className="flex flex-row items-start justify-start gap-2">
        <img className="w-6" alt="Icon" src={touchDragIcon}></img>
        <p>{translate("rotateCameraTouch")}</p>
      </div>
      <div className="flex flex-row items-start justify-start gap-2 portrait:pb-3">
        <img className="w-6" alt="Icon" src={hintIcon}></img>
        <p>{translate("rotateCameraHint")}</p>
      </div>

      {/* Zoom Camera Controls */}
      <h3 className="self-center font-bold text-adlerdarkblue">
        {translate("zoomCamera")}
      </h3>
      <div className="flex flex-row items-start justify-start gap-2">
        <img className="w-6" alt="Icon" src={middleMouseIcon}></img>
        <p>{translate("zoomCameraMouse")}</p>
      </div>
      <div className="flex flex-row items-start justify-start gap-2">
        <img className="w-6" alt="Icon" src={touchZoomIcon}></img>
        <p>{translate("zoomCameraTouch")}</p>
      </div>
      <div className="flex flex-row items-start justify-start gap-2 portrait:pb-3">
        <img className="w-6" alt="Icon" src={hintIcon}></img>
        <p>{translate("zoomCameraHint")}</p>
      </div>

      {/* Highlight Colors */}
      <h3 className="self-center font-bold text-adlerdarkblue">
        {"Highlight Farben"}
      </h3>
      <div className="flex flex-row items-start justify-start gap-2">
        <img className="w-6" alt="Icon" src={LearningElementUnsolvedIcon}></img>
        <p>{translate("LearningElementUnsolvedIcon")}</p>
      </div>
      <div className="flex flex-row items-start justify-start gap-2">
        <img className="w-6" alt="Icon" src={LearningElementSolvedIcon}></img>
        <p>{translate("LearningElementSolvedIcon")}</p>
      </div>
      <div className="flex flex-row items-start justify-start gap-2">
        <img className="w-6" alt="Icon" src={NonLearningElementBaseIcon}></img>
        <p>{translate("NonLearningElementBaseIcon")}</p>
      </div>
      <div className="flex flex-row items-start justify-start gap-2">
        <img className="w-6" alt="Icon" src={hintIcon}></img>
        <p>{translate("HighlightHint")}</p>
      </div>
    </div>
  );
}
