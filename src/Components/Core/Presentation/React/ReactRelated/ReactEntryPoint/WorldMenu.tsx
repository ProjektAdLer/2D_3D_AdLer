import React from "react";
import MenuHeaderBar from "~ReactComponents/GeneralComponents/MenuHeaderBar/MenuHeaderBar";
import MenuTutorial from "~ReactComponents/SpaceMenu/MenuTutorial/MenuTutorial";
import WorldDetail from "~ReactComponents/WorldMenu/WorldDetail/WorldDetail";
import WorldSelection from "~ReactComponents/WorldMenu/WorldSelection/WorldSelection";
import useIsMobilePortrait from "../CustomHooks/useIsMobilePortrait";
import StyledModal from "../ReactBaseComponents/StyledModal";
import TutorialPdfButton from "~ReactComponents/GeneralComponents/SpaceTutorial/TutorialPdfButton";

export default function WorldMenu() {
  return (
    <React.Fragment>
      <main className="flex flex-col min-h-screen bg-gradient-to-br from-adlerbggradientfrom to-adlerbggradientto">
        <section className="grid order-2 h-0 min-h-full grid-cols-2 grid-rows-1 grow lg:rounded-lg">
          <WorldSelection className="col-start-1 p-2 border-r-2 border-dotted lg:p-8 border-adlerdarkblue" />
          <WorldDetail className="col-start-2 p-2 lg:p-8" />
        </section>
        <MenuHeaderBar className="self-center order-1 w-full p-2 font-semibold border-b-2 border-dotted border-adlerdarkblue" />
        <StyledModal canClose={false} showModal={useIsMobilePortrait()}>
          <div className="text-lg font-bold text-white text-shadow-sm">
            <p>
              Die AdLer Engine ist für den<br></br>
              Landscape Modus konzipiert.<br></br>
              Bitte nimm dein Smartphone quer.<br></br>
              Danke!
            </p>
          </div>
        </StyledModal>
      </main>
    </React.Fragment>
  );
}
