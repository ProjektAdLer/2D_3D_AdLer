import React from "react";

interface DivProps extends React.HTMLAttributes<HTMLDivElement> {
  textColor?: "white" | "black";
}

export default function StyledContainer({
  color = "black",
  children,
  className,
  ...rest
}: React.DetailedHTMLProps<DivProps, HTMLDivElement>) {
  const divConfig = {
    // Text Colors
    black: "adlertextgrey",
    white: "white",
  };

  return (
    <div
      className={className + " " + "flex gap-2 m-3 w-fit h-fit font-extrabold"}
      {...rest}
    >
      {children}
    </div>
  );
}
