import BabylonCanvas from "./BabylonCanvas";
import "./App.css";
import ScorePanel from "../ScorePanel/ScorePanel";
import LearningElementModal from "../LearningElementModal/LearningElementModal";
import useIsMobilePortrait from "../CustomHooks/useIsMobilePortrait";
import StyledModal from "../ReactBaseComponents/StyledModal";
import React from "react";
import LogoMenuBar from "../ReactAdvancedComponents/LogoMenuBar";
import LearningElementsDropdown from "../LearningElementsDropdown/LearningElementsDropdown";
import ModalManager from "../ModalManager/ModalManager";
import MoodleLoginForm from "../MoodleLoginForm/MoodleLoginForm";
import BottomTooltip from "../BottomTooltip/BottomTooltip";
import LearningWorldNamePanel from "../LearningWorldNamePanel/LearningWorldNamePanel";

function App() {
  return (
    <React.Fragment>
      <div className="root grid grid-cols-9 grid-rows-6 max-h-screen">
        <div className="col-start-1 row-start-1 z-10">
          <LogoMenuBar />
        </div>
        <div className="col-start-2 col-span-2 row-start-1 z-10">
          <LearningElementsDropdown />
        </div>
        <div className="col-start-9 col-span-2 row-start-1 z-10">
          <ScorePanel />
        </div>
        <div className="col-start-3 col-span-5 row-start-1 z-10">
          <LearningWorldNamePanel />
        </div>
        <div className="col-start-1 col-span-9 row-start-1 row-span-6">
          <BabylonCanvas className="w-screen h-screen" />
        </div>
        <div className="col-start-4 row-start-6 col-span-3 z-10">
          <BottomTooltip />
        </div>
        <div className="z-10">
          <LearningElementModal />
        </div>
        <div className="z-10">
          <MoodleLoginForm />
        </div>
        <StyledModal canClose={false} showModal={useIsMobilePortrait()}>
          <div className="text-lg text-white text-shadow-sm font-bold">
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
