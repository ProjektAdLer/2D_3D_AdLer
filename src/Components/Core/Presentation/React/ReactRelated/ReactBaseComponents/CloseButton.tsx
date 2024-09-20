import { AdLerUIComponent } from "src/Components/Core/Types/ReactTypes";
import closeIcon from "../../../../../../Assets/icons/close.svg";
import tailwindMerge from "../../../Utils/TailwindMerge";

export default function CloseButton({
  onClick,
  className = "",
}: AdLerUIComponent<React.HTMLAttributes<HTMLButtonElement>>) {
  return (
    <button
      onClick={onClick}
      className={tailwindMerge(
        "justify-center p-1 md:w-7 md:h-7 sm:w-6 sm:h-6 w-4 h-4 aspect-square",
        className,
      )}
    >
      <img src={closeIcon} className="w-6 h-6" alt="CloseButton"></img>
    </button>
  );
}
