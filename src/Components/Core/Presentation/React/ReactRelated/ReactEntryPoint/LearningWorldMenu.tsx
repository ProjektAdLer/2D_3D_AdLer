import React from "react";
import MenuHeaderBar from "~ReactComponents/GeneralComponents/MenuHeaderBar/MenuHeaderBar";
import LearningWorldDetail from "~ReactComponents/LearningWorldMenu/LearningWorldDetail/LearningWorldDetail";
import WorldSelection from "~ReactComponents/LearningWorldMenu/LearningWorldSelection/LearningWorldSelection";
import ReturnHomeModal from "~ReactComponents/LearningWorldMenu/ReturnHomeModal/ReturnHomeModal";

export default function LearningWorldMenu() {
  return (
    <div className="flex h-[100svh] flex-col overflow-hidden bg-gradient-to-br from-adlerbggradientfrom to-adlerbggradientto mobile-landscape:h-[100dvh] mobile-landscape:w-[100dvw] portrait:max-h-[100dvh]">
      <div className="order-2 grid grow grid-cols-2 grid-rows-1 lg:rounded-lg portrait:grid-cols-1 portrait:grid-rows-6 portrait:gap-4">
        <ReturnHomeModal />
        <WorldSelection className="col-start-1 m-2 rounded-lg p-2 lg:p-8 portrait:col-span-2 portrait:col-start-1 portrait:row-start-1 portrait:h-full portrait:overflow-auto" />
        <LearningWorldDetail className="col-start-2 flex p-2 lg:p-8 portrait:col-start-1 portrait:row-span-4 portrait:row-start-2" />
      </div>
      <MenuHeaderBar
        location="world"
        className="order-1 w-full self-center p-2 font-semibold"
      />
    </div>
  );
}
