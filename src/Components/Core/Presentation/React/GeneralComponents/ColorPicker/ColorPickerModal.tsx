import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";
import ColorPicker from "./ColorPicker";
import { AdLerUIComponent } from "src/Components/Core/Types/ReactTypes";
import StyledModal from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledModal";
import AvatarColorPalette, {
  AvatarColor,
} from "src/Components/Core/Domain/AvatarModels/AvatarColorPalette";

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
  if (!showModal) return null;
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center h-full bg-blacktrans z-10">
      <div className="flex portrait:flex-col items-center justify-center h-full w-full">
        <div className=" z-50 p-4 rounded-lg bg-gradient-to-br from-adlerbggradientfrom to-adlerbggradientto max-w-[95%] max-h-[95%] overflow-hidden flex flex-col text-adlerdarkblue">
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
          >
            Zurück
          </StyledButton>
        </div>
        <div className="w-1/2"></div>
      </div>
    </div>
  );
}
