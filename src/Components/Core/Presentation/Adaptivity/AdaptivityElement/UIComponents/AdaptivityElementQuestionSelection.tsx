import { useEffect } from "react";
import { AdaptivityTask } from "../AdaptivityElementViewModel";
import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";
import { AdaptivityElementQuestionDifficultyTypes } from "src/Components/Core/Domain/Types/Adaptivity/AdaptivityElementQuestionDifficultyTypes";
//TODO: change this when key icon is available
import requiredTaskIcon from "../../../../../../Assets/icons/41-required-adaptivity/required-adaptivity.svg";
import AdaptivityElementDifficultyStars, {
  AdaptivityElementDifficultyStarState,
} from "./AdaptivityElementDifficultyStars";

export default function AdaptivityElementQuestionSelection({
  selectedTask,
  setHeaderText,
  onSelectQuestion,
}: {
  selectedTask: AdaptivityTask;
  setHeaderText: (headerText: string) => void;
  onSelectQuestion: (taskID: number) => void;
}) {
  useEffect(() => {
    setHeaderText(
      `Du hast Aufgabengebiet ${selectedTask.taskTitle} ausgewählt. Wähle jetzt eine Schwierigkeit aus.`
    );
  }, [setHeaderText, selectedTask]);

  let questionButtons = selectedTask.questions.map((question) => {
    return (
      <div
        key={question.questionID}
        className="flex flex-row justify-around w-full gap-2"
      >
        <StyledButton
          shape="freefloatcenter"
          className="w-1/3"
          onClick={() => onSelectQuestion(question.questionID)}
        >
          {question.isRequired && (
            <img
              alt=""
              className={"h-6 lg:h-8 pl-4 xl:pl-8"}
              src={requiredTaskIcon}
            />
          )}
          {question.difficulty ===
            AdaptivityElementQuestionDifficultyTypes.easy && (
            <>
              <>{"Leicht"} </>
              <AdaptivityElementDifficultyStars
                easyState={
                  AdaptivityElementDifficultyStarState.RequiredUnsolved
                }
                starClassName="w-6 h-6"
              />
            </>
          )}
          {question.difficulty ===
            AdaptivityElementQuestionDifficultyTypes.medium && (
            <>
              <>{"Medium"} </>
              <AdaptivityElementDifficultyStars
                mediumState={
                  AdaptivityElementDifficultyStarState.RequiredUnsolved
                }
                starClassName="w-6 h-6"
              />
            </>
          )}
          {question.difficulty ===
            AdaptivityElementQuestionDifficultyTypes.hard && (
            <>
              <>{"Schwer"} </>
              <AdaptivityElementDifficultyStars
                hardState={
                  AdaptivityElementDifficultyStarState.RequiredUnsolved
                }
                starClassName="w-6 h-6"
              />
            </>
          )}
        </StyledButton>
        {/* TODO: Compare AdaptivityRules with BackendResponse of question to give right hint */}
        <StyledButton shape="freefloatcenter" className="w-1/3">
          Hinweis
        </StyledButton>
      </div>
    );
  });

  return <div className="flex flex-col w-full gap-2">{questionButtons}</div>;
}
