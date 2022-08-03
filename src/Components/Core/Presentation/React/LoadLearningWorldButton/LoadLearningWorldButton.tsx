import useViewModelControllerProvider from "../CustomHooks/useViewModelControllerProvider";
import StyledButton from "../ReactBaseComponents/StyledButton";
import LoadLearningWorldButtonController from "./LoadLearningWorldButtonController";
import LoadLearningWorldButtonViewModel from "./LoadLearningWorldButtonViewModel";

import debugIcon from "../../../../../Assets/icons/debug-icon.svg";

export default function LoadLearningWorldButton() {
  const [, controllers] = useViewModelControllerProvider<
    LoadLearningWorldButtonViewModel,
    LoadLearningWorldButtonController
  >(LoadLearningWorldButtonViewModel);
  return (
    <StyledButton
      onClick={async () => {
        await controllers[0].loadWorld();
      }}
    >
      <img className="w-6 lg:w-10" src={debugIcon}></img>
    </StyledButton>
  );
}
