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
import ErrorModalManager from "../ErrorModalManager/ErrorModalManager";
import MoodleLoginForm from "../MoodleLoginForm/MoodleLoginForm";

function App() {
  return (
    <React.Fragment>
      <div className="root max-w-1/1 max-h-1/1 bg-babylonbg">
        <StyledModal canClose={false} showModal={useIsMobilePortrait()}>
          <h1>Bitte nutze den Landscape Modus!</h1>
        </StyledModal>
        <LogoMenuBar />
        <LearningElementsDropdown />
        <ErrorModalManager />
        <ScorePanel />
        <MoodleLoginForm />
        <WorldNamePanel />
        <BabylonCanvas className="w-screen h-screen" />
        <LearningElementModal />
      </div>
    </React.Fragment>
  );
}

export default App;
