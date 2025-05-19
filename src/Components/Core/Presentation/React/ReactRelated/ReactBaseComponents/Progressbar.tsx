import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";
import tailwindMerge from "../../../Utils/TailwindMerge";

type ProgressbarProps = {
  icon?: string;
  iconClassName?: string;
  value: number;
  max: number;
  barClassName?: string;
  level?: number;
};

export default function Progressbar(props: Readonly<ProgressbarProps>) {
  return (
    <div className="flex items-center text-center">
      {/* icon */}
      {props.icon && (
        <div
          className={tailwindMerge(
            props.iconClassName,
            "relative align-middle items-center font-bold text-center text-yellow-300",
          )}
        >
          <StyledButton className="font-bold text-center text-yellow-300">
            <img
              className={tailwindMerge(
                props.iconClassName,
                "absolute align-middle opacity-50 items-center w-[48px] lg:w-[69px]",
              )}
              src={props.icon}
              alt="Temp Icon"
            />
            {props.level}
          </StyledButton>
        </div>
      )}
      {/* progress bar */}
      <div
        className={tailwindMerge(
          props.barClassName,
          "relative font-bold text-center text-yellow-300 align-middle rounded-full bg-adlerblue/80 dark:bg-gray-700 -z-20",
        )}
      >
        <div
          className="absolute h-full rounded-full bg-adlerdarkblue -z-10"
          style={{
            width:
              Math.min((props.value / props.max) * 100, 100).toString() + "%",
          }}
        ></div>
        {Math.min(props.value, props.max)}
      </div>
    </div>
  );
}
