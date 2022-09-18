import React from "react";
import BottomTooltip from "~ReactComponents/SpaceDisplay/BottomTooltip/BottomTooltip";
import useIsMobilePortrait from "~ReactComponents/ReactRelated/CustomHooks/useIsMobilePortrait";
import ElementModal from "~ReactComponents/SpaceDisplay/ElementModal/ElementModal";
import ElementsDropdown from "~ReactComponents/SpaceDisplay/ElementsDropdown/ElementsDropdown";
import WorldGoalPanel from "~ReactComponents/SpaceDisplay/WorldGoalPanel/WorldGoalPanel";
import WorldNamePanel from "~ReactComponents/SpaceDisplay/WorldNamePanel/WorldNamePanel";
import ModalManager from "~ReactComponents/SpaceDisplay/ModalManager/ModalManager";
import MoodleLoginForm from "~ReactComponents/MoodleLoginForm/MoodleLoginForm";
import LogoMenuBar from "~ReactComponents/ReactRelated/ReactAdvancedComponents/LogoMenuBar";
import StyledModal from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledModal";
import ScorePanel from "~ReactComponents/SpaceDisplay/ScorePanel/ScorePanel";
import BabylonCanvas from "./BabylonCanvas";

export default function Space() {
  return (
    <React.Fragment>
      <div className="grid max-h-screen grid-cols-9 grid-rows-6 root">
        <div className="z-10 col-start-1 row-start-1 m-2">
          <LogoMenuBar />
        </div>
        <div className="z-10 col-span-2 col-start-2 row-start-1 m-2">
          <ElementsDropdown />
        </div>
        <div className="z-10 col-span-2 col-start-9 row-start-1">
          <ScorePanel />
        </div>
        <div className="z-10 col-span-5 col-start-3 row-start-1">
          <WorldNamePanel />
        </div>
        <div className="z-10 col-span-1 col-start-3 row-start-1">
          <WorldGoalPanel />
        </div>
        <div className="col-span-9 col-start-1 row-span-6 row-start-1">
          <BabylonCanvas className="w-screen h-screen" />
        </div>
        <div className="z-10 col-span-3 col-start-4 row-start-6">
          <BottomTooltip />
        </div>
        <div className="z-10">
          <ElementModal />
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
        <div className="z-50">
          <ModalManager />
        </div>
      </div>
    </React.Fragment>
  );
}
