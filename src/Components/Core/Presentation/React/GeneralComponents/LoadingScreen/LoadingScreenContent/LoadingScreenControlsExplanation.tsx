import { useTranslation } from "react-i18next";
import ControlsExplanationContent from "~ReactComponents/GeneralComponents/ControlsExplanationModal/ControlsExplanationContent";

export default function LoadingScreenControlsExplanation() {
  const { t: translate } = useTranslation("learningSpace");

  return (
    <div className="row-span-4 flex flex-col w-[90vw] max-w-[90vw] portrait:h-[50vh] lg:max-h-[60vh] xl:max-h-[50vh] max-h-[45vh] mobile-portrait:h-[60vh] mobile-portrait:max-h-[65vh] bg-buttonbgblue p-4 rounded-xl overflow-y-auto overflow-x-hidden">
      <h1 className="font-bold portrait:pb-6 text-adlerdarkblue">
        {translate("sidebar_controls")}
      </h1>
      <div className="flex flex-col">
        <ControlsExplanationContent />
        <div className="relative mobile-portrait:pt-12 mobile-landscape:pt-10">
          <p className="w-full text-xs font-bold text-center absolute bottom-5 mobile-landscape:text-2xs mobile-landscape:bottom-1 portrait:bottom-1 text-adlerdarkblue">
            {translate("hint_controlsExplanationModal")}
          </p>
        </div>
      </div>
    </div>
  );
}
