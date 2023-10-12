import { useEffect, useState } from "react";
import {
  AdaptivityQuestion,
  AdaptivityTask,
} from "../AdaptivityElementViewModel";
import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";
import AdaptivityElementDifficultyStars, {
  AdaptivityElementDifficultyStarState,
} from "./AdaptivityElementDifficultyStars";
import { AdaptivityElementQuestionDifficultyTypes } from "src/Components/Core/Domain/Types/Adaptivity/AdaptivityElementQuestionDifficultyTypes";

//TODO: change this when key icon is available
import requiredTaskIcon from "../../../../../../Assets/icons/41-required-adaptivity/required-adaptivity.svg";

export function getAdaptivityQuestionStarState(
  question: AdaptivityQuestion | undefined
): AdaptivityElementDifficultyStarState {
  if (question === undefined) return AdaptivityElementDifficultyStarState.Empty;
  else if (question.isRequired) {
    if (question.isCompleted === true)
      return AdaptivityElementDifficultyStarState.RequiredSolved;
    else if (question.isCompleted === false)
      return AdaptivityElementDifficultyStarState.RequiredTried;
    else return AdaptivityElementDifficultyStarState.RequiredUnsolved;
  } else {
    if (question.isCompleted === true)
      return AdaptivityElementDifficultyStarState.NotRequiredSolved;
    else if (question.isCompleted === false)
      return AdaptivityElementDifficultyStarState.NotRequiredTried;
    else return AdaptivityElementDifficultyStarState.NotRequiredUnsolved;
  }
}

export default function AdaptivityElementTaskSelection({
  tasks,
  setHeaderText,
  onSelectTask,
}: {
  tasks: AdaptivityTask[];
  setHeaderText: (headerText: string) => void;
  onSelectTask: (taskID: number) => void;
}) {
  const [taskButtons, setTaskButtons] = useState<JSX.Element[]>([]);

  useEffect(() => {
    setHeaderText(
      "Hallo Freund, ich helfe dir zu lernen. Such dir ein Thema aus und wir arbeiten gemeinsam an deinem Wissen."
    );
  }, [setHeaderText]);

  useEffect(() => {
    setTaskButtons(
      tasks.map((task, i) => {
        const isRequired =
          // task.questions.some(
          //   (question) => question.isRequired
          // ) &&
          task.isRequired;

        const easyStatus = getAdaptivityQuestionStarState(
          task.questions.find(
            (question) =>
              question.difficulty ===
              AdaptivityElementQuestionDifficultyTypes.easy
          )
        );
        const mediumStatus = getAdaptivityQuestionStarState(
          task.questions.find(
            (question) =>
              question.difficulty ===
              AdaptivityElementQuestionDifficultyTypes.medium
          )
        );
        const hardStatus = getAdaptivityQuestionStarState(
          task.questions.find(
            (question) =>
              question.difficulty ===
              AdaptivityElementQuestionDifficultyTypes.hard
          )
        );

        return (
          <div key={i.toString() + "_" + task.taskID} className="flex flex-col">
            <StyledButton
              shape="freefloatcenter"
              className="w-full max-w-2xl"
              onClick={() => onSelectTask(task.taskID)}
            >
              <div className="flex items-center justify-between w-full h-full align-center">
                <div className="w-1/10">
                  {isRequired && (
                    <img
                      alt=""
                      className={"h-6 lg:h-8 pl-4 xl:pl-8"}
                      src={requiredTaskIcon}
                      hidden={!isRequired}
                    />
                  )}
                </div>

                <p className="w-2/3">{task.taskTitle}</p>

                <AdaptivityElementDifficultyStars
                  easyState={easyStatus}
                  mediumState={mediumStatus}
                  hardState={hardStatus}
                  starClassName="w-6 h-6"
                />
              </div>
            </StyledButton>
          </div>
        );
      })
    );
  }, [tasks, onSelectTask]);

  return (
    <div className="grid justify-center gap-4 lg:grid-cols-2 gap-x-8">
      {taskButtons}
    </div>
  );
}
