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
        "max-w-[85vw] pb-4 text-xs lg:text-sm mobile-landscape:text-2xs portrait:text-xs",
      )}
    >
      <div className="space-y-6 mobile-landscape:space-y-4 portrait:space-y-4">
        {/* Avatar Controls */}
        <section className="space-y-3 mobile-landscape:space-y-2 portrait:space-y-2">
          <h3 className="font-bold text-adlerdarkblue">
            {translate("controlAvatar")}
          </h3>
          <div className="flex flex-row items-start justify-start gap-2">
            <img
              className="w-6 flex-shrink-0"
              alt="Linksklick"
              src={leftClickIcon}
            ></img>
            <p>{translate("controlAvatarMouse")}</p>
          </div>
          <div className="flex flex-row items-start justify-start gap-2">
            <img
              className="w-6 flex-shrink-0"
              alt="Einfacher Touch"
              src={touchIcon}
            ></img>
            <p>{translate("controlAvatarTouch")}</p>
          </div>
          <div className="flex flex-row items-start justify-start gap-2">
            <img className="w-6 flex-shrink-0" alt="Icon" src={hintIcon}></img>
            <p>{translate("controlAvatarHint")}</p>
          </div>
        </section>

        {/* Open Content Controls */}
        <section className="space-y-3 mobile-landscape:space-y-2 portrait:space-y-2">
          <h3 className="font-bold text-adlerdarkblue">
            {translate("openContent")}
          </h3>
          <div className="flex flex-row items-start justify-start gap-2">
            <img
              className="w-6 flex-shrink-0"
              alt="Icon"
              src={leftClickIcon}
            ></img>
            <p>{translate("openContentMouse")}</p>
          </div>
          <div className="flex flex-row items-start justify-start gap-2">
            <img
              className="w-6 flex-shrink-0"
              alt="Icon"
              src={leftClickIcon}
            ></img>
            <p>{translate("openContentMouseDouble")}</p>
          </div>
          <div className="flex flex-row items-start justify-start gap-2">
            <img className="w-6 flex-shrink-0" alt="Icon" src={touchIcon}></img>
            <p>{translate("openContentTouch")}</p>
          </div>
          <div className="flex flex-row items-start justify-start gap-2">
            <img className="w-6 flex-shrink-0" alt="Icon" src={hintIcon}></img>
            <div className="flex flex-col gap-1">
              <p>{translate("openContentHint1")}</p>
              <p>{translate("openContentHint2")}</p>
            </div>
          </div>
        </section>

        {/* Rotate Camera Controls */}
        <section className="space-y-3 mobile-landscape:space-y-2 portrait:space-y-2">
          <h3 className="font-bold text-adlerdarkblue">
            {translate("rotateCamera")}
          </h3>
          <div className="flex flex-row items-start justify-start gap-2">
            <img
              className="w-6 flex-shrink-0"
              alt="Icon"
              src={middleMouseDragIcon}
            ></img>
            <p>{translate("rotateCameraMouse")}</p>
          </div>
          <div className="flex flex-row items-start justify-start gap-2">
            <img
              className="w-6 flex-shrink-0"
              alt="Icon"
              src={touchDragIcon}
            ></img>
            <p>{translate("rotateCameraTouch")}</p>
          </div>
          <div className="flex flex-row items-start justify-start gap-2">
            <img className="w-6 flex-shrink-0" alt="Icon" src={hintIcon}></img>
            <p>{translate("rotateCameraHint")}</p>
          </div>
        </section>

        {/* Zoom Camera Controls */}
        <section className="space-y-3 mobile-landscape:space-y-2 portrait:space-y-2">
          <h3 className="font-bold text-adlerdarkblue">
            {translate("zoomCamera")}
          </h3>
          <div className="flex flex-row items-start justify-start gap-2">
            <img
              className="w-6 flex-shrink-0"
              alt="Icon"
              src={middleMouseIcon}
            ></img>
            <p>{translate("zoomCameraMouse")}</p>
          </div>
          <div className="flex flex-row items-start justify-start gap-2">
            <img
              className="w-6 flex-shrink-0"
              alt="Icon"
              src={touchZoomIcon}
            ></img>
            <p>{translate("zoomCameraTouch")}</p>
          </div>
          <div className="flex flex-row items-start justify-start gap-2">
            <img className="w-6 flex-shrink-0" alt="Icon" src={hintIcon}></img>
            <p>{translate("zoomCameraHint")}</p>
          </div>
        </section>

        {/* Highlight Colors */}
        <section className="space-y-3 mobile-landscape:space-y-2 portrait:space-y-2">
          <h3 className="font-bold text-adlerdarkblue">{"Highlight Farben"}</h3>
          <div className="flex flex-row items-start justify-start gap-2">
            <img
              className="w-6 flex-shrink-0"
              alt="Icon"
              src={LearningElementUnsolvedIcon}
            ></img>
            <p>{translate("LearningElementUnsolvedIcon")}</p>
          </div>
          <div className="flex flex-row items-start justify-start gap-2">
            <img
              className="w-6 flex-shrink-0"
              alt="Icon"
              src={LearningElementSolvedIcon}
            ></img>
            <p>{translate("LearningElementSolvedIcon")}</p>
          </div>
          <div className="flex flex-row items-start justify-start gap-2">
            <img
              className="w-6 flex-shrink-0"
              alt="Icon"
              src={NonLearningElementBaseIcon}
            ></img>
            <p>{translate("NonLearningElementBaseIcon")}</p>
          </div>
          <div className="flex flex-row items-start justify-start gap-2">
            <img className="w-6 flex-shrink-0" alt="Icon" src={hintIcon}></img>
            <p>{translate("HighlightHint")}</p>
          </div>
        </section>
      </div>
    </div>
  );
}
