import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";

type Props = {
  color: string;
  onClick: (color: string) => void;
};

function ColorButton(props: Readonly<Props>) {
  return (
    <StyledButton
      className="flex m-0.5 border colorpicker-colors"
      shape="square"
      color="nothing"
      feedback="nothing"
      style={{ backgroundColor: props.color }}
      onClick={() => {
        props.onClick(props.color);
      }}
    ></StyledButton>
  );
}

type colorPickerprops = {
  colors: string[];
  onColorClick: (color: string) => void;
};

export default function ColorPicker(props: Readonly<colorPickerprops>) {
  return (
    <div className="grid grid-cols-4 gap-2 lg:grid-cols-8 md:grid-cols-6 place-items-center">
      {props.colors.map((color, index) => {
        return (
          <ColorButton key={index} color={color} onClick={props.onColorClick} />
        );
      })}
    </div>
  );
}
