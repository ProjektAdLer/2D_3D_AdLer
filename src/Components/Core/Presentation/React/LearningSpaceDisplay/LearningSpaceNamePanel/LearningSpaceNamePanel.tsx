import StyledContainer from "../../ReactRelated/ReactBaseComponents/StyledContainer";
import LearningSpaceNamePanelController from "./LearningSpaceNamePanelController";
import LearningSpaceNamePanelViewModel from "./LearningSpaceNamePanelViewModel";
import spaceIcon from "../../../../../../Assets/icons/space.svg";
import useObservable from "../../ReactRelated/CustomHooks/useObservable";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import { AdLerUIComponent } from "src/Components/Core/Types/ReactTypes";
import tailwindMerge from "../../../Utils/TailwindMerge";

export default function LearningSpaceNamePanel({
  className,
}: AdLerUIComponent) {
  const [viewModel] = useBuilder<
    LearningSpaceNamePanelViewModel,
    LearningSpaceNamePanelController
  >(BUILDER_TYPES.ILearningWorldNamePanelBuilder);

  const [name] = useObservable<string>(viewModel?.name);

  if (!name) return null;

  return (
    <StyledContainer className={tailwindMerge(className)}>
      <div className="flex items-center justify-between rounded-full bg-white bg-opacity-45 p-1 px-6">
        <img
          className="mr-4 w-8 lg:w-14 portrait:mr-1.5"
          src={spaceIcon}
          alt="Learning-Space-Icon"
        ></img>
        <h1 className="text-md text-outline font-black text-adlerdarkblue lg:text-4xl">
          {name}
        </h1>
      </div>
    </StyledContainer>
  );
}
