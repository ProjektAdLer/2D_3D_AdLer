import { useTranslation } from "react-i18next";
import ControlsExplanationContent from "~ReactComponents/GeneralComponents/ControlsExplanationModal/ControlsExplanationContent";

export default function LoadingScreenControlsExplanation() {
  const { t: translate } = useTranslation("learningSpace");

  return (
    <div className="row-span-4 flex max-h-[45vh] w-[90vw] max-w-[90vw] flex-col overflow-y-auto overflow-x-hidden rounded-xl bg-buttonbgblue p-4 lg:max-h-[60vh] xl:max-h-[50vh] mobile-portrait:h-[60vh] mobile-portrait:max-h-[65vh] portrait:h-[50vh]">
      <h1 className="flex-shrink-0 font-bold text-adlerdarkblue portrait:pb-6">
        {translate("sidebar_controls")}
      </h1>

      <div className="flex min-h-0 flex-1 flex-col">
        <div className="flex-1 overflow-y-auto pb-4">
          <ControlsExplanationContent />
        </div>

        <div className="flex-shrink-0 border-t border-adlerdarkblue/20 pt-4">
          <p className="w-full text-center text-xs font-bold text-adlerdarkblue mobile-landscape:text-2xs portrait:text-2xs">
            {translate("hint_controlsExplanationModal")}
          </p>
        </div>
      </div>
    </div>
  );
}
