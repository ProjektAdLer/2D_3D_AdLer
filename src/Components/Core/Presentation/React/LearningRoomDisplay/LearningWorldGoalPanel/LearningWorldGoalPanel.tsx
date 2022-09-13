import StyledContainer from "../../ReactRelated/ReactBaseComponents/StyledContainer";
import LearningWorldGoalPanelController from "./LearningWorldGoalPanelController";
import LearningWorldGoalPanelViewModel from "./LearningWorldGoalPanelViewModel";
import goalIcon from "../../../../../../Assets/icons/learninggoal-icon-nobg.svg";
import useObservable from "../../ReactRelated/CustomHooks/useObservable";
import { useState } from "react";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";

export default function LearningWorldGoalPanel() {
  const [viewModel] = useBuilder<
    LearningWorldGoalPanelViewModel,
    LearningWorldGoalPanelController
  >(BUILDER_TYPES.ILearningWorldGoalPanelBuilder);

  const [isOpen, setIsOpen] = useState(false);
  const [learningWorldGoal] = useObservable<string>(viewModel?.worldGoal);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  if (!learningWorldGoal) return null;
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
          {learningWorldGoal}
        </StyledContainer>
      </div>
    );
}
