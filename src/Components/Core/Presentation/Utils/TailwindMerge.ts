import { twMerge } from "tailwind-merge";

export default function tailwindMerge(
  parentClassName: string = "",
  ...classNames: string[]
) {
  return twMerge(parentClassName, ...classNames);
}
