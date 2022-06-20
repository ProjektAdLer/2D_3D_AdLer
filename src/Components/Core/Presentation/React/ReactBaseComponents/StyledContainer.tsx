import React from "react";

export default function StyledContainer({
  children,
  className,
  ...restProps
}: React.HTMLProps<HTMLDivElement>) {
  return (
    <div
      className={
        className +
        " button-container w-fit fixed h-fit flex gap-2 p-2 m-3 rounded-lg items-center"
      }
      {...restProps}
    >
      {children}
    </div>
  );
}
