import StyledButton from "../../ReactRelated/ReactBaseComponents/StyledButton";
import LoadLearningWorldButtonController from "./LoadLearningWorldButtonController";
import LoadLearningWorldButtonViewModel from "./LoadLearningWorldButtonViewModel";
import debugIcon from "../../../../../../Assets/icons/debug-icon.svg";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";

export default function LoadLearningWorldButton() {
  const [, controller] = useBuilder<
    LoadLearningWorldButtonViewModel,
    LoadLearningWorldButtonController
  >(BUILDER_TYPES.ILoadLearningWorldButtonBuilder);

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
