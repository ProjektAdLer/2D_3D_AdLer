import StyledContainer from "../../ReactRelated/ReactBaseComponents/StyledContainer";
import WorldNamePanelController from "./WorldNamePanelController";
import WorldNamePanelViewModel from "./WorldNamePanelViewModel";
import worldIcon from "../../../../../../Assets/icons/lernwelt_icon.svg";
import useObservable from "../../ReactRelated/CustomHooks/useObservable";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";

export default function WorldNamePanel() {
  const [viewModel] = useBuilder<
    WorldNamePanelViewModel,
    WorldNamePanelController
  >(BUILDER_TYPES.IWorldNamePanelBuilder);

  const [worldName] = useObservable<string>(viewModel?.worldName);

  if (!worldName) return null;

  return (
    <div className="flex justify-center">
      <StyledContainer className="flex items-center justify-center bg-transparent p-13 whitespace-nowrap">
        <img
          className="w-8 lg:w-16"
          src={worldIcon}
          alt="Learning-Space-Icon"
        ></img>
        <div className="text-xl font-extrabold text-white lg:text-4xl text-shadow">
          {worldName}
        </div>
      </StyledContainer>
    </div>
  );
}
