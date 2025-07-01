import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";
import IAvatarEditorController from "./IAvatarEditorController";
import AvatarEditorViewModel from "./AvatarEditorViewModel";
import randomizerIcon from "../../../../Assets/icons/random.svg";
import i18next from "i18next";

interface AvatarEditorRandomizerButtonProps {
  controller: IAvatarEditorController;
  viewModel: AvatarEditorViewModel;
}

export default function AvatarEditorRandomizerButton(
  props: AvatarEditorRandomizerButtonProps,
) {
  return (
    <StyledButton
      onClick={() => {
        props.controller.randomizeAvatarConfig();
      }}
      title={i18next
        .t("randomizerButtonToolTip", { ns: "avatarEditor" })
        .toString()}
    >
      <img
        className="w-10 xl:w-12 "
        src={randomizerIcon}
        alt="Randomizer Icon"
      />
    </StyledButton>
  );
}
