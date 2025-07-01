import React from "react";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  textColor?: "white" | "black" | "darkblue";
  toolTip?: string;
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
    darkblue: "text-adlerdarkblue",
  };

  return (
    <div
      className={
        className +
        " " +
        `flex gap-2 m-2 w-fit h-fit ${containerConfig[textColor]}`
      }
      {...rest}
      title={rest.toolTip}
    >
      {children}
    </div>
  );
}
