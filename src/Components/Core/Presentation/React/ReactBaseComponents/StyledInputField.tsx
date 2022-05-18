import React from "react";

export default function StyledInputField({
  children,
  className,
  ...rest
}: React.HTMLAttributes<HTMLInputElement>) {
  return (
    <div className="control-group flex justify-center">
      <input
        type="text"
        className="login-field login-field border-adlerdarkblue border-2 rounded-lg p-2"
        placeholder="Meesa Input Field!"
      ></input>
    </div>
  );
}
