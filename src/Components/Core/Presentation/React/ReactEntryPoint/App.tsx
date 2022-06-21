import BabylonCanvas from "./BabylonCanvas";
import "./App.css";
import ScorePanel from "../ScorePanel/ScorePanel";
import WorldNamePanel from "../ReactAdvancedComponents/WorldNamePanel";
import LearningElementModal from "../LearningElementModal/LearningElementModal";
import useIsMobilePortrait from "../CustomHooks/useIsMobilePortrait";
import StyledModal from "../ReactBaseComponents/StyledModal";
import React from "react";
import LogoMenuBar from "../ReactAdvancedComponents/LogoMenuBar";
import LearningElementsDropdown from "../LearningElementsDropdown/LearningElementsDropdown";
import ModalManager from "../ModalManager/ModalManager";
import MoodleLoginForm from "../MoodleLoginForm/MoodleLoginForm";
import BottomTooltip from "../BottomTooltip/BottomTooltip";
import H5PPlayer from "../H5PPlayer/H5PPlayer";

function App() {
  return (
    <React.Fragment>
      <div className="root max-w-1/1 max-h-1/1 bg-babylonbg">
        <LogoMenuBar />
        <LearningElementsDropdown />
        <ScorePanel />
        <WorldNamePanel />
        <BabylonCanvas className="w-screen h-screen" />
        <LearningElementModal />
        <MoodleLoginForm />
        <BottomTooltip />
        <StyledModal canClose={false} showModal={useIsMobilePortrait()}>
          <h1>Bitte nutze den Landscape Modus!</h1>
        </StyledModal>
        {/* Der Error Manager sollte immer auf oberster Ebene sein, damit Error-Modals immer angezeigt werden */}
        {/* Generell sollten Modals immer direkt unter dem Error Manager sein */}
        <ModalManager />
        <StyledModal showModal={false}>
          <H5PPlayer />
        </StyledModal>
      </div>
    </React.Fragment>
  );
}

export default App;
