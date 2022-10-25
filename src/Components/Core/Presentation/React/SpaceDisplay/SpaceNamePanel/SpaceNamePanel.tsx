import StyledContainer from "../../ReactRelated/ReactBaseComponents/StyledContainer";
import SpaceNamePanelController from "./SpaceNamePanelController";
import SpaceNamePanelViewModel from "./SpaceNamePanelViewModel";
import worldIcon from "../../../../../../Assets/icons/lernwelt_icon.svg";
import useObservable from "../../ReactRelated/CustomHooks/useObservable";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";

export default function SpaceNamePanel() {
  const [viewModel] = useBuilder<
    SpaceNamePanelViewModel,
    SpaceNamePanelController
  >(BUILDER_TYPES.IWorldNamePanelBuilder);

  const [name] = useObservable<string>(viewModel?.name);

  if (!name) return null;

  return (
    <div className="flex justify-center">
      <StyledContainer textColor="white" className="flex items-center">
        <img
          className="w-8 lg:w-14"
          src={worldIcon}
          alt="Learning-World-Icon"
        ></img>
        <div className="text-xl roboto-black lg:text-4xl text-shadow">
          {name}
        </div>
      </StyledContainer>
    </div>
  );
}
