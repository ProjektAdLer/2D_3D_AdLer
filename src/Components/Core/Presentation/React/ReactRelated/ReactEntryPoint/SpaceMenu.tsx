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
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-adlerbggradientfrom to-adlerbggradientto">
        <div className="grid order-2 h-0 min-h-full grid-cols-2 grid-rows-1 grow lg:rounded-lg">
          <SpaceSelection className="col-start-1 p-2 border-r-2 border-dotted lg:pb-8 border-adlerdarkblue" />
          <SpaceDetail className="flex col-start-2 p-2 lg:p-8" />
        </div>
        <MenuHeaderBar className="self-center order-1 w-full p-2 font-semibold border-b-2 border-dotted border-adlerdarkblue" />
      </div>
      <WorldCompletionModal className="transition-opacity duration-100 ease-in delay-75" />
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
    </React.Fragment>
  );
}
