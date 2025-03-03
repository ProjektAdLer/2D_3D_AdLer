import campusNPC from "../../../../../../Assets/misc/quizBackgrounds/a-npc-dozentlukas.png";
import campusNPCClose from "../../../../../../Assets/misc/quizBackgrounds/a-quizbg-dozentlukas-close.png";
import arcadeNPC from "../../../../../../Assets/misc/quizBackgrounds/a-npc-sheriffjustice.png";
import arcadeNPCClose from "../../../../../../Assets/misc/quizBackgrounds/a-npc-sheriffjustice-close.png";
import defaultNPC from "../../../../../../Assets/misc/quizBackgrounds/a-quizbg-defaultnpc.png";
import defaultNPCClose from "../../../../../../Assets/misc/quizBackgrounds/a-quizbg-defaultnpc-close.png";
import robotNPC from "../../../../../../Assets/misc/quizBackgrounds/a-quizbg-alerobot.png";
import robotNPCClose from "../../../../../../Assets/misc/quizBackgrounds/a-quizbg-alerobot-close.png";
import closeIcon from "../../../../../../Assets/icons/close.svg";

import requiredSolvedIcon from "../../../../../../Assets/icons/diffculties-adaptivity-hard-required-solved-icon.svg";
import requiredTriedIcon from "../../../../../../Assets/icons/diffculties-adaptivity-hard-required-tried.svg";
import requiredUnsolvedIcon from "../../../../../../Assets/icons/diffculties-adaptivity-hard-required-unsolved-icon.svg";
import notRequiredSolvedIcon from "../../../../../../Assets/icons/diffculties-adaptivity-medium-solved.svg";
import notRequiredTriedIcon from "../../../../../../Assets/icons/diffculties-adaptivity-medium-tried.svg";
import notRequiredUnsolvedIcon from "../../../../../../Assets/icons/diffculties-adaptivity-medium-unsolved-icon.svg";
import placeholderIcon from "../../../../../../Assets/icons/diffculties-adaptivity-placeholder.svg";
import requiredTaskIcon from "../../../../../../Assets/icons/required.svg";
import solvedTaskIcon from "../../../../../../Assets/icons/check-solution.svg";

import AdaptivityElementDifficultyStars, {
  AdaptivityElementDifficultyStarState,
} from "./AdaptivityElementDifficultyStars";

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
import { useTranslation } from "react-i18next";
import CloseButton from "~ReactComponents/ReactRelated/ReactBaseComponents/CloseButton";
import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";

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
    viewmodel?.currentTask,
  );
  const [currentQuestion] = useObservable<AdaptivityQuestion | null>(
    viewmodel?.currentQuestion,
  );
  const [selectedHint] = useObservable<AdaptivityHint | null>(
    viewmodel?.selectedHint,
  );
  const [contentData] = useObservable(viewmodel?.contentData);
  const [footerText] = useObservable<string>(viewmodel?.footerText);
  const [showAnswerFeedback] = useObservable<boolean>(viewmodel?.showFeedback);
  const [showFooterTooltip] = useObservable<boolean>(
    viewmodel?.showFooterTooltip,
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
      0,
    );
    const requiredTasks = contentData.tasks.reduce(
      (acc, task) => (task.isRequired ? ++acc : acc),
      0,
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
            data-testid="npcImage"
            src={getNPCImage(model, true)}
            onClick={(event) => {
              event.stopPropagation();
            }}
          ></img>
        </div>

        {/* Modal */}
        <div className="flex justify-center items-start pb-2 w-full lg:w-[95vw] max-w-7xl max-h-[100vh] lg:max-h-[32vh] pt-2 lg:pt-0 row-start-3 ">
          <div
            className="flex flex-col justify-between p-2 xl:px-8 rounded-lg bg-gradient-to-br from-adlerbggradientfrom to-adlerbggradientto h-full w-full max-w-[95%] max-h-[95%] lg:max-h-[100%] "
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
                    {"\u25C0"}
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
                data-testid="npcImage"
                src={getNPCImage(model, false)}
              ></img>

              <div className="w-full text-xs lg:text-lg">{headerText}</div>

              <CloseButton
                onClick={controller.closeModal}
                className="w-8 h-8 p-1 text-xs roboto-black xl:w-10 xl:h-10 lg:w-10 lg:h-10 md:w-10 md:h-10 sm:w-10 sm:h-10"
              >
                <img
                  src={closeIcon}
                  className="lg:w-10 md:w-8 sm:w-6"
                  alt="CloseButton"
                ></img>
              </CloseButton>
            </div>

            {/* Content */}
            <div className="overflow-auto max-h-[80vh] lg:max-h-[16vh] xl:max-h-[20vh]">
              {currentTask === null && currentQuestion === null && (
                <div className=" flex items-center justify-center px-1 mb-4 h-fit rounded-lg font-regular !text-sm lg:mx-4">
                  <AdaptivityElementTaskSelection
                    tasks={contentData.tasks}
                    setHeaderText={setHeaderText}
                    onSelectTask={controller.selectTask}
                  />
                </div>
              )}
              {currentTask !== null && currentQuestion === null && (
                <div className="flex items-center justify-center px-1 mb-4 rounded-lg font-regular lg:mx-4">
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
                  <div className="flex items-center justify-center px-1 mb-4 rounded-lg font-regular h-fit lg:mx-4">
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
                    currentQuestion={currentQuestion}
                    currentTask={currentTask}
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
                    closeHint={controller.closeHint}
                  />
                )}
            </div>

            <div>
              {/* Footer */}
              {
                <div className=" flex justify-between items-end pt-4 text-[0.5rem] lg:text-xs modal-footer ">
                  <p>{footerText}</p>
                  {!(currentTask !== null && currentQuestion !== null) && (
                    <div className="relative flex group">
                      <p
                        className="cursor-pointer right-1 bottom-1"
                        onClick={() => {
                          controller.showFooterTooltip();
                        }}
                      >
                        {showFooterTooltip
                          ? translate("legendClose")
                          : translate("legendHover")}
                      </p>

                      {showFooterTooltip && (
                        <div className="fixed flex flex-col gap-2 p-4 right-2 top-2 bg-gradient-to-br from-adlerbggradientfrom to-adlerbggradientto rounded-xl ">
                          <div className="flex flex-row justify-between w-full gap-4">
                            <h1 className="text-xs font-bold lg:text-xl">
                              {translate("headerLegend")}
                            </h1>
                            <CloseButton
                              onClick={() => {
                                controller.hideFooterTooltip();
                              }}
                            >
                              x
                            </CloseButton>
                          </div>
                          <h3 className="text-sm font-bold">
                            {translate("headerLegendTask")}
                          </h3>
                          <table className="text-left table-auto">
                            <tbody>
                              <tr>
                                <td className="pr-2">
                                  <img
                                    className="w-4 lg:w-6"
                                    src={requiredTaskIcon}
                                    alt="required Task icon"
                                    data-testid="requiredTaskIconImage"
                                  />
                                </td>
                                <td>{translate("legendTaskRequired")}</td>
                              </tr>
                              <tr>
                                <td className="pr-2">
                                  <img
                                    className="w-4 lg:w-6"
                                    src={solvedTaskIcon}
                                    alt="required unsolved icon"
                                  />
                                </td>
                                <td>{translate("legendTaskRequiredSolved")}</td>
                              </tr>
                              <tr>
                                <td className="lg:h-6"></td>
                                <td>{translate("legendTaskNotRequired")}</td>
                              </tr>
                            </tbody>
                          </table>
                          <h3 className="pt-2 text-sm font-bold text-left ">
                            {translate("legendHeaderDifficulties")}
                          </h3>
                          <table className="text-left table-auto">
                            <tbody>
                              <tr>
                                <td className="pr-2">
                                  <AdaptivityElementDifficultyStars
                                    easyState={
                                      AdaptivityElementDifficultyStarState.NotRequiredSolved
                                    }
                                    mediumState={
                                      AdaptivityElementDifficultyStarState.Empty
                                    }
                                    hardState={
                                      AdaptivityElementDifficultyStarState.Empty
                                    }
                                    starClassName="w-4 h-4 sm:w-6 sm:h-6 "
                                  />
                                </td>
                                <td className="">
                                  {translate("legendEasyDifficulty")}
                                </td>
                              </tr>
                              <tr>
                                <td className="pr-2">
                                  <AdaptivityElementDifficultyStars
                                    easyState={
                                      AdaptivityElementDifficultyStarState.Empty
                                    }
                                    mediumState={
                                      AdaptivityElementDifficultyStarState.NotRequiredSolved
                                    }
                                    hardState={
                                      AdaptivityElementDifficultyStarState.Empty
                                    }
                                    starClassName="w-4 h-4 sm:w-6 sm:h-6 "
                                  />
                                </td>
                                <td>{translate("legendMediumDifficulty")}</td>
                              </tr>
                              <tr>
                                <td className="pr-2">
                                  <AdaptivityElementDifficultyStars
                                    easyState={
                                      AdaptivityElementDifficultyStarState.Empty
                                    }
                                    mediumState={
                                      AdaptivityElementDifficultyStarState.Empty
                                    }
                                    hardState={
                                      AdaptivityElementDifficultyStarState.RequiredSolved
                                    }
                                    starClassName="w-4 h-4 sm:w-6 sm:h-6 "
                                  />
                                </td>
                                <td>{translate("legendHardDifficulty")}</td>
                              </tr>
                            </tbody>
                          </table>
                          <h3 className="pt-2 text-sm font-bold text-left ">
                            {translate("legendHeaderStar")}
                          </h3>
                          <table>
                            <tbody>
                              <tr>
                                <td className="pr-2">
                                  <img
                                    className="w-4 lg:w-6"
                                    src={requiredUnsolvedIcon}
                                    alt="required unsolved icon"
                                  />
                                </td>
                                <td>
                                  {translate("legendStarRequiredUnsolved")}
                                </td>
                              </tr>
                              <tr>
                                <td className="pr-2">
                                  <img
                                    className="w-4 lg:w-6"
                                    src={requiredTriedIcon}
                                    alt="required unsolved icon"
                                  />
                                </td>
                                <td>{translate("legendStarRequiredTried")}</td>
                              </tr>
                              <tr>
                                <td className="pr-2">
                                  <img
                                    className="w-4 lg:w-6"
                                    src={requiredSolvedIcon}
                                    alt="not required unsolved icon"
                                  />
                                </td>

                                <td>{translate("legendStarRequiredSolved")}</td>
                              </tr>
                              <tr>
                                <td className="pr-2">
                                  <img
                                    className="w-4 lg:w-6"
                                    src={notRequiredUnsolvedIcon}
                                    alt="not required unsolved icon"
                                  />
                                </td>

                                <td>
                                  {translate("legendStarNotRequiredUnsolved")}
                                </td>
                              </tr>
                              <tr>
                                <td className="pr-2">
                                  <img
                                    className="w-4 lg:w-6"
                                    src={notRequiredTriedIcon}
                                    alt="not required unsolved icon"
                                  />
                                </td>

                                <td>
                                  {translate("legendStarNotRequiredTried")}
                                </td>
                              </tr>
                              <tr>
                                <td className="pr-2">
                                  <img
                                    className="w-4 lg:w-6"
                                    src={notRequiredSolvedIcon}
                                    alt="not required unsolved icon"
                                  />
                                </td>

                                <td>
                                  {translate("legendStarNotRequiredSolved")}
                                </td>
                              </tr>

                              <tr>
                                <td className="pr-2">
                                  <img
                                    className="w-4 lg:w-6"
                                    src={placeholderIcon}
                                    alt="not required unsolved icon"
                                  />
                                </td>
                                <td>{translate("legendNoStar")}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </StyledContainer>
  );
}
