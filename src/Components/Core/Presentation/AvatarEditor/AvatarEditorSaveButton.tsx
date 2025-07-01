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
      >
        <img className="w-10 xl:w-12 " src={saveIcon} alt="Save Icon" />
      </StyledButton>
      {hasChanged && (
        <>
          <span className="relative z-50 w-5 h-5 rounded-full pointer-events-none -top-6 right-3 bg-nodehandlecolor"></span>
          <span className="relative z-50 w-5 h-5 rounded-full pointer-events-none animate-ping bg-nodehandlecolor -top-6 right-8"></span>
        </>
      )}
    </>
  );
}
