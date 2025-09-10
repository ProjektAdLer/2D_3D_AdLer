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
import { LearningElementModel } from "../../../../Domain/LearningElementModels/LearningElementModelTypes";
import { useTranslation } from "react-i18next";
import CloseButton from "~ReactComponents/ReactRelated/ReactBaseComponents/CloseButton";
import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";
import { EmotionType } from "src/Components/Core/Domain/Types/EmotionTypes";
import { getNPCImage } from "../../../Utils/GetNPCImage";

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
  const [resetting] = useObservable<boolean>(viewmodel?.hasResetted);

  const { t: translate } = useTranslation("learningElement");

  // -- State --
  const [headerText, setHeaderText] = useState<string>("");
  const [progressPercentage, setProgressPercentage] = useState<number>(0);
  const [allTasksCompleted, setAllTasksCompleted] = useState<boolean>(false);
  const [emotion, setEmotion] = useState<EmotionType>(EmotionType.welcome);

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

    if (completedTasks === contentData.tasks.length) {
      setAllTasksCompleted(true);
    } else {
      setAllTasksCompleted(false);
    }
  }, [contentData, currentTask, resetting]);

  useEffect(() => {
    if (!showAnswerFeedback) {
      setEmotion(EmotionType.welcome);
      return;
    }

    if (currentQuestion && currentQuestion.isCompleted) {
      setEmotion(EmotionType.thumbsup);
    } else if (currentQuestion && currentQuestion.isCompleted === false) {
      setEmotion(EmotionType.disappointed);
    } else {
      setEmotion(EmotionType.welcome);
    }
  }, [currentQuestion, showAnswerFeedback]);

  if (!viewmodel || !controller) return null;
  if (!isOpen || !contentData) return null;

  return (
    <StyledContainer className={tailwindMerge(className, "")}>
      <div
        className="fixed bottom-0 left-0 right-0 top-0 flex h-full w-screen flex-col items-center justify-center bg-black bg-opacity-30 lg:grid lg:grid-rows-3 lg:items-start"
        onClick={controller.closeModal}
        data-testid="adaptivity-dialogcontainer"
      >
        {/* Background NPC */}
        <div className="invisible row-start-2 flex w-full items-end justify-start pl-16 lg:visible lg:h-full">
          <img
            className="invisible z-20 h-0 -scale-x-100 object-contain brightness-125 lg:visible lg:h-full"
            alt="LearningImage!"
            data-testid="npcImage"
            src={getNPCImage(model, true, emotion)}
            onClick={(event) => {
              event.stopPropagation();
            }}
          ></img>
        </div>

        {/* Modal */}
        <div className="row-start-3 flex max-h-[100vh] w-full max-w-7xl items-start justify-center pb-2 pt-2 lg:max-h-[32vh] lg:w-[95vw] lg:pt-0">
          <div
            className="flex h-full max-h-[95%] w-full max-w-[95%] flex-col justify-between rounded-lg bg-gradient-to-br from-adlerbggradientfrom to-adlerbggradientto p-2 lg:max-h-[100%] xl:px-8"
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            {/* Header */}
            <div className="lg:roboto-black z-20 flex h-20 w-full items-center justify-center gap-2 overflow-hidden p-2 pb-3 text-xl font-bold text-adlerdarkblue lg:text-2xl">
              {!(currentTask === null && currentQuestion === null) &&
                !showAnswerFeedback && (
                  <StyledButton
                    onClick={controller.back}
                    className="roboto-black mr-2 h-8 w-8 p-1 text-xs sm:h-10 sm:w-10 md:h-10 md:w-10 lg:h-10 lg:w-10 xl:h-10 xl:w-10"
                    title={translate("backToolTip").toString()}
                    data-testid="adaptivity-back"
                  >
                    {"\u25C0"}
                  </StyledButton>
                )}

              {currentTask === null && currentQuestion === null && (
                <div
                  className="w-[50px] rounded-full bg-buttonbgblue text-sm lg:w-[50px]"
                  title={translate("adaptivityProgressToolTip").toString()}
                >
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
              {/* Background image for mobile view */}
              <img
                className="visible h-16 -scale-x-100 lg:invisible lg:h-0"
                alt="LearningImage!"
                data-testid="npcImage"
                src={getNPCImage(model, false, emotion)}
              ></img>

              <div className="w-full text-xs lg:text-lg">{headerText}</div>

              {allTasksCompleted && (
                <button
                  onClick={() => {
                    controller.reset();
                  }}
                  className={tailwindMerge(
                    "font-regular box-border flex aspect-square h-8 w-8 cursor-pointer items-center justify-center overflow-hidden rounded-lg border-b-2 border-r-2 border-adlerdarkblue bg-buttonbgblue p-1 text-sm text-adlerdarkblue transition duration-75 ease-in-out hover:cursor-pointer hover:border-adlerdarkblue hover:bg-adleryellow active:translate-x-[1px] active:translate-y-[1px] active:border-b-2 active:border-r-2 active:border-transparent sm:h-10 sm:w-10 md:h-10 md:w-10 lg:h-10 lg:w-10 lg:text-xl xl:h-10 xl:w-10 mobile-portrait:rounded-md",
                    className ?? "",
                  )}
                  data-testid="adaptivity-reset"
                >
                  {"\u21BA"}
                </button>
              )}
              <CloseButton
                onClick={controller.closeModal}
                className="roboto-black h-8 w-8 p-1 text-xs sm:h-10 sm:w-10 md:h-10 md:w-10 lg:h-10 lg:w-10 xl:h-10 xl:w-10"
                title={translate("closeToolTip").toString()}
              >
                <img
                  src={closeIcon}
                  className="sm:w-6 md:w-8 lg:w-10"
                  alt="CloseButton"
                ></img>
              </CloseButton>
            </div>

            {/* Content */}
            <div className="max-h-[80vh] overflow-auto lg:max-h-[16vh] xl:max-h-[20vh]">
              {currentTask === null && currentQuestion === null && (
                <div className="font-regular mb-4 flex h-fit items-center justify-center rounded-lg px-1 !text-sm lg:mx-4">
                  <AdaptivityElementTaskSelection
                    tasks={contentData.tasks}
                    reset={viewmodel.hasResetted}
                    setHeaderText={setHeaderText}
                    onSelectTask={controller.selectTask}
                  />
                </div>
              )}
              {currentTask !== null && currentQuestion === null && (
                <div className="font-regular mb-4 flex items-center justify-center rounded-lg px-1 lg:mx-4">
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
                  <div className="font-regular mb-4 flex h-fit items-center justify-center rounded-lg px-1 lg:mx-4">
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
                <div className="modal-footer flex items-end justify-between pt-4 text-[0.5rem] lg:text-xs">
                  <p>{footerText}</p>
                  {!(currentTask !== null && currentQuestion !== null) && (
                    <div className="group relative flex">
                      <p
                        className="bottom-1 right-1 cursor-pointer"
                        onClick={() => {
                          controller.showFooterTooltip();
                        }}
                        title={translate("legendToolTip").toString()}
                        data-testid="adaptivity-showfootertooltip"
                      >
                        {showFooterTooltip
                          ? translate("legendClose")
                          : translate("legendHover")}
                      </p>

                      {showFooterTooltip && (
                        <div className="fixed right-2 top-2 z-20 flex flex-col gap-2 rounded-xl bg-gradient-to-br from-adlerbggradientfrom to-adlerbggradientto p-4">
                          <div className="flex w-full flex-row justify-between gap-4">
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
                          <table className="table-auto text-left">
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
                                    data-testid="solvedTaskIconImage"
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
                          <h3 className="pt-2 text-left text-sm font-bold">
                            {translate("legendHeaderDifficulties")}
                          </h3>
                          <table className="table-auto text-left">
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
                          <h3 className="pt-2 text-left text-sm font-bold">
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
                                    data-testid="requiredunsolvedTaskIconImage"
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
                                    alt="required triedd icon"
                                    data-testid="requiredtriedTaskIconImage"
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
                          <h3 className="pt-2 text-left text-sm font-bold">
                            {translate("headerlegendInteraction")}
                          </h3>
                          <table>
                            <tbody>
                              <tr>
                                <td className="pr-2 text-xl">{"\u21BA"}</td>
                                <td>{translate("legendReset")}</td>
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
