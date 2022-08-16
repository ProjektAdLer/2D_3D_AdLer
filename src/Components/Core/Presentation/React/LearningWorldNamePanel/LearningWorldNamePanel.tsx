import useViewModelControllerProvider from "../CustomHooks/useViewModelControllerProvider";
import StyledContainer from "../ReactBaseComponents/StyledContainer";
import LearningWorldNamePanelController from "./LearningWorldNamePanelController";
import LearningWorldNamePanelViewModel from "./LearningWorldNamePanelViewModel";
import roomIcon from "../../../../../Assets/icons/lernraum_icon.svg";
import useObservable from "../CustomHooks/useObservable";
export default function LearningWorldNamePanel() {
  const [viewModels] = useViewModelControllerProvider<
    LearningWorldNamePanelViewModel,
    LearningWorldNamePanelController
  >(LearningWorldNamePanelViewModel);

  const [learningWorldName] = useObservable<string>(viewModels[0]?.worldName);

  if (!learningWorldName) return null;

  return (
    <div className="flex justify-center">
      <StyledContainer className="text-xl font-extrabold text-white p-13 lg:text-4xl text-shadow whitespace-nowrap">
        <img
          className="w-8 lg:w-16"
          src={roomIcon}
          alt="Learning-Room-Icon"
        ></img>
        {learningWorldName}
      </StyledContainer>
    </div>
  );
}
