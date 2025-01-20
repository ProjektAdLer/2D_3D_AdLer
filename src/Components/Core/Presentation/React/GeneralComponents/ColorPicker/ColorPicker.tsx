import { useTranslation } from "react-i18next";
import { AvatarColor } from "src/Components/Core/Domain/AvatarModels/AvatarColorPalette";
import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";

type Props = {
  color: AvatarColor;
  onClick: (color: AvatarColor) => void;
};

function ColorButton(props: Readonly<Props>) {
  const { t: translate } = useTranslation("avatarEditor");
  return (
    <StyledButton
      className="flex m-2 border colorpicker-colors"
      shape="square"
      color="nothing"
      feedback="nothing"
      style={{ backgroundColor: props.color.hexColor }}
      onClick={() => {
        props.onClick(props.color);
      }}
      title={translate(props.color.nameKey)!}
      data-testid={props.color.nameKey}
    ></StyledButton>
  );
}

type colorPickerProps = {
  colors: AvatarColor[];
  onColorClick: (color: AvatarColor) => void;
};

export default function ColorPicker(props: Readonly<colorPickerProps>) {
  return (
    <div className="inline-grid grid-cols-8 row-span-8 text-adlerdarkblue">
      {props.colors.map((color, index) => {
        return (
          <ColorButton key={index} color={color} onClick={props.onColorClick} />
        );
      })}
    </div>
  );
}
