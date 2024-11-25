import { useTranslation } from "react-i18next";
import ControlsExplanationContent from "~ReactComponents/GeneralComponents/ControlsExplanationModal/ControlsExplanationContent";

export default function LoadingScreenControlsExplanation() {
  const { t: translate } = useTranslation("learningSpace");

  return (
    <div className="row-span-4 w-[85vw] max-w-6xl portrait:h-[50vh] bg-buttonbgblue p-4 rounded-xl overflow-y-auto">
      <h1 className="font-bold portrait:pb-6 text-adlerdarkblue">
        {translate("sidebar_controls")}
      </h1>
      <ControlsExplanationContent />
      <p className="w-full text-xs text-center">
        {translate("hint_controlsExplanationModal")}
      </p>
    </div>
  );
}
