import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";

export default function SpaceSelectionRow({
  spaceTitle: spaceTitle,
  selected: selected,
  onClickCallback,
}: {
  spaceTitle: string;
  selected: boolean;
  onClickCallback: () => void;
}) {
  return (
    <StyledButton
      className="w-[100%]"
      shape="freefloatcenter"
      onClick={onClickCallback}
      color={selected ? "success" : "default"}
    >
      {spaceTitle}
    </StyledButton>
  );
}
