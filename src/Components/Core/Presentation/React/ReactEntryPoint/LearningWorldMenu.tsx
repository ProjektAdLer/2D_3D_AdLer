import React from "react";
import HeaderBar from "~ReactComponents/HeaderBar/HeaderBar";
import LearningRoomSelection from "~ReactComponents/LearningRoomSelection/LearningRoomSelection";

export default function LearningWorldMenu() {
  return (
    <React.Fragment>
      <div className="grid max-h-screen grid-cols-10 grid-rows-6 m-2 border-4 rounded-lg root bg-adlerlightblue border-adlerdarkblue">
        <div className="col-span-10 col-start-1 row-start-1 p-2 border-b-4 border-adlerdarkblue">
          <HeaderBar />
        </div>
        <div className="col-span-5 col-start-1 row-span-5 row-start-2 p-2 border-r-4 border-adlerdarkblue bg-green-50">
          <LearningRoomSelection />
        </div>
      </div>
    </React.Fragment>
  );
}
