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

export default function ControlsExplanationContent({
  className,
}: AdLerUIComponent<{}>) {
  const { t: translate } = useTranslation("controls");
  return (
    <div
      className={tailwindMerge(
        className,
        "grid landscape:grid-rows-6 landscape:grid-flow-col portrait:grid-flow-row portrait:grid-cols-1 portrait:grid-rows-auto gap-x-8 landscape:gap-y-3 portrait:gap-6 pb-4 text-xs lg:text-sm ",
      )}
    >
      {/* Avatar Controls */}
        <h3 className="font-bold self-center text-adlerdarkblue">{translate("controlAvatar")}</h3>
        <div className="min-h-10 portrait:min-h-0 flex flex-row gap-2 justify-start items-start">
          <img className="w-6" alt="Linksklick" src={leftClickIcon}></img>
          <p>{translate("controlAvatarMouse")}</p>
        </div>
        <div className="flex flex-row gap-2 justify-start items-start">
          <img className="w-6" alt="Einfacher Touch" src={touchIcon}></img>
          <p>{translate("controlAvatarTouch")}</p>
        </div>
        <div className="landscape:row-span-3 flex flex-row gap-2 justify-start items-start portrait:pb-6">
          <img className="w-6" alt="Icon" src={hintIcon}></img>
          <p>{translate("controlAvatarHint")}</p>
        </div>

      {/* Open Content Controls */}
        <h3 className="font-bold  self-center text-adlerdarkblue">{translate("openContent")}</h3>
        <div className="min-h-10 portrait:min-h-0 flex flex-row gap-2 justify-start items-start">
          <img className="w-6" alt="Icon" src={leftClickIcon}></img>
          <p>{translate("openContentMouse")}</p>
        </div>
        <div className="flex flex-row gap-2 justify-start items-start">
          <img className="w-6" alt="Icon" src={touchIcon}></img>
          <p>{translate("openContentTouch")}</p>
        </div>
        <div className="landscape:row-span-3 flex flex-row gap-2 justify-start items-start portrait:pb-6">
          <img className="w-6" alt="Icon" src={hintIcon}></img>
          <div className="flex flex-col gap-1">
            <p>{translate("openContentHint1")}</p>
            <p>{translate("openContentHint2")}</p>
          </div>
        </div>

      {/* Rotate Camera Controls */}
        <h3 className="font-bold  self-center text-adlerdarkblue">{translate("rotateCamera")}</h3>
        <div className="min-h-10 portrait:min-h-0 flex flex-row gap-2 justify-start items-start">
          <img className="w-6" alt="Icon" src={middleMouseDragIcon}></img>
          <p>{translate("rotateCameraMouse")}</p>
        </div>
        <div className="flex flex-row gap-2 justify-start items-start">
          <img className="w-6" alt="Icon" src={touchDragIcon}></img>
          <p>{translate("rotateCameraTouch")}</p>
        </div>
        <div className="landscape:row-span-3 flex flex-row gap-2 justify-start items-start portrait:pb-6">
          <img className="w-6" alt="Icon" src={hintIcon}></img>
          <p>{translate("rotateCameraHint")}</p>
        </div>

      {/* Zoom Camera Controls */}
        <h3 className="font-bold  self-center text-adlerdarkblue">{translate("zoomCamera")}</h3>
        <div className="min-h-10 portrait:min-h-0 flex flex-row gap-2 justify-start items-start">
          <img className="w-6" alt="Icon" src={middleMouseIcon}></img>
          <p>{translate("zoomCameraMouse")}</p>
        </div>
        <div className="flex flex-row gap-2 justify-start items-start">
          <img className="w-6" alt="Icon" src={touchZoomIcon}></img>
          <p>{translate("zoomCameraTouch")}</p>
        </div>
        <div className="landscape:row-span-3 flex flex-row gap-2 justify-start items-start portrait:pb-6">
          <img className="w-6" alt="Icon" src={hintIcon}></img>
          <p>{translate("zoomCameraHint")}</p>
        </div>
    </div>
  );
}