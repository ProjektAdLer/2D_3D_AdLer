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
        "justify-center p-1 md:w-7 md:h-7 w-6 h-6 mobile-portrait:rounded-md aspect-square flex items-center text-sm rounded-lg hover:cursor-pointer hover:border-adlerdarkblue hover:bg-adleryellow lg:text-xl transition ease-in-out duration-75 active:translate-x-[1px] active:translate-y-[1px] active:border-b-2 active:border-r-2 active:border-transparent text-adlerdarkblue font-regular border-b-2 border-r-2 border-adlerdarkblue overflow-hidden box-border cursor-pointer bg-buttonbgblue",
        className,
      )}
      title={title}
    >
      <img src={closeIcon} className="w-6 h-6" alt="CloseButton"></img>
    </button>
  );
}
