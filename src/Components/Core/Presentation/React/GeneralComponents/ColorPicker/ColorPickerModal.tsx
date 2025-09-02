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
      className="fixed bottom-0 left-0 right-0 top-0 z-10 flex h-full items-center justify-center bg-blacktrans portrait:z-20"
    >
      <div className="z-50 flex h-full w-full items-center justify-center portrait:flex-col">
        <div
          onClick={(e) => e.stopPropagation()}
          className="flex max-h-[95%] max-w-[95%] flex-col overflow-hidden rounded-lg bg-gradient-to-br from-adlerbggradientfrom to-adlerbggradientto p-4 text-adlerdarkblue"
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
            data-testid="colorpicker_close"
          >
            {translate("back").toString()}
          </StyledButton>
        </div>
        <div className="w-1/2"></div>
      </div>
    </div>
  );
}
