import React from "react";
import BottomTooltip from "~ReactComponents/LearningSpaceDisplay/BottomTooltip/BottomTooltip";
import LearningElementModal from "~ReactComponents/LearningSpaceDisplay/LearningElementModal/LearningElementModal";
import LearningSpaceNamePanel from "~ReactComponents/LearningSpaceDisplay/LearningSpaceNamePanel/LearningSpaceNamePanel";
import NotificationManager from "~ReactComponents/GeneralComponents/NotificationManager/NotificationManager";
import SideBar from "~ReactComponents/LearningSpaceDisplay/SideBar/SideBar";
import BabylonCanvas from "../../../Babylon/SceneManagement/BabylonCanvas";
import LearningSpaceSceneDefinition from "../../../Babylon/SceneManagement/Scenes/LearningSpaceSceneDefinition";
import ExitModal from "~ReactComponents/LearningSpaceDisplay/ExitModal/ExitModal";
import LearningSpaceScorePanel from "~ReactComponents/LearningSpaceDisplay/LearningSpaceScorePanel/LearningSpaceScorePanel";
import LearningWorldScorePanel from "~ReactComponents/LearningSpaceDisplay/LearningWorldScorePanel/LearningWorldScorePanel";
import OverallTimeSpentAdaptivityNotification from "../../../Adaptivity/OverallTimeSpentAdaptivityNotification/OverallTimeSpentAdaptivityNotification";

export default function LearningSpace() {
  return (
    <React.Fragment>
      <div className="grid h-0 min-h-screen grid-cols-9 grid-rows-6 root">
        <section className="fixed z-10 flex flex-col-reverse col-span-2 col-start-8 row-start-1 gap-1 space-x-2 space-x-reverse lg:flex-row-reverse right-2 top-2">
          <LearningWorldScorePanel />
          <LearningSpaceScorePanel />
        </section>
        <LearningSpaceNamePanel className="z-10 col-span-5 col-start-3 row-start-1 pointer-events-none justify-self-center" />

        <BabylonCanvas
          sceneDefinitionType={LearningSpaceSceneDefinition}
          className="w-screen h-screen col-span-9 col-start-1 row-span-6 row-start-1"
          engineOptions={{ stencil: true }}
        />
        <BottomTooltip />
        <SideBar className="z-10 col-span-3 col-start-1 row-start-1 m-2 pointer-events-none" />
        <LearningElementModal className="z-10" />
        <ExitModal className="z-20" />
        {/* Der Error Manager sollte immer auf oberster Ebene sein, damit Error-Modals immer angezeigt werden */}
        {/* Generell sollten Modals immer direkt unter dem Error Manager sein */}
        <NotificationManager className="z-50" />
        <OverallTimeSpentAdaptivityNotification />
      </div>
    </React.Fragment>
  );
}
