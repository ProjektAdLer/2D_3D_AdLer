import StyledButton from "../../ReactRelated/ReactBaseComponents/StyledButton";
import LoadSpaceButtonController from "./LoadSpaceButtonController";
import LoadSpaceButtonViewModel from "./LoadSpaceButtonViewModel";
import debugIcon from "../../../../../../Assets/icons/debug-icon.svg";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";

export default function LoadSpaceButton() {
  const [, controller] = useBuilder<
    LoadSpaceButtonViewModel,
    LoadSpaceButtonController
  >(BUILDER_TYPES.ILoadSpaceButtonBuilder);

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
