import React, { useEffect, useRef, useState } from "react";
import tailwindMerge from "../../../Utils/TailwindMerge";
import { AdLerUIComponent } from "src/Components/Core/Types/ReactTypes";

export type StyledButtonColor =
  | "default"
  | "success"
  | "pressed"
  | "locked"
  | "highlight"
  | "active"
  | "nothing";
export type StyledButtonShape =
  | "square"
  | "freeFloatLeft"
  | "freeFloatCenter"
  | "freeFloatCenterNoPadding"
  | "smallSquare";
export type StyledButtonFeedback = "defaultFeedback" | "nothing";

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  shape?: StyledButtonShape;
  color?: StyledButtonColor;
  disabled?: boolean;
  animatedTransition?: boolean;
  icon?: string;
  containerClassName?: string;
  feedback?: StyledButtonFeedback;
}

export default function StyledButton({
  shape = "square",
  color = "default",
  disabled = false,
  animatedTransition = false,
  feedback = "defaultFeedback",
  icon,
  children,
  className,
  containerClassName = "",
  ...rest
}: AdLerUIComponent<React.DetailedHTMLProps<ButtonProps, HTMLButtonElement>>) {
  const buttonConfig = {
    // Background Colors
    default: "bg-buttonbgblue",
    success: "bg-adlergreen",
    pressed: "bg-buttonpressedblue",
    locked: "bg-adlerbuttonlocked",
    highlight:
      "bg-adlerdarkblue text-buttonbgblue hover:text-adlerdarkblue border-buttonbgblue",
    active: "bg-adleryellow",
    nothing: "",

    // Shapes
    square:
      "justify-center p-1 lg:w-16 lg:h-16 md:w-14 md:h-14 sm:w-10 sm:h-10 w-10 h-10 aspect-square mobile-landscape:w-9 mobile-landscape:h-9",
    freeFloatLeft: "px-2 py-1",
    freeFloatCenter: "flex px-2 py-1 justify-center",
    freeFloatCenterNoPadding: "flex justify-center",
    smallSquare: "justify-center px-2 py-1 aspect-square",

    defaultFeedback: "landscape:hover:bg-adleryellow active:bg-adleryellow",
  };

  // Animation for button transition from disabled to enabled
  const [animate, setAnimate] = useState(false);
  const prevDisabledRef = useRef(disabled);

  useEffect(() => {
    if (!disabled && prevDisabledRef.current === true) {
      setAnimate(true);
    }
    prevDisabledRef.current = disabled;
  }, [disabled]);

  return (
    <div className={containerClassName}>
      <button
        disabled={disabled}
        className={tailwindMerge(
          className,
          buttonConfig[shape],
          disabled
            ? "box-border text-adlerdeactivatedtext bg-adlerbuttonlocked flex items-center text-sm rounded-lg lg:text-xl font-regular overflow-hidden grayscale"
            : tailwindMerge(
                "flex items-center text-md md:text-lg rounded-lg hover:cursor-pointer lg:text-xl transition ease-in-out duration-75 active:translate-x-[1px] active:translate-y-[1px] active:border-b-2 active:border-r-2 active:border-transparent text-adlerdarkblue font-regular  border-b-2 border-r-2 border-adlerdarkblue overflow-hidden box-border cursor-pointer ",
                buttonConfig[color],
                buttonConfig[feedback],
              ),
          animate && animatedTransition ? "animate-buttonTransition" : "",
        )}
        {...rest}
      >
        {icon && (
          <img
            alt=""
            className={icon && children ? "h-6 lg:h-8 pr-2" : "h-8 lg:h-12"}
            src={icon}
          ></img>
        )}
        {children}
      </button>
    </div>
  );
}
