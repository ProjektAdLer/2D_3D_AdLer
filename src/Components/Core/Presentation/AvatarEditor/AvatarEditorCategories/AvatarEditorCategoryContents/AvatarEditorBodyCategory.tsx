import AvatarEditorCategoryContentProps from "./AvatarEditorCategoryContentProps";
import { useTranslation } from "react-i18next";
import ColorPicker from "~ReactComponents/GeneralComponents/ColorPicker/ColorPicker";
import { defaultColorPickerSchema } from "~ReactComponents/GeneralComponents/ColorPicker/ColorPickerColors";
import RangeSlider from "~ReactComponents/ReactRelated/ReactBaseComponents/RangeSlider";

export default function AvatarEditorBodyCategory(
  props: AvatarEditorCategoryContentProps,
) {
  const { t: translate } = useTranslation("avatarEditor");

  return (
    <div className="flex flex-col">
      <div className="pb-2 border-b border-gray-500">
        <h1 className="text-2xl font-bold">{translate("bodyColorTitle")}</h1>
      </div>
      <div className="w-full p-2 m-2">
        <ColorPicker
          colors={defaultColorPickerSchema}
          onColorClick={(color) => {
            console.log(color);
          }}
        />
      </div>
      <div className="pb-2 border-b border-gray-500">
        <h1 className="text-2xl font-bold">{translate("upperBodyTitle")}</h1>
      </div>
      <div>
        <RangeSlider min={0} max={100} step={1} callback={console.log} />
      </div>

      <div className="pb-2 border-b border-gray-500">
        <h1 className="text-2xl font-bold">{translate("lowerBodyTitle")}</h1>
      </div>
      <div>
        <RangeSlider min={0} max={42} step={1} callback={console.log} />
      </div>
    </div>
  );
}