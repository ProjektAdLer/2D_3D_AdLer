import StyledButton from "../../ReactRelated/ReactBaseComponents/StyledButton";
import LoadRoomButtonController from "./LoadRoomButtonController";
import LoadRoomButtonViewModel from "./LoadRoomButtonViewModel";
import debugIcon from "../../../../../../Assets/icons/debug-icon.svg";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";

export default function LoadRoomButton() {
  const [, controller] = useBuilder<
    LoadRoomButtonViewModel,
    LoadRoomButtonController
  >(BUILDER_TYPES.ILoadRoomButtonBuilder);

  if (!controller) return null;

  return (
    <StyledButton
      onClick={async () => {
        await controller.loadWorld();
      }}
    >
      <img className="" src={debugIcon} alt="Debug-Icon"></img>
    </StyledButton>
  );
}
