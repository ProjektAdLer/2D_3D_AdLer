import { useEffect } from "react";
import { AdaptivityTask } from "../AdaptivityElementViewModel";
import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";
import { AdaptivityElementQuestionDifficultyTypes } from "src/Components/Core/Domain/Types/Adaptivity/AdaptivityElementQuestionDifficultyTypes";

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
          {question.difficulty ===
            AdaptivityElementQuestionDifficultyTypes.easy && "Leicht"}
          {question.difficulty ===
            AdaptivityElementQuestionDifficultyTypes.medium && "Medium"}
          {question.difficulty ===
            AdaptivityElementQuestionDifficultyTypes.hard && "Schwer"}
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
