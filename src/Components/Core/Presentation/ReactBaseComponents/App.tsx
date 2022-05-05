import React from "react";
import BabylonCanvas from "./BabylonCanvas";
import "./App.css";
import LearningElementModal from "../LearningElementModal/LearningElementModal";
import MenuBar from "../ReactAdvancedComponents/MenuBar";
import ScorePanel from "../ReactAdvancedComponents/ScorePanel";
import WorldNamePanel from "../ReactAdvancedComponents/WorldNamePanel";

function App() {
  return (
    <React.Fragment>
      <div className="root max-w-1/1 max-h-1/1 flex bg-babylonbg">
        <MenuBar className="top-0 left-0" />
        <ScorePanel className="bottom-0 left-0" />
        <WorldNamePanel className="inset-x-1/2" />
        <BabylonCanvas className="w-screen h-screen" />
        <LearningElementModal />
      </div>
    </React.Fragment>
  );
}

export default App;
