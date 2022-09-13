import { InputHTMLAttributes } from "react";

export default function StyledInputField({
  children,
  className,
  ...rest
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={className + " control-group flex justify-center"}>
      <input
        type="text"
        className="login-field rounded-lg p-2"
        {...rest}
      ></input>
    </div>
  );
}
