import React from "react";
import MenuHeaderBar from "~ReactComponents/GeneralComponents/MenuHeaderBar/MenuHeaderBar";
import SpaceDetail from "~ReactComponents/SpaceMenu/SpaceDetail/SpaceDetail";
import WorldCompletionModal from "~ReactComponents/SpaceMenu/WorldCompletionModal/WorldCompletionModal";
import MenuTutorial from "~ReactComponents/SpaceMenu/MenuTutorial/MenuTutorial";
import SpaceSelection from "~ReactComponents/SpaceMenu/SpaceSelection/SpaceSelection";
import StyledModal from "../ReactBaseComponents/StyledModal";
import useIsMobilePortrait from "../CustomHooks/useIsMobilePortrait";
import TutorialPdfButton from "~ReactComponents/GeneralComponents/SpaceTutorial/TutorialPdfButton";

export default function SpaceMenu() {
  return (
    <React.Fragment>
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#a1c8e5] to-[#e2eaf2]">
        <MenuHeaderBar className="self-center w-full p-2 font-semibold border-b-2 border-dotted border-adlerdarkblue" />

        <div className="grid h-0 min-h-full grid-cols-2 grid-rows-1 grow lg:rounded-lg">
          <div className="flex justify-center col-start-1 p-2 border-r-2 border-dotted lg:pb-8 border-adlerdarkblue">
            <SpaceSelection />
          </div>

          <div className="flex justify-center col-start-2 p-2 lg:p-8">
            <SpaceDetail />
          </div>
          <TutorialPdfButton
            className="fixed right-2 top-2"
            pdfFileUrl={"/SampleLearningElementData/testPDF.pdf"}
          />
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
      </div>
    </React.Fragment>
  );
}
