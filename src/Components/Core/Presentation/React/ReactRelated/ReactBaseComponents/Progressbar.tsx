import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";
import tailwindMerge from "../../../Utils/TailwindMerge";

type ProgressbarProps = {
  /* Progress bar arguments */
  value: number;
  max: number;
  progressbarText?: string; // if no displaytext is defined progressbar displays value
  barClassName?: string;
  /* icon arguments */
  button: boolean;
  icon?: string;
  iconClassName?: string;
  iconText?: string; // text will be displayed in icon. If no icon is defined then level will not be displayed
};

export default function Progressbar(props: Readonly<ProgressbarProps>) {
  return (
    <div className="flex items-center text-center">
      {/* icon */}
      {props.icon && (
        <div
          className={tailwindMerge(
            props.iconClassName,
            "relative align-middle items-center",
          )}
        >
          {/* button */}
          {props.button === true && (
            <StyledButton feedback="nothing">
              <img
                className={tailwindMerge(
                  props.iconClassName,
                  "absolute align-middle items-center w-[48px] lg:w-[69px]",
                )}
                src={props.icon}
                alt="Temp Icon"
              />
              <div className="z-10">{props.iconText}</div>
            </StyledButton>
          )}
          {/* no button */}
          {props.button === false && (
            <div className="box-border flex items-center justify-center w-10 h-10 p-1 overflow-hidden text-sm font-bold text-center rounded-lg lg:w-16 lg:h-16 md:w-14 md:h-14 sm:w-10 sm:h-10 aspect-square mobile-landscape:w-9 mobile-landscape:h-9 lg:text-xl font-regular border-adlerdarkblue">
              <img
                className="absolute align-middle items-center w-[48px] lg:w-[69px] -z-10"
                src={props.icon}
                alt="Temp Icon"
              />
              {props.iconText}
            </div>
          )}
        </div>
      )}
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
