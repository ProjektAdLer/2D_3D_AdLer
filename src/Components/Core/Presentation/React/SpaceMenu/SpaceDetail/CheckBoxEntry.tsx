import { ReactNode } from "react";

interface CheckBoxEntryProps extends React.HTMLAttributes<HTMLDivElement> {
  checked: boolean;
  children: ReactNode;
}

export default function CheckBoxEntry({
  checked,
  children,
  className,
  ...rest
}: React.DetailedHTMLProps<CheckBoxEntryProps, HTMLDivElement>) {
  return (
    <div className={className + " " + "flex flex-row gap-x-2 w-full"} {...rest}>
      <input
        className="pointer-events-none"
        type="checkbox"
        checked={checked}
        readOnly={true}
      />
      <div className="flex flex-row w-full">{children}</div>
    </div>
  );
}
