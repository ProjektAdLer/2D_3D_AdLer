import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";

export default function SpaceSelectionRow({
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
      className="xl:pl-8 w-[100%]"
      shape="freefloatcenter"
      onClick={onClickCallback}
      color={selected ? "pressed" : "default"}
    >
      {spaceTitle}
    </StyledButton>
  );
}
