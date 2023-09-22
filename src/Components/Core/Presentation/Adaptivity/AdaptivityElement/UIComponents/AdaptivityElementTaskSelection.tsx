import { useEffect, useState } from "react";
import { AdaptivityTask } from "../AdaptivityElementViewModel";
import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";

//TODO: change this when key icon is available
import requiredTaskIcon from "../../../../../../Assets/icons/01-badges/badge-gold-darkblue-icon-nobg.svg";

export default function AdaptivityElementTaskSelection({
  tasks,
}: {
  tasks: AdaptivityTask[];
}) {
  const [taskButtons, setTaskButtons] = useState<JSX.Element[]>([]);

  useEffect(() => {
    setTaskButtons(
      tasks.map((task, i) => {
        const isRequired = task.questions.some(
          (question) => question.isRequired
        );

        return (
          <li key={i.toString() + ":" + task.taskID}>
            <StyledButton
              shape="freefloatleft"
              icon={isRequired ? requiredTaskIcon : undefined}
            >
              {task.taskTitle}
            </StyledButton>
          </li>
        );
      })
    );
  }, [tasks]);

  return <ul>{taskButtons}</ul>;
}
