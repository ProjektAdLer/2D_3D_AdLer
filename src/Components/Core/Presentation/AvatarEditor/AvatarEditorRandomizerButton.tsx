import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";
import IAvatarEditorController from "./IAvatarEditorController";
import AvatarEditorViewModel from "./AvatarEditorViewModel";
import useObservable from "~ReactComponents/ReactRelated/CustomHooks/useObservable";
import randomizerIcon from "../../../../Assets/icons/random.svg";

interface AvatarEditorRandomizerButtonProps {
  controller: IAvatarEditorController;
  viewModel: AvatarEditorViewModel;
}

export default function AvatarEditorRandomizerButton(
  props: AvatarEditorRandomizerButtonProps,
) {
  const [hasChanged] = useObservable<boolean>(props.viewModel.hasChanged);

  return (
    <>
      <StyledButton
        onClick={() => {
          props.controller.randomizeAvatarConfig();
        }}
      >
        <img
          className="w-10 xl:w-12 "
          src={randomizerIcon}
          alt="Randomizer Icon"
        />
      </StyledButton>
    </>
  );
}
