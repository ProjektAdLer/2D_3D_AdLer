import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";

export default function RoomSelectionSectionRow({
  roomTitle,
  onClickCallback,
}: {
  roomTitle: string;
  onClickCallback: () => void;
}) {
  return (
    <StyledButton
      className="w-[100%]"
      shape="freefloatcenter"
      onClick={onClickCallback}
    >
      {roomTitle}
    </StyledButton>
  );
}
