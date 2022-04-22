import React from "react";

export default function ButtonContainer({
  children,
  className,
  ...restProps
}: React.HTMLProps<HTMLDivElement>) {
  return (
    <div
      className={
        className +
        "button-container w-fit fixed h-fit flex flex-col gap-2 p-2 m-3 bg-adlergold rounded-lg"
      }
      {...restProps}
    >
      {children}
    </div>
  );
}
