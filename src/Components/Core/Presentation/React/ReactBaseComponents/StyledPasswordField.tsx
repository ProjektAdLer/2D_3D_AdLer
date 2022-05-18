import React from "react";

export default function StyledPasswordField({
  children,
  className,
  ...rest
}: React.HTMLAttributes<HTMLInputElement>) {
  return (
    <div className="control-group flex justify-center">
      <input
        type="password"
        className="login-field login-field border-adlerdarkblue border-2 rounded-lg p-2"
        placeholder="Meesa Password Field!"
      ></input>
    </div>
  );
}
