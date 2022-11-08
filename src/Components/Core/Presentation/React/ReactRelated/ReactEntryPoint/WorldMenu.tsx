import React from "react";
import HeaderBar from "~ReactComponents/SpaceMenu/HeaderBar/HeaderBar";
import DetailSection from "~ReactComponents/SpaceMenu/DetailSection/DetailSection";
import SpaceSelection from "~ReactComponents/SpaceMenu/SpaceSelection/SpaceSelection";
import WorldCompletionModal from "~ReactComponents/SpaceMenu/WorldCompletionModal/WorldCompletionModal";
import MenuTutorial from "~ReactComponents/SpaceMenu/MenuTutorial/MenuTutorial";

export default function WorldMenu() {
  return (
    <React.Fragment>
      <div className="flex flex-col min-h-screen">
        <div>
          <WorldCompletionModal />
        </div>

        <div className="self-center w-full p-2 bg-adlerblue-100">
          <HeaderBar />
        </div>

        <div className="grid h-0 min-h-full grid-cols-2 grid-rows-1 grow lg:rounded-lg">
          <div className="flex justify-center col-start-1 p-2 border-r-2 lg:p-8 border-adlerdarkblue bg-adlergold">
            <SpaceSelection />
          </div>

          <div className="flex justify-center col-start-2 p-2 lg:p-8 bg-adlergold">
            <DetailSection />
          </div>
          <MenuTutorial />
        </div>
      </div>
    </React.Fragment>
  );
}
