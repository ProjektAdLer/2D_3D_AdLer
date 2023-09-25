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
          <li key={i.toString() + "_" + task.taskID}>
            <StyledButton
              shape="freefloatleft"
              onClick={() => onSelectTask(task.taskID)}
            >
              {task.isCompleted && (
                <img alt="" className={"h-6 lg:h-8 pr-2"} src={correctIcon} />
              )}
              {!task.isCompleted && (
                <img alt="" className={"h-6 lg:h-8 pr-2"} src={wrongIcon} />
              )}

              {task.taskTitle}

              {isRequired && (
                <img
                  alt=""
                  className={"h-6 lg:h-8 pr-2"}
                  src={requiredTaskIcon}
                />
              )}
            </StyledButton>
          </li>
        );
      })
    );
  }, [tasks, onSelectTask]);

  return <ul>{taskButtons}</ul>;
}
