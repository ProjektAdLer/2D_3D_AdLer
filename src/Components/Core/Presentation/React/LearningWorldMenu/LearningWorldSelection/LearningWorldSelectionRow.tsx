import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";

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
  );
}
