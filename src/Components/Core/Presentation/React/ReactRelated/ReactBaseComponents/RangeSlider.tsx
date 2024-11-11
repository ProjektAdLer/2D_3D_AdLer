import { useEffect, useState } from "react";
import { AdLerUIComponent } from "src/Components/Core/Types/ReactTypes";
import StyledButton from "./StyledButton";

type buttonsProps = {
  imageLeft?: string;
  imageRight?: string;
};

type RangeSliderProps = {
  min: number;
  max: number;
  step: number;
  initialValue?: number;
  buttons?: buttonsProps; // if buttons are definded without images then - / + buttons will be displayed ~ sb
  callback: (value: number) => void;
} & AdLerUIComponent;

export default function RangeSlider(props: RangeSliderProps) {
  const [value, setValue] = useState<number>(
    props.initialValue ? props.initialValue : props.min,
  );
  const [step] = useState<number>(props.step ? props.step : 0);

  useEffect(() => {
    props.callback(value);
  }, [props, value]);

  return (
    <div className="flex items-center justify-center gap-2 text-xl font-bold">
      {props.buttons && (
        <StyledButton
          shape="smallSquare"
          className="w-10"
          data-testid="leftRangeSliderButton"
          onClick={() =>
            setValue(value - step >= props.min ? value - step : props.min)
          }
        >
          {props.buttons.imageLeft && (
            <img src={props.buttons?.imageLeft} alt="" />
          )}
          {!props.buttons.imageLeft && "-"}
        </StyledButton>
      )}
      <div className="flex !flex-col justify-center items-center">
        <p>{value}</p>
        <input
          type="range"
          min={props.min}
          max={props.max}
          step={props.step}
          value={value}
          name="Slider"
          alt="SliderComponent"
          onChange={(e) => {
            setValue(parseFloat(e.target.value));
          }}
        ></input>
      </div>

      {props.buttons && (
        <StyledButton
          shape="smallSquare"
          className="w-10"
          data-testid="rightRangeSliderButton"
          onClick={() =>
            setValue(value + step <= props.max ? value + step : props.max)
          }
        >
          {props.buttons.imageRight && (
            <img src={props.buttons?.imageRight} alt="" />
          )}
          {!props.buttons.imageRight && "+"}
        </StyledButton>
      )}
    </div>
  );
}
