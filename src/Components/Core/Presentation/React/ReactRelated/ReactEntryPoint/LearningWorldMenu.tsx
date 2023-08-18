import React from "react";
import MenuHeaderBar from "~ReactComponents/GeneralComponents/MenuHeaderBar/MenuHeaderBar";
import LearningWorldDetail from "~ReactComponents/LearningWorldMenu/LearningWorldDetail/LearningWorldDetail";
import LearningWorldSelection from "~ReactComponents/LearningWorldMenu/LearningWorldSelection/LearningWorldSelection";

export default function LearningWorldMenu() {
  return (
    <React.Fragment>
      <main className="flex flex-col h-[100svh] bg-gradient-to-br from-adlerbggradientfrom to-adlerbggradientto overflow-hidden">
        <section className="grid order-2 min-h-full grid-cols-2 grid-rows-1 portrait:grid-rows-[1fr, 2fr] portrait:grid-cols-1 portrait:overflow-auto grow portrait:grow-0 portrait:auto-rows-min lg:rounded-lg">
          <LearningWorldSelection className="col-start-1 portrait:col-start-1 portrait:row-start-1 p-2 m-2 rounded-lg lg:p-8 portrait:overflow-auto h-[90svh] portrait-h-[30svh]" />
          <LearningWorldDetail className="col-start-2 portrait:col-start-1 portrait:row-start-2 p-2 lg:p-8 rounded-lg m-2 portrait:h-[75svh] h-[90svh]" />
        </section>
        <MenuHeaderBar
          location="world"
          className="self-center order-1 w-full p-2 font-semibold"
        />
      </main>
    </React.Fragment>
  );
}
