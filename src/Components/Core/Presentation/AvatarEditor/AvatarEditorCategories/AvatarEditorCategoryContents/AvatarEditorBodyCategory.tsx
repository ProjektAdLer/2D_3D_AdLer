import { useState } from "react";
import AvatarEditorCategoryContentProps from "./AvatarEditorCategoryContentProps";
import { useTranslation } from "react-i18next";
import ColorPickerButton from "~ReactComponents/GeneralComponents/ColorPicker/ColorPickerButton";
import RangeSlider from "~ReactComponents/ReactRelated/ReactBaseComponents/RangeSlider";
import ColorPickerModal from "~ReactComponents/GeneralComponents/ColorPicker/ColorPickerModal";
// TODO: update Icons
import bodySmallIcon from "../../../../../../Assets/icons/body-small.svg";
import bodyBigIcon from "../../../../../../Assets/icons/body-big.svg";
import useObservable from "~ReactComponents/ReactRelated/CustomHooks/useObservable";

export default function AvatarEditorBodyCategory(
  props: AvatarEditorCategoryContentProps,
) {
  const { t: translate } = useTranslation("avatarEditor");
  const [showModal, setShowModal] = useState(false);
  const [skinColor] = useObservable(props.viewModel.skinColor);

  if (!props.controller || !props.viewModel) return null;
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
          showModal={showModal}
          onClose={() => setShowModal(false)}
          onColorClickFunction={(color) => {
            props.controller.onAvatarConfigChanged({
              skinColor: color,
            });
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
            callback={(value) => {
              props.controller.onAvatarConfigChanged({ roundness: value });
            }}
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
            callback={(value) => {
              props.controller.onAvatarConfigChanged({ roundness: value });
            }}
            displayFactor={100}
            buttons={{ imageLeft: bodySmallIcon, imageRight: bodyBigIcon }}
          />
        </div>
      </div>
    </div>
  );
}
