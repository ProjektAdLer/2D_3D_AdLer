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
      <div className="root grid grid-cols-5 grid-rows-3 max-w-1/1 max-h-1/1">
        <div className="col-start-1 row-start-1 z-10">
          <LogoMenuBar />
        </div>
        <div className="col-start-2 row-start-1 z-10">
          <LearningElementsDropdown />
        </div>
        <div className="col-start-5 row-start-1 z-10">
          <ScorePanel />
        </div>
        <div className="col-start-3 row-start-1 z-10">
          <WorldNamePanel />
        </div>
        <div className="col-start-1 col-span-5 row-start-1 row-span-3">
          <BabylonCanvas className="w-screen h-screen" />
        </div>
        <div className="col-start-3 row-start-3 z-10">
          <BottomTooltip />
        </div>
        <div className="z-50">
          <LearningElementModal />
        </div>
        <div className="z-50">
          <MoodleLoginForm />
        </div>
        <div className="z-50">
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
        </div>
        {/* Der Error Manager sollte immer auf oberster Ebene sein, damit Error-Modals immer angezeigt werden */}
        {/* Generell sollten Modals immer direkt unter dem Error Manager sein */}
        <ModalManager />
        <StyledModal showModal={true}>
          <H5PPlayer />
        </StyledModal>
      </div>
    </React.Fragment>
  );
}

export default App;
