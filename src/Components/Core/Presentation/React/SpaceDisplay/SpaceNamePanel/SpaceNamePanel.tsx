import StyledContainer from "../../ReactRelated/ReactBaseComponents/StyledContainer";
import SpaceNamePanelController from "./SpaceNamePanelController";
import SpaceNamePanelViewModel from "./SpaceNamePanelViewModel";
import worldIcon from "../../../../../../Assets/icons/14-world/world-icon-nobg.svg";
import useObservable from "../../ReactRelated/CustomHooks/useObservable";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import { AdLerUIComponent } from "src/Components/Core/Types/ReactTypes";
import tailwindMerge from "../../../Utils/TailwindMerge";

export default function SpaceNamePanel({ className }: AdLerUIComponent) {
  const [viewModel] = useBuilder<
    SpaceNamePanelViewModel,
    SpaceNamePanelController
  >(BUILDER_TYPES.IWorldNamePanelBuilder);

  const [name] = useObservable<string>(viewModel?.name);

  if (!name) return null;

  return (
    <StyledContainer className={tailwindMerge(className)}>
      <div className="flex items-center justify-between">
        <img
          className="w-8 mr-4 lg:w-14"
          src={worldIcon}
          alt="Learning-World-Icon"
        ></img>
        <h1 className="text-xl font-black text-adlerdarkblue lg:text-4xl">
          {name}
        </h1>
      </div>
    </StyledContainer>
  );
}
