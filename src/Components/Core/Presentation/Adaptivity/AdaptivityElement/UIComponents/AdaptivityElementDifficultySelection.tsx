import { useEffect, useState } from "react";
import { AdaptivityTask } from "../AdaptivityElementViewModel";
import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";

export default function AdaptivityElementDifficultySelection({
  selectedTask,
  setHeaderText,
  onSelectDifficulty,
}: {
  selectedTask: AdaptivityTask;
  setHeaderText: (headerText: string) => void;
  onSelectDifficulty: (taskID: number) => void;
}) {
  const [difficultyButtons, setDifficultyButtons] = useState<JSX.Element[]>([]);

  useEffect(() => {
    setHeaderText(
      `Du hast Aufgabengebiet ${selectedTask.taskTitle} ausgewählt. Wähle jetzt eine Schwierigkeit aus.`
    );
  }, [setHeaderText]);

  useEffect(() => {
    setDifficultyButtons(
      selectedTask.questions.map((question) => {
        return (
          <div
            key={question.questionID}
            className="flex flex-row w-[100%] gap-2"
          >
            <div className="flex w-[33%] ">
              {question.difficulty === 0 && (
                <StyledButton
                  shape="freefloatcenter"
                  className="w-full max-w-2xl"
                  onClick={() => onSelectDifficulty(question.questionID)}
                >
                  Leicht
                </StyledButton>
              )}
              {/* TODO: Add Hinweis */}
            </div>
            <div className="flex w-[33%] ">
              {question.difficulty === 100 && (
                <StyledButton
                  shape="freefloatcenter"
                  className="w-full max-w-2xl"
                  onClick={() => onSelectDifficulty(question.questionID)}
                >
                  Medium
                </StyledButton>
              )}
              {/* TODO: Add Hinweis */}
            </div>
            <div className="flex w-[33%]">
              {question.difficulty === 200 && (
                <StyledButton
                  shape="freefloatcenter"
                  className="w-full max-w-2xl"
                  onClick={() => onSelectDifficulty(question.questionID)}
                >
                  Schwer
                </StyledButton>
              )}
              {/* TODO: Add Hinweis */}
            </div>
          </div>
        );
      })
    );
  }, [selectedTask]);

  return <div className="flex w-[100%]">{difficultyButtons}</div>;
}
