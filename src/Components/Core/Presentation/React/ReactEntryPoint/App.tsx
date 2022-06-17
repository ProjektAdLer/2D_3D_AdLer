import BabylonCanvas from "./BabylonCanvas";
import "./App.css";
import MenuBar from "../ReactAdvancedComponents/MenuBar";
import ScorePanel from "../ScorePanel/ScorePanel";
import WorldNamePanel from "../ReactAdvancedComponents/WorldNamePanel";
import LearningElementModal from "../LearningElementModal/LearningElementModal";
import MoodleLoginForm from "../MoodleLoginForm/MoodleLoginForm";
import useIsMobilePortrait from "../CustomHooks/useIsMobilePortrait";
import StyledModal from "../ReactBaseComponents/StyledModal";
import React from "react";
import LogoMenuBar from "../ReactAdvancedComponents/LogoMenuBar";
import LearningElementsDropdown from "../LearningElementsDropdown/LearningElementsDropdown";

function App() {
  return (
    <React.Fragment>
      <div className="root max-w-1/1 max-h-1/1 bg-babylonbg">
        <StyledModal canClose={false} showModal={useIsMobilePortrait()}>
          <h1>Bitte nutze den Landscape Modus!</h1>
        </StyledModal>
        <LogoMenuBar />
        <LearningElementsDropdown />
        <MenuBar />
        <ScorePanel />
        <WorldNamePanel />
        <BabylonCanvas className="w-screen h-screen" />
        <MoodleLoginForm />
        <LearningElementModal />
      </div>
    </React.Fragment>
  );
}

export default App;
