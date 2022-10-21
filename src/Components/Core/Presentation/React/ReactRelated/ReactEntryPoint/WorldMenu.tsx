import React from "react";
import HeaderBar from "~ReactComponents/SpaceMenu/HeaderBar/HeaderBar";
import DetailSection from "~ReactComponents/SpaceMenu/DetailSection/DetailSection";
import SpaceSelection from "~ReactComponents/SpaceMenu/SpaceSelection/SpaceSelection";
import WorldCompletionModal from "~ReactComponents/SpaceMenu/WorldCompletionModal/WorldCompletionModal";

export default function WorldMenu() {
  return (
    <React.Fragment>
      <div className="max-h-screen">
        <div>
          <WorldCompletionModal />
        </div>

        <div className="self-center p-2 bg-adlerblue-100">
          <HeaderBar />
        </div>

        <div className="grid h-screen grid-cols-2 grid-rows-1 lg:rounded-lg">
          <div className="flex justify-center col-start-1 p-8 border-r-2 border-adlerdarkblue bg-adlergold">
            <SpaceSelection />
          </div>

          <div className="flex justify-center col-start-2 p-8 bg-adlergold">
            <DetailSection />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
