import React from "react";

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  shape?: "square" | "freefloatleft" | "freefloatcenter";
  color?: "default" | "success";
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

    // Shapes
    square: "justify-center p-1 lg:w-16 md:w-14 sm:w-12 aspect-square",
    freefloatleft: "p-1",
    freefloatcenter: "p-1 justify-center",
  };
  return (
    <button
      className={
        className +
        " " +
        `flex items-center px-2 py-1 text-sm font-black text-white text-shadow border-b-4 border-r-4 rounded-lg hover:cursor-pointer lg:text-xl active:border-transparent border-adlerdarkblue ${buttonConfig[color]} ${buttonConfig[shape]}`
      }
      {...rest}
    >
      {children}
    </button>
  );
}
