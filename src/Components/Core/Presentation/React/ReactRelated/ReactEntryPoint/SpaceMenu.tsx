import React from "react";
import MenuHeaderBar from "~ReactComponents/GeneralComponents/MenuHeaderBar/MenuHeaderBar";
import SpaceDetail from "~ReactComponents/SpaceMenu/SpaceDetail/SpaceDetail";
import WorldCompletionModal from "~ReactComponents/SpaceMenu/WorldCompletionModal/WorldCompletionModal";
import MenuTutorial from "~ReactComponents/SpaceMenu/MenuTutorial/MenuTutorial";
import SpaceSelection from "~ReactComponents/SpaceMenu/SpaceSelection/SpaceSelection";
import StyledModal from "../ReactBaseComponents/StyledModal";
import useIsMobilePortrait from "../CustomHooks/useIsMobilePortrait";

export default function SpaceMenu() {
  return (
    <React.Fragment>
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#a1c8e5] to-[#e2eaf2]">
        <div>
          <WorldCompletionModal />
        </div>

        <div className="self-center w-full p-2">
          <MenuHeaderBar />
        </div>

        <div className="grid h-0 min-h-full grid-cols-2 grid-rows-1 grow lg:rounded-lg">
          <div className="flex justify-center col-start-1 p-2 border-r-2 lg:p-8 border-adlerdarkblue">
            <SpaceSelection />
          </div>

          <div className="flex justify-center col-start-2 p-2 lg:p-8">
            <SpaceDetail />
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
