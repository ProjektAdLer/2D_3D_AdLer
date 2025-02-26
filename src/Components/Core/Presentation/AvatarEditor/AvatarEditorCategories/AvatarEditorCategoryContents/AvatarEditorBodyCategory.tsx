import { useState } from "react";
import AvatarEditorCategoryContentProps from "./AvatarEditorCategoryContentProps";
import { useTranslation } from "react-i18next";
import ColorPickerButton from "~ReactComponents/GeneralComponents/ColorPicker/ColorPickerButton";
import ColorPickerModal from "~ReactComponents/GeneralComponents/ColorPicker/ColorPickerModal";
// TODO: update Icons
import useObservable from "~ReactComponents/ReactRelated/CustomHooks/useObservable";
import AvatarSkinColorPalette from "src/Components/Core/Domain/AvatarModels/AvatarSkinColorPalette";

export default function AvatarEditorBodyCategory(
  props: AvatarEditorCategoryContentProps,
) {
  const { t: translate } = useTranslation("avatarEditor");
  const [showModal, setShowModal] = useState(false);
  const [skinColor] = useObservable(props.viewModel.skinColor);

  return (
    <div className="flex flex-col">
      <div className="pb-2 border-b border-gray-500">
        <h1 className="text-2xl font-bold">{translate("bodyColorTitle")}</h1>
      </div>
      <div className="w-full p-2 m-2">
        <ColorPickerButton
          currentColor={
            skinColor ?? { id: 0, nameKey: "Black 1", hexColor: "#000000" }
          }
          onClick={() => setShowModal(true)}
        />
        <ColorPickerModal
          title={translate("bodyColorTitle")}
          colorPalette={AvatarSkinColorPalette}
          showModal={showModal}
          onClose={() => setShowModal(false)}
          onColorClickFunction={(color) => {
            props.controller.onAvatarConfigChanged({
              skinColor: color,
            });
          }}
        />
      </div>
    </div>
  );
}
