import React, { InputHTMLAttributes } from "react";

export default function StyledPasswordField({
  children,
  className,
  ...rest
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={className + " control-group flex justify-center"}>
      <input
        type="password"
        className="login-field login-field rounded-lg p-2"
        {...rest}
      ></input>
    </div>
  );
}
