import { AvatarColor } from "src/Components/Core/Domain/AvatarModels/AvatarColorPalette";
import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";

type Props = {
  color: AvatarColor;
  onClick: (color: AvatarColor) => void;
};

function ColorButton(props: Readonly<Props>) {
  return (
    <StyledButton
      className="flex m-0.5 border colorpicker-colors"
      shape="square"
      color="nothing"
      feedback="nothing"
      style={{ backgroundColor: props.color.hexColor }}
      onClick={() => {
        props.onClick(props.color);
      }}
    ></StyledButton>
  );
}

type colorPickerProps = {
  colors: AvatarColor[];
  onColorClick: (color: AvatarColor) => void;
};

export default function ColorPicker(props: Readonly<colorPickerProps>) {
  return (
    <div className="inline-grid grid-cols-8 gap-2 row-span-8">
      {props.colors.map((color, index) => {
        return (
          <ColorButton key={index} color={color} onClick={props.onColorClick} />
        );
      })}
    </div>
  );
}
