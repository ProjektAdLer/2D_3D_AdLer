import useViewModelControllerProvider from "../CustomHooks/useViewModelControllerProvider";
import StyledContainer from "../ReactBaseComponents/StyledContainer";
import LearningWorldGoalPanelController from "./LearningWorldGoalPanelController";
import LearningWorldGoalPanelViewModel from "./LearningWorldGoalPanelViewModel";
import goalIcon from "../../../../../Assets/icons/learninggoal-icon-nobg.svg";
import useObservable from "../CustomHooks/useObservable";
import { useState } from "react";

export default function LearningWorldGoalPanel() {
  const [viewModels] = useViewModelControllerProvider<
    LearningWorldGoalPanelViewModel,
    LearningWorldGoalPanelController
  >(LearningWorldGoalPanelViewModel);

  const [isOpen, setIsOpen] = useState(false);
  const [learningWorldGoal] = useObservable<string>(viewModels[0]?.worldGoal);

  //   if (!learningWorldGoal) return null;
  if (!isOpen)
    // wenn nicht geklickt
    return (
      <div className="flex justify-center">
        <StyledContainer
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <img
            className="w-4 lg:w-10"
            src={goalIcon}
            alt="Learning-Room-Icon"
          ></img>
          {learningWorldGoal}
        </StyledContainer>
      </div>
    );
  //Wenn geklickt
  else
    return (
      <div className="flex justify-center text-2xl text-white roboto-black text-shadow">
        <StyledContainer
          className="flex flex-row justify-center"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <img
            className="w-4 lg:w-10"
            src={goalIcon}
            alt="Learning-Goal-Icon"
          ></img>
          <p>Lernziel</p>
        </StyledContainer>
      </div>
    );
}
