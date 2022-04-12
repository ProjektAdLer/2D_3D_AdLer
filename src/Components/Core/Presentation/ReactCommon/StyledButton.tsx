import React from "react";

export default function StyledButton(
  props: React.HTMLProps<HTMLButtonElement>
) {
  return (
    <button
      className={
        props.className +
        "container-button w-3/4 hover:cursor-pointer text-sm lg:text-xl border-b-4 border-r-4 border-adlerdarkblue active:border-0 m-auto py-1 px-2 bg-adlerblue rounded-lg font-black text-white"
      }
    >
      {props.children}
    </button>
  );
}
