import React from "react";

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
}: React.DetailedHTMLProps<ButtonProps, HTMLButtonElement>) {
  const buttonConfig = {
    // Background Colors
    default: "bg-adlerblue",
    success: "bg-adlergreen",
    pressed: "bg-buttonpressedblue",
    locked: "bg-adlergrey-200",

    // Shapes
    square:
      "justify-center p-1 lg:w-16 lg:h-16 md:w-14 md:h-14 sm:w-10 sm:h-10 w-10 h-10 aspect-square",
    freefloatleft: "px-2 py-1",
    freefloatcenter: "px-2 py-1 justify-center",
  };
  return (
    <button
      disabled={disabled}
      className={
        className +
        " " +
        `flex items-center text-sm font-black  rounded-lg hover:cursor-pointer lg:text-xl active:border-transparent border-adlerdarkblue ${
          disabled
            ? "text-adlergrey-300 bg-adlerdeactivated hover:cursor-default"
            : buttonConfig[color] +
              " " +
              "text-white text-shadow border-b-4 border-r-4"
        } ${buttonConfig[shape]}`
      }
      {...rest}
    >
      {icon && <img className={"h-6 lg:h-8 "} src={icon}></img>}
      <div className="w-1 lg:w-4"></div>
      {children}
      <div className="w-1 lg:w-4"></div>
    </button>
  );
}
