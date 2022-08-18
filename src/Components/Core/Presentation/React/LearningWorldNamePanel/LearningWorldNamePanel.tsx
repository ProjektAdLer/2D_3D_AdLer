import useViewModelControllerProvider from "../CustomHooks/useViewModelControllerProvider";
import StyledContainer from "../ReactBaseComponents/StyledContainer";
import LearningWorldNamePanelController from "./LearningWorldNamePanelController";
import LearningWorldNamePanelViewModel from "./LearningWorldNamePanelViewModel";
import worldIcon from "../../../../../Assets/icons/lernwelt_icon.svg";
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
      <StyledContainer className="flex items-center justify-center text-xl font-extrabold text-white bg-transparent p-13 lg:text-4xl text-shadow whitespace-nowrap">
        <img
          className="w-8 lg:w-16"
          src={worldIcon}
          alt="Learning-Room-Icon"
        ></img>
        {learningWorldName}
      </StyledContainer>
    </div>
  );
}
