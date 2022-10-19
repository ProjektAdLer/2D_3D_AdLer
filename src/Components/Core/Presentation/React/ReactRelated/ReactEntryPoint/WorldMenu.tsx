import React from "react";
import HeaderBar from "~ReactComponents/SpaceMenu/HeaderBar/HeaderBar";
import DetailSection from "~ReactComponents/SpaceMenu/DetailSection/DetailSection";
import SpaceSelection from "~ReactComponents/SpaceMenu/SpaceSelection/SpaceSelection";
import WorldCompletionModal from "~ReactComponents/SpaceMenu/WorldCompletionModal/WorldCompletionModal";

export default function WorldMenu() {
  return (
    <React.Fragment>
      <div>
        <WorldCompletionModal />
      </div>

      <div className="grid h-screen grid-cols-10 grid-rows-6 lg:rounded-lg root bg-adlerblue-100 border-adlerdarkblue">
        <div className="col-span-10 col-start-1 p-2 text-4xl border-b-2 border-adlerdarkblue">
          <HeaderBar />
        </div>
        <div className="flex justify-center col-span-5 col-start-1 row-start-2 row-span-5 p-8 border-r-2 border-adlerdarkblue bg-adlergold">
          <SpaceSelection />
        </div>
        <div className="flex justify-center col-span-5 col-start-6 row-start-2 row-span-5 p-8 bg-adlergold">
          <DetailSection />
        </div>
      </div>
    </React.Fragment>
  );
}
