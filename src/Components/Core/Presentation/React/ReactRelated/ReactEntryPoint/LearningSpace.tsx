import React from "react";
import BottomTooltip from "~ReactComponents/LearningSpaceDisplay/BottomTooltip/BottomTooltip";
import useIsMobilePortrait from "~ReactComponents/ReactRelated/CustomHooks/useIsMobilePortrait";
import LearningElementModal from "~ReactComponents/LearningSpaceDisplay/LearningElementModal/LearningElementModal";
import LearningSpaceNamePanel from "~ReactComponents/LearningSpaceDisplay/LearningSpaceNamePanel/LearningSpaceNamePanel";
import NotificationManager from "~ReactComponents/GeneralComponents/NotificationManager/NotificationManager";
import SideBar from "~ReactComponents/LearningSpaceDisplay/SideBar/SideBar";
import StyledModal from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledModal";
import ScorePanel from "~ReactComponents/LearningSpaceDisplay/ScorePanel/ScorePanel";
import BabylonCanvas from "../../../Babylon/SceneManagement/BabylonCanvas";
import LearningSpaceSceneDefinition from "../../../Babylon/SceneManagement/Scenes/LearningSpaceSceneDefinition";
import LearningSpaceCompletionModal from "~ReactComponents/LearningSpaceDisplay/LearningSpaceCompletionModal/LearningSpaceCompletionModal";
import ExitModal from "~ReactComponents/LearningSpaceDisplay/ExitModal/ExitModal";
import TutorialPdfButton from "~ReactComponents/GeneralComponents/Tutorial/TutorialPdfButton";

export default function LearningSpace() {
  return (
    <React.Fragment>
      <div className="grid h-0 min-h-screen grid-cols-9 grid-rows-6 root">
        <SideBar className="z-10 col-span-3 col-start-1 row-start-1 m-2 pointer-events-none" />
        <section className="fixed z-10 flex flex-row-reverse col-span-2 col-start-8 row-start-1 space-x-2 space-x-reverse right-2 top-2">
          <ScorePanel scoreType="world" />
          <ScorePanel scoreType="space" />
        </section>
        <LearningSpaceNamePanel className="z-10 col-span-5 col-start-3 row-start-1 pointer-events-none justify-self-center" />
        <BabylonCanvas
          sceneDefinitionType={LearningSpaceSceneDefinition}
          className="w-screen h-screen col-span-9 col-start-1 row-span-6 row-start-1"
          engineOptions={{ stencil: true }}
        />
        <BottomTooltip />
        <LearningElementModal className="z-10" />
        <ExitModal className="z-20" />
        <LearningSpaceCompletionModal className="z-10" />
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