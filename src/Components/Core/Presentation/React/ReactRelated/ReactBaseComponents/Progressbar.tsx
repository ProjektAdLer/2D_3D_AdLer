import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";
import tailwindMerge from "../../../Utils/TailwindMerge";

type ProgressbarProps = {
  /* Progress bar arguments */
  value: number;
  tooltip?: string;
  max: number;
  progressbarText?: string; // if no displaytext is defined progressbar displays value
  barClassName?: string;
  /* icon arguments */
  button: boolean;
  icon?: string;
  iconClassName?: string;
  iconTextClassName?: string;
  iconText?: string; // text will be displayed in icon. If no icon is defined then level will not be displayed
};

export default function Progressbar(props: Readonly<ProgressbarProps>) {
  return (
    <div className="flex items-center text-center" title={props.tooltip}>
      {/* icon */}
      {props.icon && (
        <div className="relative items-center align-middle">
          {/* button */}
          {props.button === true && (
            <StyledButton>
              <img
                className={tailwindMerge(
                  props.iconClassName,
                  "absolute align-middle items-center w-[48px] lg:w-[69px]",
                )}
                src={props.icon}
                alt="Temp Icon"
              />
              <div
                className={tailwindMerge("z-10", props.iconTextClassName ?? "")}
              >
                {props.iconText}
              </div>
            </StyledButton>
          )}
          {/* no button */}
          {props.button === false && (
            <div className="relative flex items-center justify-center w-10 h-10 p-1 aspect-square mobile-landscape:w-9 mobile-landscape:h-9 sm:w-10 sm:h-10 md:w-14 md:h-14 lg:w-16 lg:h-16">
              <img
                className={tailwindMerge(
                  props.iconClassName,
                  "absolute align-middle items-center w-[48px] lg:w-[69px]",
                )}
                src={props.icon}
                alt="Temp Icon"
              />
              <div
                className={tailwindMerge("z-10", props.iconTextClassName ?? "")}
              >
                {props.iconText}
              </div>
            </div>
          )}
        </div>
      )}
      {/* bar */}
      {/* progress bar */}
      <div
        className={tailwindMerge(
          props.barClassName,
          "relative align-middle rounded-full bg-adlerblue/80 dark:bg-gray-700 -z-20",
        )}
      >
        <div
          className="absolute h-full rounded-full bg-adlerdarkblue -z-10"
          style={{
            width:
              Math.min((props.value / props.max) * 100, 100).toString() + "%",
          }}
        ></div>
        {props.progressbarText ?? Math.min(props.value, props.max)}
      </div>
    </div>
  );
}
