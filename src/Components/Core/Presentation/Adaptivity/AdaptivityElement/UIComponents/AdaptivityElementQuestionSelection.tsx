import { useEffect } from "react";
import {
  AdaptivityHint,
  AdaptivityQuestion,
  AdaptivityTask,
} from "../AdaptivityElementViewModel";
import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";
import { AdaptivityElementQuestionDifficultyTypes } from "src/Components/Core/Domain/Types/Adaptivity/AdaptivityElementQuestionDifficultyTypes";
import AdaptivityElementDifficultyStars, {
  AdaptivityElementDifficultyStarState,
} from "./AdaptivityElementDifficultyStars";
import { useTranslation } from "react-i18next";

import requiredTaskIcon from "../../../../../../Assets/icons/required.svg";
import solvedTaskIcon from "../../../../../../Assets/icons/check-solution.svg";

export default function AdaptivityElementQuestionSelection({
  selectedTask,
  setHeaderText,
  onSelectQuestion,
  onSelectHint,
}: Readonly<{
  selectedTask: AdaptivityTask;
  setHeaderText: (headerText: string) => void;
  onSelectQuestion: (selectedQuestion: AdaptivityQuestion) => void;
  onSelectHint: (
    selectedHint: AdaptivityHint,
    associatedQuestion: AdaptivityQuestion,
  ) => void;
}>) {
  const { t: translate } = useTranslation("learningElement");

  useEffect(() => {
    setHeaderText(
      translate("taskSelectionTitle", {
        selectedTaskTitle: selectedTask.taskTitle,
      }),
    );
  }, [setHeaderText, selectedTask, translate]);

  return (
    <div className="grid w-full gap-4 px-2 py-2">
      {selectedTask.questions.map((question) => {
        let starState =
          AdaptivityElementDifficultyStarState.NotRequiredUnsolved;
        if (question.isRequired === true) {
          starState = AdaptivityElementDifficultyStarState.RequiredUnsolved;
        }
        if (question.isCompleted === true && question.isRequired === true) {
          starState = AdaptivityElementDifficultyStarState.RequiredSolved;
        } else if (
          question.isCompleted === false &&
          question.isRequired === true
        ) {
          starState = AdaptivityElementDifficultyStarState.RequiredTried;
        } else if (
          question.isCompleted === true &&
          question.isRequired === false
        ) {
          starState = AdaptivityElementDifficultyStarState.NotRequiredSolved;
        } else if (
          question.isCompleted === false &&
          question.isRequired === false
        ) {
          starState = AdaptivityElementDifficultyStarState.NotRequiredTried;
        }

        return (
          <div
            key={question.questionID}
            className="flex w-full items-center gap-4"
          >
            <StyledButton
              shape="freeFloatCenter"
              className="col-span-2 w-full md:col-span-1"
              onClick={() => onSelectQuestion(question)}
              title={translate("questionToolTip").toString()}
              data-testid={`adaptivity-question-${question.questionID}`}
            >
              <div className="grid h-full w-full grid-cols-5 items-center">
                {question.difficulty ===
                  AdaptivityElementQuestionDifficultyTypes.easy && (
                  <>
                    <AdaptivityElementDifficultyStars
                      easyState={starState}
                      starClassName="w-4 h-4 md:w-6 md:h-6"
                    />
                    <p className="col-span-3 flex justify-center px-4 text-start text-sm">
                      {translate("easy")}{" "}
                    </p>
                  </>
                )}
                {question.difficulty ===
                  AdaptivityElementQuestionDifficultyTypes.medium && (
                  <>
                    <AdaptivityElementDifficultyStars
                      mediumState={starState}
                      starClassName="w-4 h-4 md:w-6 md:h-6"
                    />
                    <p className="col-span-3 flex justify-center px-4 text-start text-sm">
                      {translate("normal")}{" "}
                    </p>
                  </>
                )}
                {question.difficulty ===
                  AdaptivityElementQuestionDifficultyTypes.hard && (
                  <>
                    <AdaptivityElementDifficultyStars
                      hardState={starState}
                      starClassName="w-4 h-4 md:w-6 md:h-6"
                    />
                    <p className="col-span-3 flex justify-center px-4 text-start text-sm">
                      {translate("hard")}{" "}
                    </p>
                  </>
                )}
                <div className="flex items-center justify-end pr-2">
                  {question.isRequired && !question.isCompleted && (
                    <img
                      alt=""
                      className={"h-5 md:h-7"}
                      src={requiredTaskIcon}
                      title={translate("legendTaskRequired").toString()}
                      data-testid={`adaptivity-star-required-notcompleted-${question.questionID}`}
                    />
                  )}
                  {question.isRequired && question.isCompleted && (
                    <img
                      alt=""
                      className={"h-5 md:h-7"}
                      src={solvedTaskIcon}
                      title={translate("legendTaskRequiredSolved").toString()}
                      data-testid={`adaptivity-star-required-completed-${question.questionID}`}
                    />
                  )}

                  {!question.isRequired && <div className="w-16"></div>}
                </div>
              </div>
            </StyledButton>
            <div className="flex h-full flex-row md:gap-4">
              {question.hints.length > 0 &&
                question.hints.map((hint) => {
                  if (
                    (hint.showOnIsWrong && question.isCompleted === false) ||
                    (!hint.showOnIsWrong && question.isCompleted === true)
                  ) {
                    return (
                      <StyledButton
                        shape="freeFloatCenter"
                        className="h-full w-full"
                        key={"hint-" + hint.hintID}
                        onClick={() => onSelectHint(hint, question)}
                        title={translate("hintToolTip").toString()}
                        data-testid={`adaptivity-question-hint-${question.questionID}`}
                      >
                        <p className="text-sm">
                          {translate("hintButton").toString()}
                        </p>
                      </StyledButton>
                    );
                  } else return null;
                })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
