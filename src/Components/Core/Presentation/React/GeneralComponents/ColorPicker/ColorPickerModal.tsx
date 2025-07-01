import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";
import ColorPicker from "./ColorPicker";
import { AdLerUIComponent } from "src/Components/Core/Types/ReactTypes";
import AvatarColorPalette, {
  AvatarColor,
} from "src/Components/Core/Domain/AvatarModels/AvatarColorPalette";
import { useTranslation } from "react-i18next";

type Props = AdLerUIComponent<{
  title: string;
  colorPalette?: AvatarColor[];
  showModal: boolean;
  onClose: () => void;
  onColorClickFunction: (color: AvatarColor) => void;
}>;

export default function ColorPickerModal({
  title,
  colorPalette = AvatarColorPalette,
  onClose,
  showModal = false,
  onColorClickFunction,
  ...restProps
}: AdLerUIComponent<Props>) {
  const { t: translate } = useTranslation("avatarEditor");

  if (!showModal) return null;
  return (
    <div
      onClick={onClose}
      className="fixed top-0 bottom-0 left-0 right-0 z-10 flex items-center justify-center h-full portrait:z-20 bg-blacktrans"
    >
      <div className="z-50 flex items-center justify-center w-full h-full portrait:flex-col">
        <div
          onClick={(e) => e.stopPropagation()}
          className="  p-4 rounded-lg bg-gradient-to-br from-adlerbggradientfrom to-adlerbggradientto max-w-[95%] max-h-[95%] overflow-hidden flex flex-col text-adlerdarkblue"
        >
          <h1 className="text-2xl font-bold">{title}</h1>
          <ColorPicker
            colors={colorPalette}
            onColorClick={(color) => {
              onColorClickFunction(color);
            }}
          />
          <StyledButton
            className="self-center"
            onClick={onClose}
            shape={"freeFloatCenter"}
            title={translate("ColorButtonBackToolTip").toString()}
          >
            {translate("back").toString()}
          </StyledButton>
        </div>
        <div className="w-1/2"></div>
      </div>
    </div>
  );
}
