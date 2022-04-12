import React from "react";

export default function ButtonContainer(
  props: React.HTMLProps<HTMLDivElement>
) {
  return (
    <div className="button-container w-1/12 fixed h-fit top-0 left-0 flex flex-col gap-2 p-2 m-3 bg-adlergold rounded-lg">
      {props.children}
    </div>
  );
}
