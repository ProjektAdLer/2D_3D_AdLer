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

function App() {
  const isMobilePortrait = useIsMobilePortrait();

  return (
    <React.Fragment>
      <div className="root max-w-1/1 max-h-1/1 bg-babylonbg">
        <StyledModal canClose={false} showModal={isMobilePortrait}>
          <h1>Bruder, nutz Landscape!</h1>
        </StyledModal>
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
