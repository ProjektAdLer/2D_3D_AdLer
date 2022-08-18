import React from "react";

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  shape?: "square" | "free";
  color?: "default" | "login";
}
export default function StyledButton({
  shape = "square",
  color = "default",
  children,
  className,
  ...rest
}: React.DetailedHTMLProps<ButtonProps, HTMLButtonElement>) {
  const buttonConfig = {
    // Border Colors
    default: "bg-adlerblue",
    login: "bg-adlergreen",

    // Shapes
    square: "justify-center p-1 lg:w-16 md:w-14 sm:w-12 aspect-square",
    free: "p-1",
  };
  return (
    <button
      className={
        className +
        " " +
        `flex items-center px-2 py-1 text-sm font-black text-white text-shadow border-b-4 border-r-4 rounded-lg container-button hover:cursor-pointer lg:text-xl active:border-transparent border-adlerdarkblue ${buttonConfig[color]} ${buttonConfig[shape]}`
      }
      {...rest}
    >
      {children}
    </button>
  );
}
