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
      className="xl:pl-8 w-[100%]"
      shape="freefloatleft"
      onClick={onClickCallback}
      color={/* locked ? "locked" :  */ selected ? "pressed" : "default"}
    >
      {spaceTitle}
    </StyledButton>
  );
}
