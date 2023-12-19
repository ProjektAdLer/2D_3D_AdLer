import { useEffect } from "react";
import {
  AdaptivityHint,
  AdaptivityQuestion,
  AdaptivityTask,
} from "../AdaptivityElementViewModel";
import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";
import { AdaptivityElementQuestionDifficultyTypes } from "src/Components/Core/Domain/Types/Adaptivity/AdaptivityElementQuestionDifficultyTypes";
import requiredTaskIcon from "../../../../../../Assets/icons/41-required-adaptivity/required-adaptivity.svg";
import AdaptivityElementDifficultyStars, {
  AdaptivityElementDifficultyStarState,
} from "./AdaptivityElementDifficultyStars";
import { useTranslation } from "react-i18next";

export default function AdaptivityElementQuestionSelection({
  selectedTask,
  setHeaderText,
  onSelectQuestion,
  onSelectHint,
}: {
  selectedTask: AdaptivityTask;
  setHeaderText: (headerText: string) => void;
  onSelectQuestion: (selectedQuestion: AdaptivityQuestion) => void;
  onSelectHint: (
    selectedHint: AdaptivityHint,
    associatedQuestion: AdaptivityQuestion
  ) => void;
}) {
  const { t: translate } = useTranslation("learningElement");

  useEffect(() => {
    setHeaderText(
      translate("taskSelectionTitle", {
        selectedTaskTitle: selectedTask.taskTitle,
      })
    );
  }, [setHeaderText, selectedTask, translate]);

  return (
    <div className="grid w-full gap-4 px-2 py-2">
      {selectedTask.questions.map((question) => {
        let starState = AdaptivityElementDifficultyStarState.RequiredUnsolved;
        if (question.isCompleted === true) {
          starState = AdaptivityElementDifficultyStarState.RequiredSolved;
        } else if (question.isCompleted === false) {
          starState = AdaptivityElementDifficultyStarState.RequiredTried;
        }

        return (
          <div
            key={question.questionID}
            className="grid items-center justify-center w-full grid-cols-3 gap-4 md:grid-cols-2"
          >
            <StyledButton
              shape="freefloatcenter"
              className="w-full col-span-2 md:col-span-1"
              onClick={() => onSelectQuestion(question)}
            >
              <div className="grid items-center w-full h-full grid-cols-5 ">
                {question.difficulty ===
                  AdaptivityElementQuestionDifficultyTypes.easy && (
                  <>
                    <AdaptivityElementDifficultyStars
                      easyState={starState}
                      starClassName="w-4 h-4 md:w-6 md:h-6"
                    />
                    <p className="flex justify-center col-span-3 px-4 text-sm text-start">
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
                    <p className="flex justify-center col-span-3 px-4 text-sm text-start">
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
                    <p className="flex justify-center col-span-3 px-4 text-sm text-start">
                      {translate("hard")}{" "}
                    </p>
                  </>
                )}
                <div className="flex items-center justify-end pr-2">
                  {question.isRequired && (
                    <img
                      alt=""
                      className={"h-5 md:h-7"}
                      src={requiredTaskIcon}
                    />
                  )}

                  {!question.isRequired && <div className="w-16"></div>}
                </div>
              </div>
            </StyledButton>
            <div className="flex flex-row h-full md:gap-4 ">
              {question.hints.length > 0 &&
                question.hints.map((hint) => {
                  if (
                    (hint.showOnIsWrong && question.isCompleted === false) ||
                    (!hint.showOnIsWrong && question.isCompleted === true)
                  ) {
                    return (
                      <StyledButton
                        shape="freefloatcenter"
                        className="w-full h-full "
                        key={"hint-" + hint.hintID}
                        onClick={() => onSelectHint(hint, question)}
                      >
                        <p className="text-sm">Hinweis</p>
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
