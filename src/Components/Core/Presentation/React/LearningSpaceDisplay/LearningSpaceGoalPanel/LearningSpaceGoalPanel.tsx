import StyledButton from "../../ReactRelated/ReactBaseComponents/StyledButton";
import LearningSpaceGoalPanelController from "./LearningSpaceGoalPanelController";
import LearningSpaceGoalPanelViewModel from "./LearningSpaceGoalPanelViewModel";
import goalIcon from "../../../../../../Assets/icons/20-goal/goal-icon-nobg.svg";
import useObservable from "../../ReactRelated/CustomHooks/useObservable";
import { useState } from "react";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import TextWithLineBreaks from "~ReactComponents/ReactRelated/ReactBaseComponents/TextWithLineBreaks";

export default function LearningSpaceGoalPanel() {
  const [viewModel] = useBuilder<
    LearningSpaceGoalPanelViewModel,
    LearningSpaceGoalPanelController
  >(BUILDER_TYPES.ILearningSpaceGoalPanelBuilder);

  const [isOpen, setIsOpen] = useState(false);
  const [goals] = useObservable<string[]>(viewModel?.goals);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  if (!goals) return null;
  if (!isOpen)
    // wenn nicht geklickt
    return (
      <div className="font-black text-md lg:text-2xl">
        <StyledButton
          shape="square"
          onClick={() => {
            handleClick();
          }}
        >
          <img
            className="w-4 lg:w-10"
            src={goalIcon}
            alt="Learning-Goal-Icon"
          ></img>
        </StyledButton>
      </div>
    );
  //Wenn geklickt
  else
    return (
      <div className="flex justify-center text-sm lg:text-lg">
        <StyledButton
          shape="freefloatleft"
          className="flex flex-row justify-center h-10 md:h-14 lg:h-16"
          onClick={() => {
            handleClick();
          }}
        >
          <img
            className="w-4 mr-4 lg:w-10"
            src={goalIcon}
            alt="Learning-Goal-Icon"
          ></img>
          {goals.map((goal) => {
            return (
              <TextWithLineBreaks
                text={goal}
                key={"goal_" + goal.substring(0, 8)}
              />
            );
          })}
        </StyledButton>
      </div>
    );
}
