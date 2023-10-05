import { useEffect } from "react";
import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";

export default function AdaptivityElementAnswerFeedback({
  isCorrect,
  setHeaderText,
  closeFeedback,
}: {
  isCorrect: boolean;
  setHeaderText: (text: string) => void;
  closeFeedback: () => void;
}) {
  useEffect(() => {
    setHeaderText(isCorrect ? "Korrekt!" : "Inkorrekt!");
  }, [isCorrect, setHeaderText]);

  return <StyledButton onClick={closeFeedback}>Weiter</StyledButton>;
}
