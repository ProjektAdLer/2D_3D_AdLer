import React from "react";
import tailwindMerge from "../../../Utils/TailwindMerge";
import { AdLerUIComponent } from "src/Components/Core/Types/ReactTypes";

export type StyledButtonColor =
  | "default"
  | "success"
  | "pressed"
  | "locked"
  | "highlight";
export type StyledButtonShape =
  | "square"
  | "freefloatleft"
  | "freefloatcenter"
  | "closebutton"
  | "freefloatcenternopadding";

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  shape?: StyledButtonShape;
  color?: StyledButtonColor;
  disabled?: boolean;
  icon?: string;
  containerClassName?: string;
}
export default function StyledButton({
  shape = "square",
  color = "default",
  disabled = false,
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
    highlight: "bg-nodehandlecolor",

    // Shapes
    square:
      "justify-center p-1 lg:w-16 lg:h-16 md:w-14 md:h-14 sm:w-10 sm:h-10 w-10 h-10 aspect-square",
    freefloatleft: "px-2 py-1",
    freefloatcenter: "flex px-2 py-1 justify-center",
    closebutton:
      "justify-center p-1 md:w-12 md:h-12 sm:w-10 sm:h-10 w-8 h-8 aspect-square",
    freefloatcenternopadding: "flex justify-center",
  };

  return (
    <div className={containerClassName}>
      <button
        disabled={disabled}
        className={tailwindMerge(
          className,
          buttonConfig[shape],
          disabled
            ? "box-border text-adlerdeactivatedtext bg-adlerbuttonlocked flex items-center text-sm rounded-lg lg:text-xl font-regular border-t-[1px] border-l-[1px] border-b-4 border-r-4 border-white overflow-hidden"
            : tailwindMerge(
                "flex items-center text-sm rounded-lg hover:cursor-pointer hover:border-buttonbgblue hover:text-buttonbgblue hover:bg-adlerdarkblue lg:text-xl transition ease-in-out duration-75 active:translate-x-1 active:translate-y-1 active:border-transparent text-adlerdarkblue font-regular border-t-[1px] border-l-[1px] border-b-4 border-r-4 border-adlerdarkblue overflow-hidden box-border cursor-pointer",
                buttonConfig[color]
              )
        )}
        {...rest}
      >
        {icon && <img alt="" className={"h-6 lg:h-8 pr-2"} src={icon}></img>}
        {children}
      </button>
    </div>
  );
}
