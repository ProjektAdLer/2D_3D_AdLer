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
        "flex gap-2 m-3 w-fit h-fit text-xl font-extrabold text-white text-shadow"
      }
      {...restProps}
    >
      {children}
    </div>
  );
}
