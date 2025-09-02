import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";
import IAvatarEditorController from "./IAvatarEditorController";
import AvatarEditorViewModel from "./AvatarEditorViewModel";
import useObservable from "~ReactComponents/ReactRelated/CustomHooks/useObservable";
import saveIcon from "../../../../Assets/icons/save.svg";
import { useTranslation } from "react-i18next";

interface AvatarEditorSaveButtonProps {
  controller: IAvatarEditorController;
  viewModel: AvatarEditorViewModel;
}

export default function AvatarEditorSaveButton(
  props: AvatarEditorSaveButtonProps,
) {
  const [hasChanged] = useObservable<boolean>(props.viewModel.hasChanged);

  const { t: translate } = useTranslation("avatarEditor");

  return (
    <>
      <StyledButton
        onClick={() => {
          props.controller.saveAvatarConfig();
        }}
        title={translate("saveButtonToolTip").toString()}
        data-testid="avatarEditorSave"
      >
        <img className="w-10 xl:w-12" src={saveIcon} alt="Save Icon" />
      </StyledButton>
      {hasChanged && (
        <>
          <span className="pointer-events-none relative -top-6 right-3 z-50 h-5 w-5 rounded-full bg-nodehandlecolor"></span>
          <span className="pointer-events-none relative -top-6 right-8 z-50 h-5 w-5 animate-ping rounded-full bg-nodehandlecolor"></span>
        </>
      )}
    </>
  );
}
