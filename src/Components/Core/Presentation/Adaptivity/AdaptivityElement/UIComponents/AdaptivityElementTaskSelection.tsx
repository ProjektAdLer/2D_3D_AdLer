import { useEffect, useState } from "react";
import { AdaptivityTask } from "../AdaptivityElementViewModel";
import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";

//TODO: change this when key icon is available
import requiredTaskIcon from "../../../../../../Assets/icons/01-badges/badge-gold-darkblue-icon-nobg.svg";
import correctIcon from "../../../../../../Assets/icons/17-1-solution-check/check-solution-icon-nobg.svg";
import wrongIcon from "../../../../../../Assets/icons/35-wrong/wrong-icon-nobg.svg";

export default function AdaptivityElementTaskSelection({
  tasks,
  onSelectTask,
}: {
  tasks: AdaptivityTask[];
  onSelectTask: (taskID: number) => void;
}) {
  const [taskButtons, setTaskButtons] = useState<JSX.Element[]>([]);

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
    <div className="grid lg:grid-cols-2 gap-4 gap-x-8 my-2">{taskButtons}</div>
  );
}
