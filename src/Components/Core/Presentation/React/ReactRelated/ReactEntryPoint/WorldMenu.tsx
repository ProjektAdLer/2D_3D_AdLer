import React from "react";
import MenuHeaderBar from "~ReactComponents/GeneralComponents/MenuHeaderBar/MenuHeaderBar";
import MenuTutorial from "~ReactComponents/SpaceMenu/MenuTutorial/MenuTutorial";
import WorldDetail from "~ReactComponents/WorldMenu/WorldDetail/WorldDetail";
import WorldSelection from "~ReactComponents/WorldMenu/WorldSelection/WorldSelection";
import useIsMobilePortrait from "../CustomHooks/useIsMobilePortrait";
import StyledModal from "../ReactBaseComponents/StyledModal";

export default function WorldMenu() {
  return (
    <React.Fragment>
      <div className="flex flex-col min-h-screen">
        <div className="self-center w-full p-2 bg-adlerblue-100">
          <MenuHeaderBar />
        </div>

        <div className="grid h-0 min-h-full grid-cols-2 grid-rows-1 grow lg:rounded-lg">
          <div className="flex justify-center col-start-1 p-2 border-r-2 lg:p-8 border-adlerdarkblue bg-adlergold">
            <WorldSelection />
          </div>

          <div className="flex justify-center col-start-2 p-2 lg:p-8 bg-adlergold">
            <WorldDetail />
          </div>
          <MenuTutorial />
        </div>
        <StyledModal canClose={false} showModal={useIsMobilePortrait()}>
          <div className="text-lg font-bold text-white text-shadow-sm">
            <h1>
              Die AdLer Engine ist für den<br></br>
              Landscape Modus konzipiert.<br></br>
              Bitte nimm dein Smartphone quer.<br></br>
              Danke!
            </h1>
          </div>
        </StyledModal>
      </div>
    </React.Fragment>
  );
}
