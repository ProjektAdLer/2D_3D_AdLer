import { AdLerUIComponent } from "src/Components/Core/Types/ReactTypes";
import tailwindMerge from "../../../Utils/TailwindMerge";
import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";
import { AvatarColor } from "src/Components/Core/Domain/AvatarModels/AvatarColorPalette";

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  currentColor: AvatarColor;
}

export default function ColorPickerButton({
  onClick,
  className,
  currentColor,
}: AdLerUIComponent<React.DetailedHTMLProps<ButtonProps, HTMLButtonElement>>) {
  return (
    <div className={tailwindMerge(className, "")}>
      <StyledButton onClick={onClick} shape="freeFloatCenter">
        {/* <img className="w-10 xl:w-12" src={helpIcon} alt="Help Icon" /> */}
        <div
          className={`border-2 border-black rounded m-2 h-5 w-5`}
          style={{ backgroundColor: currentColor.hexColor }}
        />
        {currentColor.nameKey}
      </StyledButton>
    </div>
  );
}
