import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";

export default function SpaceSelectionRow({
  spaceTitle: spaceTitle,
  selected: selected,
  icon: icon,
  locked: locked,
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
      className="w-[100%]"
      shape="freefloatcenter"
      onClick={onClickCallback}
      color={locked ? "locked" : selected ? "pressed" : "default"}
    >
      {spaceTitle}
    </StyledButton>
  );
}
