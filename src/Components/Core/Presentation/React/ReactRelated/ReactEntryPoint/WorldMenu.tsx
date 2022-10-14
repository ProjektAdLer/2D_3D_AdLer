import React from "react";
import HeaderBar from "~ReactComponents/SpaceMenu/HeaderBar/HeaderBar";
import DetailSection from "~ReactComponents/SpaceMenu/DetailSection/DetailSection";
import SpaceSelection from "~ReactComponents/SpaceMenu/SpaceSelection/SpaceSelection";
import WorldCompletionModal from "~ReactComponents/SpaceMenu/WorldCompletionModal/WorldCompletionModal";

export default function WorldMenu() {
  return (
    <React.Fragment>
      <div className="grid h-[90vh] max-h-screen grid-cols-10 grid-rows-24 m-6 border-8 rounded-lg root bg-adlerblue-100 border-adlerdarkblue">
        <div className="col-span-10 col-start-1 row-span-3 row-start-1 p-2 text-4xl border-b-8 border-adlerdarkblue">
          <HeaderBar />
        </div>
        <div className="flex justify-center col-span-5 col-start-1 row-start-4 p-8 border-r-8 row-span-full border-adlerdarkblue bg-adlergold">
          <SpaceSelection />
        </div>
        <div className="flex justify-center col-span-5 col-start-6 row-start-4 p-8 row-span-full bg-adlergold">
          <DetailSection />
        </div>
        {
          <div>
            <WorldCompletionModal />
          </div>
        }
      </div>
    </React.Fragment>
  );
}
