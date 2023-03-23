import React from "react";
import BottomTooltip from "~ReactComponents/SpaceDisplay/BottomTooltip/BottomTooltip";
import useIsMobilePortrait from "~ReactComponents/ReactRelated/CustomHooks/useIsMobilePortrait";
import ElementModal from "~ReactComponents/SpaceDisplay/ElementModal/ElementModal";
import SpaceNamePanel from "~ReactComponents/SpaceDisplay/SpaceNamePanel/SpaceNamePanel";
import NotificationManager from "~ReactComponents/GeneralComponents/NotificationManager/NotificationManager";
import SideBar from "~ReactComponents/SpaceDisplay/SideBar/SideBar";
import StyledModal from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledModal";
import ScorePanel from "~ReactComponents/SpaceDisplay/ScorePanel/ScorePanel";
import BabylonCanvas from "../../../Babylon/SceneManagement/BabylonCanvas";
import SpaceSceneDefinition from "../../../Babylon/SceneManagement/Scenes/SpaceSceneDefinition";
import SpaceCompletionModal from "~ReactComponents/SpaceDisplay/SpaceCompletionModal/SpaceCompletionModal";
import UseGuide from "~ReactComponents/SpaceDisplay/UseGuide/UseGuide";
import ExitModal from "~ReactComponents/SpaceDisplay/ExitModal/ExitModal";
import TutorialPdfButton from "~ReactComponents/GeneralComponents/SpaceTutorial/TutorialPdfButton";

export default function Space() {
  return (
    <React.Fragment>
      <div className="grid h-0 min-h-screen grid-cols-9 grid-rows-6 root">
        <SideBar className="z-10 col-span-3 col-start-1 row-start-1 m-2 pointer-events-none" />
        <section className="z-10 flex flex-row-reverse col-span-2 col-start-8 row-start-1 space-x-2 space-x-reverse right-2 top-2">
          <ScorePanel scoreType="world" />
          <ScorePanel scoreType="space" />
        </section>
        <SpaceNamePanel className="z-10 col-span-5 col-start-3 row-start-1 pointer-events-none justify-self-center" />
        <BabylonCanvas
          sceneDefinitionType={SpaceSceneDefinition}
          className="w-screen h-screen col-span-9 col-start-1 row-span-6 row-start-1"
          engineOptions={{ stencil: true }}
        />
        <BottomTooltip />
        <ElementModal className="z-10" />
        <ExitModal className="z-20" />
        <SpaceCompletionModal className="z-10" />
        <StyledModal canClose={false} showModal={useIsMobilePortrait()}>
          <div className="text-lg font-bold text-adlerdarkblue">
            <h1>
              Die AdLer Engine ist für den<br></br>
              Landscape Modus konzipiert.<br></br>
              Bitte nimm dein Smartphone quer.<br></br>
              Danke!
            </h1>
          </div>
        </StyledModal>
        <TutorialPdfButton
          className="fixed z-20 left-2 bottom-2 max-h-3/4"
          pdfFileUrl={"/SampleLearningElementData/testPDF.pdf"}
        />
        {/* Der Error Manager sollte immer auf oberster Ebene sein, damit Error-Modals immer angezeigt werden */}
        {/* Generell sollten Modals immer direkt unter dem Error Manager sein */}
        <NotificationManager className="z-50" />
      </div>
    </React.Fragment>
  );
}
