import React from "react";
import MenuHeaderBar from "~ReactComponents/GeneralComponents/MenuHeaderBar/MenuHeaderBar";
import LearningWorldDetail from "~ReactComponents/LearningWorldMenu/LearningWorldDetail/LearningWorldDetail";
import WorldSelection from "~ReactComponents/LearningWorldMenu/LearningWorldSelection/LearningWorldSelection";
import ReturnHomeModal from "~ReactComponents/LearningWorldMenu/ReturnHomeModal/ReturnHomeModal";

export default function LearningWorldMenu() {
  return (
    <div className="flex h-[100dvh] flex-col overflow-hidden bg-gradient-to-br from-adlerbggradientfrom to-adlerbggradientto mobile-landscape:h-[100dvh] mobile-landscape:w-[100dvw] portrait:h-[100dvh]">
      <MenuHeaderBar
        location="world"
        className="w-full flex-shrink-0 self-center p-2 font-semibold"
      />
      <div className="grid min-h-0 flex-1 grid-cols-[1fr_1fr] grid-rows-1 lg:rounded-lg mobile-landscape:overflow-hidden portrait:grid-cols-1 portrait:grid-rows-[1fr_2fr] portrait:gap-4">
        <ReturnHomeModal />
        <WorldSelection className="col-start-1 m-2 rounded-lg p-2 lg:p-8 mobile-landscape:max-h-full mobile-landscape:overflow-auto portrait:col-span-1 portrait:col-start-1 portrait:row-start-1 portrait:overflow-auto" />
        <LearningWorldDetail className="col-start-2 flex p-2 lg:p-8 mobile-landscape:min-h-0 mobile-landscape:overflow-hidden portrait:col-start-1 portrait:row-start-2 portrait:min-h-0 portrait:overflow-hidden" />
      </div>
    </div>
  );
}
