import StyledButton from "~ReactComponents/ReactBaseComponents/StyledButton";

export default function LearningRoomSelectionRow({
  learningRoomTitle,
  onClickCallback,
}: {
  learningRoomTitle: string;
  onClickCallback: () => void;
}) {
  return (
    <StyledButton shape="freefloatcenter" onClick={onClickCallback}>
      {learningRoomTitle}
    </StyledButton>
  );
}
