import React from "react";
import MenuHeaderBar from "~ReactComponents/GeneralComponents/MenuHeaderBar/MenuHeaderBar";
import LearningWorldDetail from "~ReactComponents/LearningWorldMenu/LearningWorldDetail/LearningWorldDetail";
import WorldSelection from "~ReactComponents/LearningWorldMenu/LearningWorldSelection/LearningWorldSelection";
import ReturnHomeModal from "~ReactComponents/LearningWorldMenu/ReturnHomeModal/ReturnHomeModal";

export default function LearningWorldMenu() {
  return (
    <React.Fragment>
      <div className="flex flex-col h-[100svh] bg-gradient-to-br from-adlerbggradientfrom to-adlerbggradientto overflow-hidden">
        <div className="grid order-2 grid-cols-2 grid-rows-1 portrait:grid-cols-1 portrait:grid-rows-2 portrait:gap-4 grow lg:rounded-lg">
          {/* <main className="flex flex-col h-[100svh] bg-gradient-to-br from-adlerbggradientfrom to-adlerbggradientto overflow-hidden"> */}
          <ReturnHomeModal />
          {/* <section className="grid order-2 min-h-full grid-cols-2 grid-rows-1 portrait:grid-rows-[1fr, 2fr] portrait:grid-cols-1 portrait:overflow-auto grow portrait:grow-0 portrait:auto-rows-min lg:rounded-lg"> */}
          <WorldSelection className="col-start-1 portrait:col-start-1 portrait:row-start-1 p-2 m-2 rounded-lg lg:p-8 portrait:overflow-auto h-[90svh] portrait:h-[25svh]" />
          <LearningWorldDetail className="flex col-start-2 p-2 portrait:col-start-1 portrait:row-start-2 lg:p-8" />
        </div>
        {/* </section> */}
        <MenuHeaderBar
          location="world"
          className="self-center order-1 w-full p-2 font-semibold"
        />
      </div>
    </React.Fragment>
  );
}
