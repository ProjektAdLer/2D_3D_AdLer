import StyledContainer from "../../ReactRelated/ReactBaseComponents/StyledContainer";
import LearningWorldNamePanelController from "./LearningWorldNamePanelController";
import LearningWorldNamePanelViewModel from "./LearningWorldNamePanelViewModel";
import worldIcon from "../../../../../../Assets/icons/lernwelt_icon.svg";
import useObservable from "../../ReactRelated/CustomHooks/useObservable";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";

export default function LearningWorldNamePanel() {
  const [viewModel] = useBuilder<
    LearningWorldNamePanelViewModel,
    LearningWorldNamePanelController
  >(BUILDER_TYPES.ILearningWorldNamePanelBuilder);

  const [learningWorldName] = useObservable<string>(viewModel?.worldName);

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
