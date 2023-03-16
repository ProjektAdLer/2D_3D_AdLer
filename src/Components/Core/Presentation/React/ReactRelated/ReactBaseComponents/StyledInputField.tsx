import { InputHTMLAttributes } from "react";

export default function StyledInputField({
  children,
  className,
  ...rest
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={className + "control-group flex justify-center"}>
      <input
        type="text"
        className="p-2 rounded-lg login-field"
        {...rest}
      ></input>
    </div>
  );
}
