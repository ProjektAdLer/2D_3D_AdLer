import BabylonCanvas from "./BabylonCanvas";
import "./App.css";
import ScorePanel from "../ScorePanel/ScorePanel";
import LearningElementModal from "../LearningElementModal/LearningElementModal";
import useIsMobilePortrait from "../CustomHooks/useIsMobilePortrait";
import StyledModal from "../ReactBaseComponents/StyledModal";
import React from "react";
import LogoMenuBar from "~ReactComponents/ReactAdvancedComponents/LogoMenuBar";
import LearningElementsDropdown from "../LearningElementsDropdown/LearningElementsDropdown";
import ModalManager from "../ModalManager/ModalManager";
import MoodleLoginForm from "../MoodleLoginForm/MoodleLoginForm";
import BottomTooltip from "../BottomTooltip/BottomTooltip";
import LearningWorldNamePanel from "~ReactComponents/LearningWorldNamePanel/LearningWorldNamePanel";

function App() {
  return (
    <React.Fragment>
      <div className="grid max-h-screen grid-cols-9 grid-rows-6 root">
        <div className="z-10 col-start-1 row-start-1 m-2">
          <LogoMenuBar />
        </div>
        <div className="z-10 col-span-2 col-start-2 row-start-1 m-2">
          <LearningElementsDropdown />
        </div>
        <div className="z-10 col-span-2 col-start-9 row-start-1">
          <ScorePanel />
        </div>
        <div className="z-10 col-span-5 col-start-3 row-start-1">
          <LearningWorldNamePanel />
        </div>
        <div className="col-span-9 col-start-1 row-span-6 row-start-1">
          <BabylonCanvas className="w-screen h-screen" />
        </div>
        <div className="z-10 col-span-3 col-start-4 row-start-6">
          <BottomTooltip />
        </div>
        <div className="z-10">
          <LearningElementModal />
        </div>
        <div className="z-10">
          <MoodleLoginForm />
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
        {/* Der Error Manager sollte immer auf oberster Ebene sein, damit Error-Modals immer angezeigt werden */}
        {/* Generell sollten Modals immer direkt unter dem Error Manager sein */}
        <ModalManager />
      </div>
    </React.Fragment>
  );
}

export default App;
