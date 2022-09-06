import StyledButton from "~ReactComponents/ReactBaseComponents/StyledButton";

export default function LearningRoomSelectionRow({
  learningRoomTitle,
  onClickCallback,
}: {
  learningRoomTitle: string;
  onClickCallback: () => void;
}) {
  return (
    <StyledButton onClick={onClickCallback}>{learningRoomTitle}</StyledButton>
  );
}
