import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";

export default function SpaceSelectionRow({
  spaceTitle: spaceTitle,
  onClickCallback,
}: {
  spaceTitle: string;
  onClickCallback: () => void;
}) {
  return (
    <StyledButton
      className="w-[100%]"
      shape="freefloatcenter"
      onClick={onClickCallback}
    >
      {spaceTitle}
    </StyledButton>
  );
}
