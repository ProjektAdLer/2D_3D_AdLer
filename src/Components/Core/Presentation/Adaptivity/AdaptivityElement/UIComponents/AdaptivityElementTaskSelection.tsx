import { useEffect, useState } from "react";
import { AdaptivityTask } from "../AdaptivityElementViewModel";
import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";

//TODO: change this when key icon is available
import requiredTaskIcon from "../../../../../../Assets/icons/41-required-adaptivity/required-adaptivity.svg";
import correctIcon from "../../../../../../Assets/icons/40-difficulties-adaptivity/diffculties-adaptivity-required-solved-icon.svg";
import wrongIcon from "../../../../../../Assets/icons/40-difficulties-adaptivity/diffculties-adaptivity-required-unsolved-icon.svg";

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
    setHeaderText("PLACEHOLDER_TEXT_TASK_SELECTION");
  }, [setHeaderText]);

  useEffect(() => {
    setTaskButtons(
      tasks.map((task, i) => {
        const isRequired = task.questions.some(
          (question) => question.isRequired
        );

        return (
          <div key={i.toString() + "_" + task.taskID} className="flex flex-col">
            <StyledButton
              shape="freefloatcenter"
              className="w-full max-w-2xl"
              onClick={() => onSelectTask(task.taskID)}
            >
              <div className="w-full h-full flex justify-between items-center align-center">
                {task.isCompleted && (
                  <img
                    alt=""
                    className={"h-6 lg:h-8 pr-4 xl:pr-8"}
                    src={correctIcon}
                  />
                )}
                {!task.isCompleted && (
                  <img
                    alt=""
                    className={"h-6 lg:h-8 pr-4 xl:pr-8"}
                    src={wrongIcon}
                  />
                )}

                {task.taskTitle}

                {isRequired && (
                  <img
                    alt=""
                    className={"h-6 lg:h-8 pl-4 xl:pl-8"}
                    src={requiredTaskIcon}
                  />
                )}
              </div>
            </StyledButton>
          </div>
        );
      })
    );
  }, [tasks, onSelectTask]);

  return (
    <div className="grid lg:grid-cols-2 gap-4 justify-center items-center gap-x-8">
      {taskButtons}
    </div>
  );
}
