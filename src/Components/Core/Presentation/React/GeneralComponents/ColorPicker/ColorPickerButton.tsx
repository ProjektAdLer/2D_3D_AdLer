import { AdLerUIComponent } from "src/Components/Core/Types/ReactTypes";
import tailwindMerge from "../../../Utils/TailwindMerge";
import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  currentColor: string;
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
        {currentColor}
      </StyledButton>
    </div>
  );
}
