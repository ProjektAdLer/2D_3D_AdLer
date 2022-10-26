import React from "react";

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  shape?: "square" | "freefloatleft" | "freefloatcenter";
  color?: "default" | "success" | "pressed";
}
export default function StyledButton({
  shape = "square",
  color = "default",
  children,
  className,
  ...rest
}: React.DetailedHTMLProps<ButtonProps, HTMLButtonElement>) {
  const buttonConfig = {
    // Background Colors
    default: "bg-adlerblue",
    success: "bg-adlergreen",
    pressed: "bg-adlerblue-900",

    // Shapes
    square:
      "justify-center p-1 lg:w-16 lg:h-16 md:w-14 md:h-14 sm:w-10 sm:h-10 w-10 h-10 aspect-square",
    freefloatleft: "px-2 py-1",
    freefloatcenter: "px-2 py-1 justify-center",
  };
  return (
    <button
      className={
        className +
        " " +
        `flex items-center text-sm font-black text-white text-shadow border-b-4 border-r-4 rounded-lg hover:cursor-pointer lg:text-xl active:border-transparent border-adlerdarkblue ${buttonConfig[color]} ${buttonConfig[shape]}`
      }
      {...rest}
    >
      {children}
    </button>
  );
}
