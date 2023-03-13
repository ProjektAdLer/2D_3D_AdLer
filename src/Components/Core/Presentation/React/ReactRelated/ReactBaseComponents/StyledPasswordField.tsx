import React, { InputHTMLAttributes } from "react";

export default function StyledPasswordField({
  children,
  className,
  ...rest
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={className + "control-group flex justify-center"}>
      <input
        type="password"
        className="p-2 rounded-lg login-field"
        {...rest}
      ></input>
    </div>
  );
}
