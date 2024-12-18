import { useTranslation } from "react-i18next";
import ControlsExplanationContent from "~ReactComponents/GeneralComponents/ControlsExplanationModal/ControlsExplanationContent";

export default function LoadingScreenControlsExplanation() {
  const { t: translate } = useTranslation("learningSpace");

  return (
    <div className="row-span-4 w-[90vw] relative max-w-[80vw] portrait:h-[50vh] max-h-[45vh] bg-buttonbgblue p-4 rounded-xl overflow-y-auto">
      <h1 className="font-bold portrait:pb-6 text-adlerdarkblue">
        {translate("sidebar_controls")}
      </h1>
      <ControlsExplanationContent />
      <p className="w-full text-xs text-center absolute bottom-5">
        {translate("hint_controlsExplanationModal")}
      </p>
    </div>
  );
}
