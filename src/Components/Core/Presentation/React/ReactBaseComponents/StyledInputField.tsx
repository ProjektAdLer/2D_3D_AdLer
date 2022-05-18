import React from "react";

export default function StyledInputField({
  children,
  className,
  ...rest
}: React.HTMLAttributes<HTMLInputElement>) {
  return (
    <div className={className + " control-group flex justify-center"}>
      <input
        type="text"
        className="login-field rounded-lg p-2"
        placeholder="Meesa Input Field!"
      ></input>
    </div>
  );
}
