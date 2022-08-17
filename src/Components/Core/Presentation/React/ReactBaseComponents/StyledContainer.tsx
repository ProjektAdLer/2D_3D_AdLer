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
        "flex items-center gap-2 p-2 m-3 rounded-lg button-container w-fit h-fit "
      }
      {...restProps}
    >
      {children}
    </div>
  );
}
