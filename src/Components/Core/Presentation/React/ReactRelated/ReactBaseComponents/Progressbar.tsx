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
    <div
      className="flex items-center text-center"
      title={props.tooltip}
      data-testid="progressbar"
    >
      {/* icon */}
      {props.icon && (
        <div className="relative items-center align-middle">
          {/* button */}
          {props.button === true && (
            <StyledButton data-testid="progressbarbutton">
              <img
                className={tailwindMerge(
                  props.iconClassName,
                  "absolute w-[48px] items-center align-middle lg:w-[69px]",
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
            <div className="relative flex aspect-square h-10 w-10 items-center justify-center p-1 sm:h-10 sm:w-10 xl:h-12 xl:w-12 onek:h-16 onek:w-16 mobile-landscape:h-9 mobile-landscape:w-9">
              <img
                className={tailwindMerge(
                  props.iconClassName,
                  "absolute w-[48px] items-center align-middle lg:w-[69px]",
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
          "relative -z-20 rounded-full bg-adlerblue/80 align-middle dark:bg-gray-700",
        )}
      >
        <div
          className="absolute -z-10 h-full rounded-full bg-adlerdarkblue"
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
