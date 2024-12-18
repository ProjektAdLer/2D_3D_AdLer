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
    <div>
      <StyledModal showModal={showModal} canClose={false} lefthalfshift={true}>
        <div className="p-2">
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
      </StyledModal>
    </div>
  );
}
