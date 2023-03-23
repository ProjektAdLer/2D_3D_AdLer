import StyledButton from "../../ReactRelated/ReactBaseComponents/StyledButton";
import SpaceGoalPanelController from "./SpaceGoalPanelController";
import SpaceGoalPanelViewModel from "./SpaceGoalPanelViewModel";
import goalIcon from "../../../../../../Assets/icons/20-goal/goal-icon-nobg.svg";
import useObservable from "../../ReactRelated/CustomHooks/useObservable";
import { useState } from "react";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import TextWithLineBreaks from "~ReactComponents/ReactRelated/ReactBaseComponents/TextWithLineBreaks";

export default function SpaceGoalPanel() {
  const [viewModel] = useBuilder<
    SpaceGoalPanelViewModel,
    SpaceGoalPanelController
  >(BUILDER_TYPES.ISpaceGoalPanelBuilder);

  const [isOpen, setIsOpen] = useState(false);
  const [goals] = useObservable<string[]>(viewModel?.goals);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  if (!goals) return null;
  if (!isOpen)
    // wenn nicht geklickt
    return (
      <div className="font-black text-md lg:text-2xl text-shadow">
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
            return <TextWithLineBreaks text={goal} key={Math.random()} />;
          })}
        </StyledButton>
      </div>
    );
}
