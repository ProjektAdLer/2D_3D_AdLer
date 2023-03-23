import React from "react";
import tailwindMerge from "../../../Utils/TailwindMerge";
import { AdLerUIComponent } from "src/Components/Core/Types/ReactTypes";

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  shape?: "square" | "freefloatleft" | "freefloatcenter";
  color?: "default" | "success" | "pressed" | "locked";
  disabled?: boolean;
  icon?: string;
}
export default function StyledButton({
  shape = "square",
  color = "default",
  disabled = false,
  icon,
  children,
  className,
  ...rest
}: AdLerUIComponent<React.DetailedHTMLProps<ButtonProps, HTMLButtonElement>>) {
  const buttonConfig = {
    // Background Colors
    default: "bg-buttonbgblue",
    success: "bg-adlergreen",
    pressed: "bg-buttonpressedblue",
    locked: "bg-adlerbuttonlocked",

    // Shapes
    square:
      "justify-center p-1 lg:w-16 lg:h-16 md:w-14 md:h-14 sm:w-10 sm:h-10 w-10 h-10 aspect-square",
    freefloatleft: "px-2 py-1",
    freefloatcenter: "flex px-2 py-1 justify-center",
  };

  return (
    <button
      disabled={disabled}
      className={tailwindMerge(
        className,
        buttonConfig[shape],
        disabled
          ? "text-adlerdeactivatedtext bg-adlerbuttonlocked hover:cursor-default rounded-lg p-2"
          : tailwindMerge(
              "flex items-center text-sm rounded-lg hover:cursor-pointer lg:text-xl transition ease-in-out duration-75 active:translate-x-1 active:translate-y-1 active:border-transparent text-adlerdarkblue font-regular border-t-[1px] border-l-[1px] border-b-4 border-r-4 border-adlerdarkblue overflow-hidden",
              buttonConfig[color]
            )
      )}
      {...rest}
    >
      {icon && <img alt="" className={"h-6 lg:h-8 pr-2"} src={icon}></img>}
      {children}
    </button>
  );
}
