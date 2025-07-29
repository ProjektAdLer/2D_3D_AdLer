import BottomTooltip from "~ReactComponents/LearningSpaceDisplay/BottomTooltip/BottomTooltip";
import LearningElementModal from "~ReactComponents/LearningSpaceDisplay/LearningElementModal/LearningElementModal";
import LearningSpaceNamePanel from "~ReactComponents/LearningSpaceDisplay/LearningSpaceNamePanel/LearningSpaceNamePanel";
import NotificationManager from "~ReactComponents/GeneralComponents/NotificationManager/NotificationManager";
import SideBar from "~ReactComponents/LearningSpaceDisplay/SideBar/SideBar";
import BabylonCanvas from "../../../Babylon/SceneManagement/BabylonCanvas";
import LearningSpaceSceneDefinition from "../../../Babylon/SceneManagement/Scenes/LearningSpaceSceneDefinition";
import ExitModal from "~ReactComponents/LearningSpaceDisplay/ExitModal/ExitModal";
import BreakTimeNotification from "../../../Adaptivity/BreakTimeNotification/BreakTimeNotification";
import AdaptivityElementDialogContainer from "../../../Adaptivity/AdaptivityElement/UIComponents/AdaptivityElementDialogContainer";
import LearningSpaceGoalPanel from "~ReactComponents/LearningSpaceDisplay/LearningSpaceGoalPanel/LearningSpaceGoalPanel";
import StoryElement from "~ReactComponents/LearningSpaceDisplay/StoryElement/StoryElement";
import ControlsExplanationModal from "~ReactComponents/GeneralComponents/ControlsExplanationModal/ControlsExplanationModal";
import BreakTimeNotificationOverview from "~ReactComponents/GeneralComponents/BreakTimeNotificationOverview/BreakTimeNotificationOverview";
import LearningWorldCompletionModal from "~ReactComponents/LearningSpaceMenu/LearningWorldCompletionModal/LearningWorldCompletionModal";
import NarrativeFrameworkLearningSpaceContainer from "~ReactComponents/GeneralComponents/NarrativeFrameworkLearningSpaceContainer/NarrativeFrameworkLearningSpaceContainer";
import ProgressScorePanel from "~ReactComponents/LearningSpaceDisplay/ProgressScorePanel/ProgessScorePanel";
import CinemaStripes from "~ReactComponents/LearningSpaceDisplay/CinemaStripes/CinemaStripes";

export default function LearningSpace() {
  return (
    <div className="root grid h-0 min-h-[90vh] grid-cols-9 grid-rows-6 lg:min-h-[90vh]">
      <section className="fixed right-2 top-2 z-20 col-span-2 col-start-8 row-start-1 flex flex-col-reverse items-center justify-center gap-1 space-x-reverse lg:flex-row-reverse lg:space-x-2 xl:flex-col xl:items-start xl:justify-start onek:flex-row onek:items-center onek:justify-center portrait:flex-col">
        <ProgressScorePanel />
        <LearningSpaceGoalPanel />
      </section>
      <LearningSpaceNamePanel className="pointer-events-none z-10 col-span-5 col-start-3 row-start-1 justify-self-center" />

      <BabylonCanvas
        sceneDefinitionType={LearningSpaceSceneDefinition}
        className="col-span-9 col-start-1 row-span-6 row-start-1 h-screen w-screen"
        engineOptions={{ stencil: true }}
      />
      <SideBar className="pointer-events-none z-10 col-span-3 col-start-1 row-start-1 m-2" />
      <BottomTooltip className="z-10 col-span-7 col-start-2 row-start-6 items-start justify-center lg:col-span-5 lg:col-start-3" />
      <AdaptivityElementDialogContainer className="z-50" />
      <LearningElementModal className="z-10" />
      <ExitModal className="z-30" />
      <BreakTimeNotification className="z-10" />
      <ControlsExplanationModal />
      <BreakTimeNotificationOverview />
      <StoryElement />
      {/* Der Error Manager sollte immer auf oberster Ebene sein, damit Error-Modals immer angezeigt werden */}
      {/* Generell sollten Modals immer direkt unter dem Error Manager sein */}
      <NotificationManager className="z-50" />
      <LearningWorldCompletionModal />
      <NarrativeFrameworkLearningSpaceContainer />
      <CinemaStripes />
    </div>
  );
}
