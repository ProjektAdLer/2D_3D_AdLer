import { useEffect, useState } from "react";
import { AdLerUIComponent } from "src/Components/Core/Types/ReactTypes";
import StyledButton from "./StyledButton";
import tailwindMerge from "../../../Utils/TailwindMerge";

type buttonsProps = {
  imageLeft?: string;
  imageRight?: string;
};

type RangeSliderProps = {
  min: number;
  max: number;
  step: number;
  initialValue?: number;
  displayFactor?: number;
  fractionDigits?: number;
  buttons?: buttonsProps; // if buttons are definded without images then - / + buttons will be displayed ~ sb
  enableInputField?: boolean;
  display?: (value: number) => string;
  callback: (value: number) => void;
} & AdLerUIComponent;

export default function RangeSlider(props: RangeSliderProps) {
  const [value, setValue] = useState<number>(
    props.initialValue ? props.initialValue : props.min,
  );
  const [step] = useState<number>(props.step ?? 0);
  const [displayFactor] = useState<number>(props.displayFactor ?? 1);
  const [fractionDigits] = useState<number>(props.fractionDigits ?? 0);
  const [intervalID, setIntervalID] = useState<NodeJS.Timeout>();
  const [intervalActive, setIntervalActive] = useState<boolean>(false);
  const [enableInputField] = useState<boolean>(props.enableInputField ?? true);
  const [displayText, setDisplayText] = useState<string>("");

  const intervalDelay = 300; // delay between value in-/decrements in ms

  useEffect(() => {
    props.callback(value);
    if (props.display) {
      setDisplayText(props.display(value));
    }
  }, [props, value]);

  return (
    <div
      className={tailwindMerge(
        props.className,
        "flex grow items-center gap-4 p-2",
      )}
    >
      {props.buttons && (
        <StyledButton
          shape={"square"}
          className="w-10"
          data-testid="leftRangeSliderButton"
          onMouseDown={() => {
            setIntervalID(
              setInterval(() => {
                setIntervalActive(true);
                setValue((value) =>
                  value - step >= props.min ? value - step : props.min,
                );
              }, intervalDelay),
            );
          }}
          onMouseLeave={() => {
            setIntervalActive(false);
            clearInterval(intervalID);
          }}
          onClick={() => {
            if (!intervalActive) {
              setValue((value) =>
                value - step >= props.min ? value - step : props.min,
              );
            }
            setIntervalActive(false);
            clearInterval(intervalID);
          }}
        >
          {props.buttons.imageLeft && (
            <img src={props.buttons?.imageLeft} alt="" />
          )}
          {!props.buttons.imageLeft && "-"}
        </StyledButton>
      )}
      <div className="flex grow !flex-col items-center justify-center pb-8 text-xl font-bold">
        {enableInputField && (
          <input
            type="number"
            className="numberInputField mb-1.5"
            data-testid="rangeInputField_number"
            min={props.min * displayFactor}
            max={props.max * displayFactor}
            value={(value * displayFactor).toFixed(fractionDigits)}
            onChange={(e) => {
              let inputValue = parseFloat(e.target.value);
              if (Number.isNaN(inputValue)) {
                return;
              }
              if (inputValue > props.max * displayFactor) {
                inputValue = props.max * displayFactor;
              } else if (inputValue < props.min * displayFactor) {
                inputValue = props.min * displayFactor;
              }
              setValue(inputValue / displayFactor);
            }}
          ></input>
        )}
        {!enableInputField && !props.display && <>{value}</>}
        {!enableInputField && props.display && <>{displayText}</>}
        <input
          className="rangeSlider"
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
          shape={"square"}
          className="w-10"
          data-testid="rightRangeSliderButton"
          onMouseDown={() => {
            setIntervalID(
              setInterval(() => {
                setIntervalActive(true);
                setValue((value) =>
                  value + step <= props.max ? value + step : props.max,
                );
              }, intervalDelay),
            );
          }}
          onMouseLeave={() => {
            setIntervalActive(false);
            clearInterval(intervalID);
          }}
          onClick={() => {
            if (!intervalActive) {
              setValue((value) =>
                value + step <= props.max ? value + step : props.max,
              );
            }
            setIntervalActive(false);
            clearInterval(intervalID);
          }}
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
