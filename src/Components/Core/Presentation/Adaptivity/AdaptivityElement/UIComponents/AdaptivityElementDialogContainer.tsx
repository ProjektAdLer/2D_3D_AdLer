import campusNPC from "../../../../../../Assets/misc/quizBackgrounds/a_npc_dozentlukas.png";
import campusNPCClose from "../../../../../../Assets/misc/quizBackgrounds/a_npc_dozentlukas_close.png";
import arcadeNPC from "../../../../../../Assets/misc/quizBackgrounds/a_npc_sheriffjustice.png";
import arcadeNPCClose from "../../../../../../Assets/misc/quizBackgrounds/a_npc_sheriffjustice_close.png";
import defaultNPC from "../../../../../../Assets/misc/quizBackgrounds/a_npc_defaultnpc.png";
import defaultNPCClose from "../../../../../../Assets/misc/quizBackgrounds/a_npc_defaultnpc_close.png";
import robotNPC from "../../../../../../Assets/misc/quizBackgrounds/a_npc_alerobot.png";
import robotNPCClose from "../../../../../../Assets/misc/quizBackgrounds/a_npc_alerobot_close.png";

import requiredSolvedIcon from "../../../../../../Assets/icons/40-difficulties-adaptivity/diffculties-adaptivity-required-solved-icon.svg";
import requiredUnsolvedIcon from "../../../../../../Assets/icons/40-difficulties-adaptivity/diffculties-adaptivity-required-unsolved-icon.svg";
import notRequiredSolvedIcon from "../../../../../../Assets/icons/40-difficulties-adaptivity/diffculties-adaptivity-solved-icon.svg";
import notRequiredUnsolvedIcon from "../../../../../../Assets/icons/40-difficulties-adaptivity/diffculties-adaptivity-unsolved-icon.svg";
import placeholderIcon from "../../../../../../Assets/icons/40-difficulties-adaptivity/diffculties-adaptivity-placeholder.svg";
import requiredTaskIcon from "../../../../../../Assets/icons/41-required-adaptivity/required-adaptivity.svg";

import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import AdaptivityElementViewModel, {
  AdaptivityHint,
  AdaptivityQuestion,
  AdaptivityTask,
} from "../AdaptivityElementViewModel";
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
import AdaptivityElementHint from "./AdaptivityElementHint";
import {
  LearningElementModel,
  LearningElementModelTypeEnums,
} from "../../../../Domain/LearningElementModels/LearningElementModelTypes";
import { Trans, useTranslation } from "react-i18next";

function getNPCImage(model: LearningElementModel, close: boolean): string {
  switch (model) {
    case LearningElementModelTypeEnums.QuizElementModelTypes.RobotNPC:
      return close ? robotNPCClose : robotNPC;
    case LearningElementModelTypeEnums.QuizElementModelTypes.ArcadeNPC:
      return close ? arcadeNPCClose : arcadeNPC;
    case LearningElementModelTypeEnums.QuizElementModelTypes.CampusNPC:
      return close ? campusNPCClose : campusNPC;
    case LearningElementModelTypeEnums.QuizElementModelTypes.DefaultNPC:
    default:
      return close ? defaultNPCClose : defaultNPC;
  }
}

export default function AdaptivityElementDialogContainer({
  className,
}: AdLerUIComponent) {
  const [viewmodel, controller] = useBuilder<
    AdaptivityElementViewModel,
    IAdaptivityElementController
  >(BUILDER_TYPES.IAdaptivityElementBuilder);

  // -- Observables --
  const [isOpen] = useObservable<boolean>(viewmodel?.isOpen);
  const [currentTask] = useObservable<AdaptivityTask | null>(
    viewmodel?.currentTask
  );
  const [currentQuestion] = useObservable<AdaptivityQuestion | null>(
    viewmodel?.currentQuestion
  );
  const [selectedHint] = useObservable<AdaptivityHint | null>(
    viewmodel?.selectedHint
  );
  const [contentData] = useObservable(viewmodel?.contentData);
  const [footerText] = useObservable<string>(viewmodel?.footerText);
  const [showAnswerFeedback] = useObservable<boolean>(viewmodel?.showFeedback);
  const [showFooterTooltip] = useObservable<boolean>(
    viewmodel?.showFooterTooltip
  );
  const [model] = useObservable<LearningElementModel>(viewmodel?.model);

  const { t: translate } = useTranslation("learningElement");

  // -- State --
  const [headerText, setHeaderText] = useState<string>("");
  const [progressPercentage, setProgressPercentage] = useState<number>(0);

  useEffect(() => {
    if (!contentData) return;
    const completedTasks = contentData.tasks.reduce(
      (acc, task) => (task.hasBeenCompleted && task.isRequired ? ++acc : acc),
      0
    );
    const requiredTasks = contentData.tasks.reduce(
      (acc, task) => (task.isRequired ? ++acc : acc),
      0
    );
    setProgressPercentage((completedTasks / requiredTasks) * 100);
  }, [contentData, currentTask]);

  if (!viewmodel || !controller) return null;
  if (!isOpen || !contentData) return null;
  return (
    <StyledContainer className={tailwindMerge(className, "")}>
      <div
        className="fixed top-0 bottom-0 left-0 right-0 flex flex-col items-center justify-center w-screen h-full bg-black bg-opacity-30 lg:grid lg:grid-rows-3 lg:items-start"
        onClick={controller.closeModal}
      >
        {/* Background NPC */}
        <div className="flex items-end justify-start invisible w-full row-start-2 pl-16 lg:visible lg:h-full">
          <img
            className="z-20 invisible object-contain h-0 -scale-x-100 brightness-125 lg:visible lg:h-full "
            alt="LearningImage!"
            src={getNPCImage(model, true)}
            onClick={(event) => {
              event.stopPropagation();
            }}
          ></img>
        </div>

        {/* Modal */}
        <div className="flex justify-center items-start pb-2 w-full lg:w-[95vw] max-w-7xl h-full pt-2 lg:pt-0 row-start-3 ">
          <div
            className="flex flex-col p-2 xl:px-8 rounded-lg bg-gradient-to-br from-adlerbggradientfrom to-adlerbggradientto h-full w-full max-w-[95%] max-h-[95%] lg:max-h-[100%]  justify-between overflow-auto"
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            {/* Header */}
            <div className="z-20 flex items-center justify-center w-full h-20 gap-2 p-2 pb-3 overflow-hidden text-xl font-bold text-adlerdarkblue lg:roboto-black lg:text-2xl ">
              {!(currentTask === null && currentQuestion === null) &&
                !showAnswerFeedback && (
                  <StyledButton
                    onClick={controller.back}
                    className="w-8 h-8 p-1 mr-2 text-xs roboto-black xl:w-10 xl:h-10 lg:w-10 lg:h-10 md:w-10 md:h-10 sm:w-10 sm:h-10"
                  >
                    {"<"}
                  </StyledButton>
                )}

              {currentTask === null && currentQuestion === null && (
                <div className="w-[50px] lg:w-[50px] bg-buttonbgblue rounded-full text-sm">
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
                    {Math.round(progressPercentage) + "%"}
                  </CircularProgressbarWithChildren>
                </div>
              )}

              <img
                className="visible h-16 -scale-x-100 lg:invisible lg:h-0"
                alt="LearningImage!"
                src={getNPCImage(model, false)}
              ></img>

              <div className="w-full text-sm lg:text-lg">{headerText}</div>

              <StyledButton
                onClick={controller.closeModal}
                className="w-8 h-8 p-1 text-xs roboto-black xl:w-10 xl:h-10 lg:w-10 lg:h-10 md:w-10 md:h-10 sm:w-10 sm:h-10"
              >
                X
              </StyledButton>
            </div>

            {/* Content */}
            <div className="overflow-auto">
              {currentTask === null && currentQuestion === null && (
                <div className="flex items-center justify-center px-1 mb-4 overflow-auto rounded-lg font-regular h-fit !text-sm lg:m-4">
                  <AdaptivityElementTaskSelection
                    tasks={contentData.tasks}
                    setHeaderText={setHeaderText}
                    onSelectTask={controller.selectTask}
                  />
                </div>
              )}
              {currentTask !== null && currentQuestion === null && (
                <div className="flex items-center justify-center px-1 mb-4 rounded-lg font-regular h-fit lg:m-4">
                  <AdaptivityElementQuestionSelection
                    selectedTask={currentTask}
                    setHeaderText={setHeaderText}
                    onSelectQuestion={controller.selectQuestion}
                    onSelectHint={controller.selectHint}
                  />
                </div>
              )}

              {currentTask !== null &&
                currentQuestion !== null &&
                !showAnswerFeedback &&
                selectedHint === null && (
                  <div className="flex items-center justify-center px-1 mb-4 rounded-lg font-regular h-fit lg:m-4">
                    <AdaptivityElementAnswerSelection
                      question={currentQuestion}
                      setHeaderText={setHeaderText}
                      submitSelection={controller.submitSelection}
                      closeSelection={controller.closeAnswerSelection}
                    />
                  </div>
                )}

              {currentTask !== null &&
                currentQuestion !== null &&
                showAnswerFeedback &&
                selectedHint === null && (
                  <AdaptivityElementAnswerFeedback
                    isCorrect={currentQuestion.isCompleted!}
                    setHeaderText={setHeaderText}
                    closeFeedback={controller.closeFeedback}
                  />
                )}
              {currentTask !== null &&
                currentQuestion !== null &&
                !showAnswerFeedback &&
                selectedHint !== null && (
                  <AdaptivityElementHint
                    hint={selectedHint}
                    setHeaderText={setHeaderText}
                  />
                )}
            </div>

            {/* Footer */}
            {
              <div className="flex justify-between items-end pt-1 text-[0.5rem] lg:text-xs modal-footer">
                <p>{footerText}</p>
                {!(currentTask !== null && currentQuestion !== null) && (
                  <div className="relative flex group">
                    {!showFooterTooltip && (
                      <p
                        className="right-1 bottom-1"
                        onMouseEnter={() => {
                          controller.showFooterTooltip();
                        }}
                      >
                        {translate("legendHover")}
                      </p>
                    )}
                    {showFooterTooltip && (
                      <div
                        className="flex gap-2"
                        onMouseLeave={() => {
                          controller.hideFooterTooltip();
                        }}
                      >
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
                            <Trans
                              i18nKey="legendDifficulty"
                              ns="learningElement"
                            />
                          </p>
                          <p>{translate("requiredUnsolved")}</p>
                          <p>{translate("optionalUnsolved")}</p>
                          <p>{translate("requiredSolved")}</p>
                          <p>{translate("optionalSolved")}</p>
                          <p>{translate("noQuestionDifficulty")}</p>
                          <p>{translate("requiredTask")}</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            }
          </div>
        </div>
      </div>
    </StyledContainer>
  );
}
