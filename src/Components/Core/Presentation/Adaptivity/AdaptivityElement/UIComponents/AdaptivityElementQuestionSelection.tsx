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
  useEffect(() => {
    setHeaderText(
      `Du hast Aufgabengebiet ${selectedTask.taskTitle} ausgewählt. Wähle jetzt eine Schwierigkeit aus.`
    );
  }, [setHeaderText, selectedTask]);

  return (
    <div className="grid w-full py-2 px-2 gap-4">
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
            className="grid grid-cols-3 md:grid-cols-2 w-full justify-center items-center gap-4"
          >
            <StyledButton
              shape="freefloatcenter"
              className="w-full col-span-2 md:col-span-1"
              onClick={() => onSelectQuestion(question)}
            >
              <div className="grid grid-cols-5 w-full h-full items-center ">
                {question.difficulty ===
                  AdaptivityElementQuestionDifficultyTypes.easy && (
                  <>
                    <AdaptivityElementDifficultyStars
                      easyState={starState}
                      starClassName="w-4 h-4 md:w-6 md:h-6"
                    />
                    <p className="text-start text-sm px-4 col-span-3 flex justify-center">
                      {"Leicht"}{" "}
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
                    <p className="text-start text-sm px-4 col-span-3 flex justify-center">
                      {"Mittelschwer"}{" "}
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
                    <p className="text-start text-sm px-4 col-span-3 flex justify-center">
                      {"Schwer"}{" "}
                    </p>
                  </>
                )}
                <div className="flex justify-end items-center pr-2">
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
            <div className="flex flex-row md:gap-4 h-full ">
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
