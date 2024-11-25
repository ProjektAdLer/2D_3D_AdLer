import React from "react";
import MenuHeaderBar from "~ReactComponents/GeneralComponents/MenuHeaderBar/MenuHeaderBar";
import LearningWorldDetail from "~ReactComponents/LearningWorldMenu/LearningWorldDetail/LearningWorldDetail";
import WorldSelection from "~ReactComponents/LearningWorldMenu/LearningWorldSelection/LearningWorldSelection";
import ReturnHomeModal from "~ReactComponents/LearningWorldMenu/ReturnHomeModal/ReturnHomeModal";

export default function LearningWorldMenu() {
  return (
    <div className="flex flex-col h-[100svh] bg-gradient-to-br from-adlerbggradientfrom to-adlerbggradientto overflow-hidden">
      <div className="grid order-2 grid-cols-2 grid-rows-1 portrait:grid-cols-1 portrait:grid-rows-2 portrait:gap-4 grow lg:rounded-lg">
        <ReturnHomeModal />
        <WorldSelection className="col-start-1 portrait:col-start-1 portrait:row-start-1 p-2 m-2 rounded-lg lg:p-8 portrait:overflow-auto h-[90svh] portrait:h-[45svh]" />
        <LearningWorldDetail className="flex col-start-2 p-2 portrait:col-start-1 portrait:row-start-2 lg:p-8" />
      </div>
      <MenuHeaderBar
        location="world"
        className="self-center order-1 w-full p-2 font-semibold"
      />
    </div>
  );
}
