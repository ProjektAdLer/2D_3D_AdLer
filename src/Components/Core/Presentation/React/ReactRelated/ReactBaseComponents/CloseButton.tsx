import { AdLerUIComponent } from "src/Components/Core/Types/ReactTypes";
import closeIcon from "../../../../../../Assets/icons/close.svg";
import tailwindMerge from "../../../Utils/TailwindMerge";

export default function CloseButton({
  onClick,
  className = "",
  title,
}: AdLerUIComponent<React.HTMLAttributes<HTMLButtonElement>>) {
  return (
    <button
      onClick={onClick}
      className={tailwindMerge(
        "font-regular box-border flex aspect-square h-6 w-6 cursor-pointer items-center justify-center overflow-hidden rounded-lg border-b-2 border-r-2 border-adlerdarkblue bg-buttonbgblue p-1 text-sm text-adlerdarkblue transition duration-75 ease-in-out hover:cursor-pointer hover:border-adlerdarkblue hover:bg-adleryellow active:translate-x-[1px] active:translate-y-[1px] active:border-b-2 active:border-r-2 active:border-transparent md:h-7 md:w-7 lg:text-xl mobile-portrait:rounded-md",
        className,
      )}
      title={title}
      data-testid="closebutton"
    >
      <img src={closeIcon} className="h-6 w-6" alt="CloseButton"></img>
    </button>
  );
}
