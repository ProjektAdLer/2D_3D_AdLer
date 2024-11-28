import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";
import ColorPicker from "./ColorPicker";
import { defaultColorPickerSchema } from "./ColorPickerColors";
import { AdLerUIComponent } from "src/Components/Core/Types/ReactTypes";
import StyledModal from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledModal";

type Props = AdLerUIComponent<{
  showModal: boolean;
  onClose: () => void;
  onColorClickFunction: (color: string) => void;
}>;

export default function ColorPickerModal({
  onClose,
  showModal = false,
  onColorClickFunction,
  ...restProps
}: AdLerUIComponent<Props>) {
  if (!showModal) return null;
  return (
    <div>
      <StyledModal showModal={showModal} canClose={false}>
        <ColorPicker
          colors={defaultColorPickerSchema}
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
      </StyledModal>
    </div>
  );
}
