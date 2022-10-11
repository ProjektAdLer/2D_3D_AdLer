import { ReactNode } from "react";

export default function CheckBoxEntry({
  checked,
  children,
}: {
  checked: boolean;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-row">
      <input type="checkbox" checked={checked} readOnly={true} />
      <div>{children}</div>
    </div>
  );
}
