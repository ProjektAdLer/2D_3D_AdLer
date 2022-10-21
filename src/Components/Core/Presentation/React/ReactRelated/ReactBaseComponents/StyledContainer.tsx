import React from "react";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  textColor?: "white" | "black";
}

export default function StyledContainer({
  textColor = "black",
  children,
  className,
  ...rest
}: React.DetailedHTMLProps<ContainerProps, HTMLDivElement>) {
  const containerConfig = {
    // Text Colors
    black: "text-adlertextgrey",
    white: "text-white",
  };

  return (
    <div
      className={
        className +
        " " +
        `flex gap-2 m-3 w-fit h-fit font-bold ${containerConfig[textColor]}`
      }
      {...rest}
    >
      {children}
    </div>
  );
}
