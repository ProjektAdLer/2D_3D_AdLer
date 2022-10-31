import React from "react";
import BottomTooltip from "~ReactComponents/SpaceDisplay/BottomTooltip/BottomTooltip";
import useIsMobilePortrait from "~ReactComponents/ReactRelated/CustomHooks/useIsMobilePortrait";
import ElementModal from "~ReactComponents/SpaceDisplay/ElementModal/ElementModal";
import ElementsDropdown from "~ReactComponents/SpaceDisplay/ElementsDropdown/ElementsDropdown";
import SpaceGoalPanel from "~ReactComponents/SpaceDisplay/SpaceGoalPanel/SpaceGoalPanel";
import SpaceNamePanel from "~ReactComponents/SpaceDisplay/SpaceNamePanel/SpaceNamePanel";
import NotificationManager from "~ReactComponents/GeneralComponents/NotificationManager/NotificationManager";
import MoodleLoginForm from "~ReactComponents/GeneralComponents/MoodleLoginForm/MoodleLoginForm";
import MenuBar from "~ReactComponents/GeneralComponents/MenuBar/MenuBar";
import StyledModal from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledModal";
import ScorePanel from "~ReactComponents/SpaceDisplay/ScorePanel/ScorePanel";
import BabylonCanvas from "../../../Babylon/SceneManagement/BabylonCanvas";
import SpaceSceneDefinition from "../../../Babylon/SceneManagement/Scenes/SpaceSceneDefinition";
import SpaceCompletionModal from "~ReactComponents/SpaceDisplay/SpaceCompletionModal/SpaceCompletionModal";

export default function Space() {
  return (
    <React.Fragment>
      <div className="grid h-0 min-h-screen grid-cols-9 grid-rows-6 root">
        <div className="z-10 col-start-1 col-span-3 row-start-1 m-2 pointer-events-none">
          <MenuBar />
        </div>
        {/*<div className="z-10 col-span-2 col-start-2 row-start-1 m-2">
          <ElementsDropdown />
        </div>*/}
        <div className="z-10 col-span-2 col-start-8 row-start-1">
          <ScorePanel />
        </div>
        <div className="z-10 col-span-5 col-start-3 row-start-1 pointer-events-none">
          <SpaceNamePanel />
        </div>
        {/*<div className="z-10 col-span-1 col-start-7 row-start-1 m-2">
          <SpaceGoalPanel />
        </div>*/}
        <div className="col-span-9 col-start-1 row-span-6 row-start-1">
          <BabylonCanvas
            sceneDefinitionType={SpaceSceneDefinition}
            className="w-screen h-screen"
            engineOptions={{ stencil: true }}
          />
        </div>
        <BottomTooltip />
        <div className="z-10">
          <ElementModal />
        </div>
        <div className="z-10">
          <SpaceCompletionModal />
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
          <NotificationManager />
        </div>
      </div>
    </React.Fragment>
  );
}
