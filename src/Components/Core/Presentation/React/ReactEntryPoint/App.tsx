import React from "react";
import BabylonCanvas from "./BabylonCanvas";
import "./App.css";
import MenuBar from "../ReactAdvancedComponents/MenuBar";
import ScorePanel from "../ScorePanel/ScorePanel";
import WorldNamePanel from "../ReactAdvancedComponents/WorldNamePanel";
import LearningElementModal from "../LearningElementModal/LearningElementModal";
import MoodleLoginForm from "../ReactAdvancedComponents/MoodleLoginForm/MoodleLoginForm";

function App() {
  return (
    <React.Fragment>
      <div className="root max-w-1/1 max-h-1/1 bg-babylonbg">
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
