import quizBackgroundVRGuy from "../../../../../../Assets/misc/quizBackgrounds/a_npc_dozentlukas.png";
import quizBackgroundVRGuyCutted from "../../../../../../Assets/misc/quizBackgrounds/a_npc_dozentlukas_close.png";

import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import AdaptivityElementViewModel from "../AdaptivityElementViewModel";
import IAdaptivityElementController from "../IAdaptivityElementController";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import useObservable from "~ReactComponents/ReactRelated/CustomHooks/useObservable";
import StyledContainer from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledContainer";
import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";
import tailwindMerge from "../../../Utils/TailwindMerge";
import { AdLerUIComponent } from "../../../../Types/ReactTypes";
import AdaptivityElementTaskSelection from "./AdaptivityElementTaskSelection";
import { useEffect, useState } from "react";
import AdaptivityElementAnswerSelection from "./AdaptivityElementAnswerSelection";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import AdaptivityElementQuestionSelection from "./AdaptivityElementQuestionSelection";
import AdaptivityElementAnswerFeedback from "./AdaptivityElementAnswerFeedback";
import requiredSolvedIcon from "../../../../../../Assets/icons/40-difficulties-adaptivity/diffculties-adaptivity-required-solved-icon.svg";
import requiredUnsolvedIcon from "../../../../../../Assets/icons/40-difficulties-adaptivity/diffculties-adaptivity-required-unsolved-icon.svg";
import notRequiredSolvedIcon from "../../../../../../Assets/icons/40-difficulties-adaptivity/diffculties-adaptivity-solved-icon.svg";
import notRequiredUnsolvedIcon from "../../../../../../Assets/icons/40-difficulties-adaptivity/diffculties-adaptivity-unsolved-icon.svg";
import placeholderIcon from "../../../../../../Assets/icons/40-difficulties-adaptivity/diffculties-adaptivity-placeholder.svg";
import requiredTaskIcon from "../../../../../../Assets/icons/41-required-adaptivity/required-adaptivity.svg";

export default function AdaptivityElementDialogContainer({
  className,
}: AdLerUIComponent) {
  const [viewmodel, controller] = useBuilder<
    AdaptivityElementViewModel,
    IAdaptivityElementController
  >(BUILDER_TYPES.IAdaptivityElementBuilder);

  // -- Observables --
  const [isOpen] = useObservable<boolean>(viewmodel?.isOpen);
  const [currentTaskID] = useObservable<number | null>(
    viewmodel?.currentTaskID
  );
  const [currentQuestionID] = useObservable<number | null>(
    viewmodel?.currentQuestionID
  );
  const [contentData] = useObservable(viewmodel?.contentData);
  const [footerText] = useObservable<string>(viewmodel?.footerText);
  const [showAnswerFeedback] = useObservable<boolean>(viewmodel?.showFeedback);

  // -- State --
  const [headerText, setHeaderText] = useState<string>("");
  const [progressPercentage, setProgressPercentage] = useState<number>(0);

  useEffect(() => {
    if (!contentData) return;
    const completedTasks = contentData.tasks.reduce(
      (acc, task) => (task.isCompleted ? ++acc : acc),
      0
    );
    setProgressPercentage((completedTasks / contentData.tasks.length) * 100);
  }, [contentData]);

  if (!viewmodel || !controller) return null;
  if (!isOpen || !contentData) return null;

  return (
    <>
      <StyledContainer className={tailwindMerge(className, "")}>
        <div className="fixed top-0 bottom-0 left-0 right-0 flex flex-col items-center justify-center w-screen h-screen bg-black bg-opacity-50 lg:grid lg:grid-rows-3 lg:items-start">
          {/* Background NPC */}
          <div className="flex items-end justify-start invisible w-full pl-16 lg:visible lg:h-full">
            <img
              className="z-20 invisible object-contain h-0 -scale-x-100 brightness-125 lg:visible lg:h-full "
              alt="LearningImage!"
              src={quizBackgroundVRGuyCutted}
            ></img>
          </div>

          {/* Modal */}
          <div className="flex justify-center items-start lg:row-span-2 w-full lg:w-[95vw] max-w-7xl h-full pt-2 lg:pt-0 ">
            <div className="flex flex-col p-2 xl:px-8 rounded-lg bg-gradient-to-br from-adlerbggradientfrom to-adlerbggradientto w-full max-w-[95%] max-h-[95%] lg:h-fit justify-between overflow-auto">
              {/* Header */}
              <div className="z-20 flex items-center justify-center w-full gap-2 p-2 pb-3 overflow-hidden text-xl font-bold text-adlerdarkblue lg:roboto-black lg:text-2xl ">
                <img
                  className="visible h-16 -scale-x-100 lg:invisible lg:h-0"
                  alt="LearningImage!"
                  src={quizBackgroundVRGuy}
                ></img>

                {currentTaskID === null && currentQuestionID === null && (
                  <div className="w-[49px] lg:w-[70px] bg-buttonbgblue rounded-full ">
                    <CircularProgressbarWithChildren
                      value={progressPercentage}
                      strokeWidth={10}
                      styles={buildStyles({
                        strokeLinecap: "butt",
                        pathTransitionDuration: 1.5,

                        // Colors
                        trailColor: "#E64B17",
                        pathColor: `#59B347`,
                      })}
                    >
                      {progressPercentage + "%"}
                    </CircularProgressbarWithChildren>
                  </div>
                )}

                <div className="w-full text-sm lg:text-xl">{headerText}</div>
                {!(currentTaskID === null && currentQuestionID === null) && (
                  <StyledButton
                    onClick={controller.back}
                    className="w-8 h-8 p-1 text-xs roboto-black xl:w-10 xl:h-10 lg:w-10 lg:h-10 md:w-10 md:h-10 sm:w-10 sm:h-10"
                  >
                    {"<"}
                  </StyledButton>
                )}

                <StyledButton
                  onClick={controller.closeModal}
                  className="w-8 h-8 p-1 text-xs roboto-black xl:w-10 xl:h-10 lg:w-10 lg:h-10 md:w-10 md:h-10 sm:w-10 sm:h-10"
                >
                  X
                </StyledButton>
              </div>

              {/* Content */}
              <div className="overflow-auto">
                {currentTaskID === null && currentQuestionID === null && (
                  <div className="flex items-center justify-center px-1 mb-4 overflow-auto rounded-lg font-regular h-fit lg:m-4">
                    <AdaptivityElementTaskSelection
                      tasks={contentData.tasks}
                      setHeaderText={setHeaderText}
                      onSelectTask={controller.selectTask}
                    />
                  </div>
                )}
                {currentTaskID !== null && currentQuestionID === null && (
                  <div className="flex items-center justify-center px-1 mb-4 rounded-lg font-regular h-fit lg:m-4">
                    <AdaptivityElementQuestionSelection
                      selectedTask={
                        contentData.tasks.find(
                          (task) => task.taskID === currentTaskID
                        )!
                      }
                      setHeaderText={setHeaderText}
                      onSelectQuestion={controller.selectQuestion}
                    />
                  </div>
                )}

                {currentTaskID !== null &&
                  currentQuestionID !== null &&
                  !showAnswerFeedback && (
                    <div className="flex items-center justify-center px-1 mb-4 rounded-lg font-regular h-fit lg:m-4">
                      <AdaptivityElementAnswerSelection
                        question={
                          contentData.tasks
                            .find((task) => task.taskID === currentTaskID)!
                            .questions.find(
                              (question) =>
                                question.questionID === currentQuestionID
                            )!
                        }
                        id={viewmodel.elementID.Value}
                        setHeaderText={setHeaderText}
                        submitSelection={controller.submitSelection}
                        closeSelection={controller.closeAnswerSelection}
                      />
                    </div>
                  )}

                {currentTaskID !== null &&
                  currentQuestionID !== null &&
                  showAnswerFeedback && (
                    <AdaptivityElementAnswerFeedback
                      isCorrect={
                        contentData.tasks
                          .find((task) => task.taskID === currentTaskID)!
                          .questions.find(
                            (question) =>
                              question.questionID === currentQuestionID
                          )!.isCompleted!
                      }
                      setHeaderText={setHeaderText}
                      closeFeedback={controller.closeFeedback}
                    />
                  )}
              </div>

              {/* Footer */}
              {
                <div className="flex justify-between items-end pt-1 text-[0.5rem] lg:text-xs modal-footer">
                  <p>{footerText}</p>
                  {!(currentTaskID !== null && currentQuestionID !== null) && (
                    <div className="relative flex group">
                      <p className="absolute group-hover:invisible right-1 bottom-1">
                        Bewege deine Maus hier her, um die Symbollegende
                        anzuzeigen
                      </p>
                      <div className="flex invisible gap-2 group-hover:visible">
                        <div className="flex-col items-center justify-center">
                          <div className="flex opacity-60">
                            <img
                              className="w-2 lg:w-4"
                              src={requiredUnsolvedIcon}
                              alt="required unsolved icon"
                            />
                            <img
                              className="w-2 lg:w-4"
                              src={requiredUnsolvedIcon}
                              alt="required unsolved icon"
                            />
                            <img
                              className="w-2 lg:w-4"
                              src={requiredUnsolvedIcon}
                              alt="required unsolved icon"
                            />
                          </div>
                          <div className="w-2 h-2 lg:w-4 lg:h-4"></div>
                          <div className="w-2 h-2 lg:w-4 lg:h-4"></div>
                          <img
                            className="w-2 lg:w-4"
                            src={requiredUnsolvedIcon}
                            alt="required unsolved icon"
                          />
                          <img
                            className="w-2 lg:w-4"
                            src={notRequiredUnsolvedIcon}
                            alt="not required unsolved Icon"
                          />
                          <img
                            className="w-2 lg:w-4"
                            src={requiredSolvedIcon}
                            alt="required solved icon"
                          />
                          <img
                            className="w-2 lg:w-4"
                            src={notRequiredSolvedIcon}
                            alt="not required solved Icon"
                          />
                          <img
                            className="w-2 lg:w-4"
                            src={placeholderIcon}
                            alt="placeholder icon"
                          />
                          <img
                            className="w-2 lg:w-4"
                            src={requiredTaskIcon}
                            alt="required task icon"
                          />
                        </div>
                        <div className="flex-col items-start justify-center icons">
                          <p>
                            Links: Leichte Frage<br></br>Mitte: Mittelschwere
                            Frage<br></br>
                            Rechts: Schwere Frage
                          </p>
                          <p>Benötigte, ungelöste Frage</p>
                          <p>Nicht benötigte, ungelöste Frage</p>
                          <p>Benötigte, gelöste Frage</p>
                          <p>Nicht benötigte, gelöste Frage</p>
                          <p>Keine Frage dieser Schwierigkeit vorhanden</p>
                          <p>
                            Diese Aufgabe muss bearbeitet werden, um weiter zu
                            kommen.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              }
            </div>
          </div>
        </div>
      </StyledContainer>
    </>
  );
}
