import { useTranslation } from "react-i18next";
import tailwindMerge from "../../../Utils/TailwindMerge";
import { AdLerUIComponent } from "src/Components/Core/Types/ReactTypes";

export default function ControlsExplanationContent({
  className,
}: AdLerUIComponent<{}>) {
  const { t: translate } = useTranslation("controls");
  return (
    <div
      className={tailwindMerge(
        className,
        "grid grid-cols-4 portrait:grid-cols-1 gap-8 pb-4 text-xs lg:text-sm overflow-y-auto"
      )}
    >
      {/* Avatar Controls */}
      <div className="flex flex-col gap-4">
        <h3 className="font-bold">{translate("controlAvatar")}</h3>
        <div className="flex flex-row gap-2">
          <img className="w-6" alt="Icon"></img>
          <p>{translate("controlAvatarMouse")}</p>
        </div>
        <div className="flex flex-row gap-2">
          <img className="w-6" alt="Icon"></img>
          <p>{translate("controlAvatarTouch")}</p>
        </div>
        <div className="flex flex-row gap-2">
          <img className="w-6" alt="Icon"></img>
          <p>{translate("controlAvatarHint")}</p>
        </div>
      </div>

      {/* Open Content Controls */}
      <div className="flex flex-col gap-4">
        <h3 className="font-bold">{translate("openContent")}</h3>
        <div className="flex flex-row gap-2">
          <img className="w-6" alt="Icon"></img>
          <p>{translate("openContentMouse")}</p>
        </div>
        <div className="flex flex-row gap-2">
          <img className="w-6" alt="Icon"></img>
          <p>{translate("openContentTouch")}</p>
        </div>
        <div className="flex flex-row gap-2">
          <img className="w-6" alt="Icon"></img>
          <div className="flex flex-col gap-1">
            <p>{translate("openContentHint1")}</p>
            <p>{translate("openContentHint2")}</p>
          </div>
        </div>
      </div>

      {/* Rotate Camera Controls */}
      <div className="flex flex-col gap-4">
        <h3 className="font-bold">{translate("rotateCamera")}</h3>
        <div className="flex flex-row gap-2">
          <img className="w-6" alt="Icon"></img>
          <p>{translate("rotateCameraMouse")}</p>
        </div>
        <div className="flex flex-row gap-2">
          <img className="w-6" alt="Icon"></img>
          <p>{translate("rotateCameraTouch")}</p>
        </div>
        <div className="flex flex-row gap-2">
          <img className="w-6" alt="Icon"></img>
          <p>{translate("rotateCameraHint")}</p>
        </div>
      </div>

      {/* Zoom Camera Controls */}
      <div className="flex flex-col gap-4">
        <h3 className="font-bold">{translate("zoomCamera")}</h3>
        <div className="flex flex-row gap-2">
          <img className="w-6" alt="Icon"></img>
          <p>{translate("zoomCameraMouse")}</p>
        </div>
        <div className="flex flex-row gap-2">
          <img className="w-6" alt="Icon"></img>
          <p>{translate("zoomCameraTouch")}</p>
        </div>
        <div className="flex flex-row gap-2">
          <img className="w-6" alt="Icon"></img>
          <p>{translate("zoomCameraHint")}</p>
        </div>
      </div>
    </div>
  );
}
