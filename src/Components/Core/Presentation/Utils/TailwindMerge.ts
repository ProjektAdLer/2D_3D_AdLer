import { twMerge } from "tailwind-merge";

export default function tailwindMerge(
  parentClassName: string = "",
  ...classNames: string[]
) {
  classNames = classNames.map((className) => ` ${className}`);

  return twMerge(parentClassName, ...classNames);
}
