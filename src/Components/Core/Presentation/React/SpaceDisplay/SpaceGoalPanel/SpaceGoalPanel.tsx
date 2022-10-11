import StyledContainer from "../../ReactRelated/ReactBaseComponents/StyledContainer";
import SpaceGoalPanelController from "./SpaceGoalPanelController";
import SpaceGoalPanelViewModel from "./SpaceGoalPanelViewModel";
import goalIcon from "../../../../../../Assets/icons/learninggoal-icon-nobg.svg";
import useObservable from "../../ReactRelated/CustomHooks/useObservable";
import { useState } from "react";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";

export default function SpaceGoalPanel() {
  const [viewModel] = useBuilder<
    SpaceGoalPanelViewModel,
    SpaceGoalPanelController
  >(BUILDER_TYPES.ISpaceGoalPanelBuilder);

  const [isOpen, setIsOpen] = useState(false);
  const [goal] = useObservable<string>(viewModel?.goal);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  if (!goal) return null;
  if (!isOpen)
    // wenn nicht geklickt
    return (
      <div className="flex justify-center text-2xl roboto-black text-shadow">
        <StyledContainer
          textColor="white"
          className="flex flex-row justify-center"
          onClick={() => {
            handleClick();
          }}
        >
          <img
            className="w-4 lg:w-10"
            src={goalIcon}
            alt="Learning-Goal-Icon"
          ></img>
          <p className="text-white">Lernziel</p>
        </StyledContainer>
      </div>
    );
  //Wenn geklickt
  else
    return (
      <div className="flex justify-center">
        <StyledContainer
          textColor="white"
          onClick={() => {
            handleClick();
          }}
        >
          <img
            className="w-4 lg:w-10"
            src={goalIcon}
            alt="Learning-Goal-Icon"
          ></img>
          {goal}
        </StyledContainer>
      </div>
    );
}
