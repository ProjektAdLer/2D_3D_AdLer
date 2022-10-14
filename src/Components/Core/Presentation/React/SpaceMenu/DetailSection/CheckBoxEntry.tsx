import { ReactNode } from "react";

export default function CheckBoxEntry({
  checked,
  children,
}: {
  checked: boolean;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-row gap-x-2">
      <input className="" type="checkbox" checked={checked} readOnly={true} />
      <div className="flex flex-row">{children}</div>
    </div>
  );
}
