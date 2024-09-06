import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";

export default function LearningSpaceSelectionRow({
  spaceTitle,
  selected,
  icon,
  locked,
  onClickCallback,
}: {
  icon: string;
  spaceTitle: string;
  selected: boolean;
  locked: boolean;
  onClickCallback: () => void;
}) {
  return (
    <StyledButton
      icon={icon}
      containerClassName="w-full"
      className="xl:pl-8 w-[100%]"
      shape="freeFloatCenter"
      onClick={onClickCallback}
      color={selected ? "pressed" : "default"}
    >
      {spaceTitle}
    </StyledButton>
  );
}
