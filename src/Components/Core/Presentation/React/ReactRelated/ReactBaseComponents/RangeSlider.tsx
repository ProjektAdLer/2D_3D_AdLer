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
  const {
    initialValue,
    min,
    step: stepProp,
    displayFactor: displayFactorProp,
    fractionDigits: fractionDigitsProp,
    enableInputField: enableInputFieldProp,
    callback,
    display,
    className,
    buttons,
    max,
  } = props;

  const [value, setValue] = useState<number>(initialValue ? initialValue : min);
  const [step] = useState<number>(stepProp ?? 0);
  const [displayFactor] = useState<number>(displayFactorProp ?? 1);
  const [fractionDigits] = useState<number>(fractionDigitsProp ?? 0);
  const [intervalID, setIntervalID] = useState<NodeJS.Timeout>();
  const [intervalActive, setIntervalActive] = useState<boolean>(false);
  const [enableInputField] = useState<boolean>(enableInputFieldProp ?? true);
  const [displayText, setDisplayText] = useState<string>("");

  const intervalDelay = 300; // delay between value in-/decrements in ms

  useEffect(() => {
    callback(value);
  }, [value, callback]);

  useEffect(() => {
    if (display) {
      setDisplayText(display(value));
    }
  }, [display, value]);

  return (
    <div
      className={tailwindMerge(className, "flex grow items-center gap-4 p-2")}
    >
      {buttons && (
        <StyledButton
          shape={"square"}
          className="w-10"
          data-testid="leftRangeSliderButton"
          onMouseDown={() => {
            setIntervalID(
              setInterval(() => {
                setIntervalActive(true);
                setValue((value) => (value - step >= min ? value - step : min));
              }, intervalDelay),
            );
          }}
          onMouseLeave={() => {
            setIntervalActive(false);
            clearInterval(intervalID);
          }}
          onClick={() => {
            if (!intervalActive) {
              setValue((value) => (value - step >= min ? value - step : min));
            }
            setIntervalActive(false);
            clearInterval(intervalID);
          }}
        >
          {buttons.imageLeft && <img src={buttons?.imageLeft} alt="" />}
          {!buttons.imageLeft && "-"}
        </StyledButton>
      )}
      <div className="flex grow !flex-col items-center justify-center pb-8 text-xl font-bold">
        {enableInputField && (
          <input
            type="number"
            className="numberInputField mb-1.5"
            data-testid="rangeInputField_number"
            min={min * displayFactor}
            max={max * displayFactor}
            value={(value * displayFactor).toFixed(fractionDigits)}
            onChange={(e) => {
              let inputValue = parseFloat(e.target.value);
              if (Number.isNaN(inputValue)) {
                return;
              }
              if (inputValue > max * displayFactor) {
                inputValue = max * displayFactor;
              } else if (inputValue < min * displayFactor) {
                inputValue = min * displayFactor;
              }
              setValue(inputValue / displayFactor);
            }}
          ></input>
        )}
        {!enableInputField && !display && <>{value}</>}
        {!enableInputField && display && <>{displayText}</>}
        <input
          className="rangeSlider"
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          name="Slider"
          alt="SliderComponent"
          onChange={(e) => {
            setValue(parseFloat(e.target.value));
          }}
        ></input>
      </div>
      {buttons && (
        <StyledButton
          shape={"square"}
          className="w-10"
          data-testid="rightRangeSliderButton"
          onMouseDown={() => {
            setIntervalID(
              setInterval(() => {
                setIntervalActive(true);
                setValue((value) => (value + step <= max ? value + step : max));
              }, intervalDelay),
            );
          }}
          onMouseLeave={() => {
            setIntervalActive(false);
            clearInterval(intervalID);
          }}
          onClick={() => {
            if (!intervalActive) {
              setValue((value) => (value + step <= max ? value + step : max));
            }
            setIntervalActive(false);
            clearInterval(intervalID);
          }}
        >
          {buttons.imageRight && <img src={buttons?.imageRight} alt="" />}
          {!buttons.imageRight && "+"}
        </StyledButton>
      )}
    </div>
  );
}
