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
import BreakTimeNotification from "../../../Adaptivity/BreakTimeNotification/BreakTimeNotification";
import AdaptivityElementDialogContainer from "../../../Adaptivity/AdaptivityElement/UIComponents/AdaptivityElementDialogContainer";
import LearningSpaceGoalPanel from "~ReactComponents/LearningSpaceDisplay/LearningSpaceGoalPanel/LearningSpaceGoalPanel";
import StoryElement from "~ReactComponents/LearningSpaceDisplay/StoryElement/StoryElement";
import GoalIcon from "../../../../../../Assets/icons/20-goal/goal-icon-adlerblue-bg.svg";

export default function LearningSpace() {
  return (
    <div className="grid h-0 min-h-screen grid-cols-9 grid-rows-6 root">
      <section className="fixed z-10 flex flex-col-reverse col-span-2 col-start-8 row-start-1 gap-1 space-x-2 space-x-reverse lg:flex-row-reverse right-2 top-2">
        <LearningWorldScorePanel />
        <LearningSpaceScorePanel />
        {/* <img className="w-[48px] lg:w-[69px]" src={GoalIcon}></img>  */}
      </section>
      <LearningSpaceNamePanel className="z-10 col-span-5 col-start-3 row-start-1 pointer-events-none justify-self-center" />

      <BabylonCanvas
        sceneDefinitionType={LearningSpaceSceneDefinition}
        className="w-screen h-screen col-span-9 col-start-1 row-span-6 row-start-1"
        engineOptions={{ stencil: true }}
      />
      <SideBar className="z-10 col-span-3 col-start-1 row-start-1 m-2 pointer-events-none" />
      <BottomTooltip className="z-10 items-start justify-center col-span-7 col-start-2 row-start-6 lg:col-span-5 lg:col-start-3" />
      <AdaptivityElementDialogContainer className="z-50" />
      <LearningElementModal className="z-10" />
      <ExitModal className="z-20" />
      <BreakTimeNotification className="z-10" />
      <LearningSpaceGoalPanel />
      <StoryElement />
      {/* Der Error Manager sollte immer auf oberster Ebene sein, damit Error-Modals immer angezeigt werden */}
      {/* Generell sollten Modals immer direkt unter dem Error Manager sein */}
      <NotificationManager className="z-50" />
    </div>
  );
}
