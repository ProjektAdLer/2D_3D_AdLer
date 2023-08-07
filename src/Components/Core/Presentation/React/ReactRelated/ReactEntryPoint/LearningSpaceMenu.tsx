import React from "react";
import MenuHeaderBar from "~ReactComponents/GeneralComponents/MenuHeaderBar/MenuHeaderBar";
import LearningSpaceDetail from "~ReactComponents/LearningSpaceMenu/LearningSpaceDetail/LearningSpaceDetail";
import LearningWorldCompletionModal from "~ReactComponents/LearningSpaceMenu/LearningWorldCompletionModal/LearningWorldCompletionModal";
import SpaceSelection from "~ReactComponents/LearningSpaceMenu/LearningSpaceSelection/LearningSpaceSelection";

export default function LearningSpaceMenu() {
  return (
    <React.Fragment>
      <div className="flex flex-col h-[100svh] bg-gradient-to-br from-adlerbggradientfrom to-adlerbggradientto overflow-hidden">
        <div className="grid order-2 grid-cols-2 grid-rows-1 grow lg:rounded-lg">
          <SpaceSelection className="col-start-1 p-2 border-r-2 border-dotted lg:pb-8 border-adlerdarkblue" />
          <LearningSpaceDetail className="flex col-start-2 p-2 lg:p-8" />
        </div>
        <MenuHeaderBar
          location="space"
          className="self-center order-1 w-full p-2 font-semibold border-b-2 border-dotted border-adlerdarkblue"
        />
      </div>
      <LearningWorldCompletionModal className="transition-opacity duration-100 ease-in delay-75" />
    </React.Fragment>
  );
}
