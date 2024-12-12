import { useState } from "react";
import AvatarEditorCategoryContentProps from "./AvatarEditorCategoryContentProps";
import { useTranslation } from "react-i18next";
import ColorPickerButton from "~ReactComponents/GeneralComponents/ColorPicker/ColorPickerButton";
import RangeSlider from "~ReactComponents/ReactRelated/ReactBaseComponents/RangeSlider";
import ColorPickerModal from "~ReactComponents/GeneralComponents/ColorPicker/ColorPickerModal";
import AvatarColorPalette from "src/Components/Core/Domain/AvatarModels/AvatarColorPalette";
// TODO: update Icons
import bodySmallIcon from "../../../../../../Assets/icons/body-small.svg";
import bodyBigIcon from "../../../../../../Assets/icons/body-big.svg";

export default function AvatarEditorBodyCategory(
  props: AvatarEditorCategoryContentProps,
) {
  const { t: translate } = useTranslation("avatarEditor");
  const [showModal, setShowModal] = useState(false);
  const [skinColor, setSkinColor] = useState(AvatarColorPalette[0]);

  return (
    <div className="flex flex-col">
      <div className="pb-2 border-b border-gray-500">
        <h1 className="text-2xl font-bold">{translate("bodyColorTitle")}</h1>
      </div>
      <div className="w-full p-2 m-2">
        <ColorPickerButton
          currentColor={skinColor}
          onClick={() => setShowModal(true)}
        />
        <ColorPickerModal
          title={translate("bodyColorTitle")}
          showModal={showModal}
          onClose={() => setShowModal(false)}
          onColorClickFunction={(color) => {
            setSkinColor(color);
          }}
        />
      </div>
      <div className="pb-2 border-b border-gray-500">
        <h1 className="text-2xl font-bold">
          {translate("bodyProportionsTitle")}
        </h1>
      </div>

      <div className="bodyProportionContainer">
        <div className="flex items-center">
          <h3 className="text-xl font-bold">{translate("upperBodyTitle")}</h3>
        </div>
        <div>
          <RangeSlider
            min={0}
            max={1}
            step={0.01}
            callback={console.log}
            displayFactor={100}
            buttons={{ imageLeft: bodySmallIcon, imageRight: bodyBigIcon }}
          />
        </div>

        <div className="flex items-center">
          <h3 className="text-xl font-bold">{translate("lowerBodyTitle")}</h3>
        </div>
        <div>
          <RangeSlider
            min={0}
            max={1}
            step={0.01}
            callback={console.log}
            displayFactor={100}
            buttons={{ imageLeft: bodySmallIcon, imageRight: bodyBigIcon }}
          />
        </div>
      </div>
    </div>
  );
}
