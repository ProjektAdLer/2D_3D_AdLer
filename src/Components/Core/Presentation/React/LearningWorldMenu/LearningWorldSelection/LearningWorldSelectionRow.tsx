import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";
import swegedBackground from "../../../../../../Assets/misc/MenuSelectionBackgrounds/Sweged_Beispielbild.png";

export default function LearningWorldSelectionRow({
  icon,
  selected,
  title,
  onClickCallback,
}: {
  icon: string;
  selected: boolean;
  title: string;
  onClickCallback: () => void;
}) {
  return (
    <div className="flex flex-col">
      <img src={swegedBackground} alt="Hintergrundbild" />
      <StyledButton
        icon={icon}
        containerClassName="w-full"
        className="w-full xl:pl-8 "
        shape="freeFloatCenter"
        onClick={onClickCallback}
        color={selected ? "pressed" : "default"}
      >
        {title}
      </StyledButton>
    </div>
  );
}
