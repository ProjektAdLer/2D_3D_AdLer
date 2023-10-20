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

  return (
    <div className="flex w-full h-full my-4">
      <div className="w-1/2">
        <p className="pl-4 font-bold">
          Glückwunsch! Diese Antwort war richtig!
        </p>
      </div>
      <div className="flex justify-end w-1/2">
        <StyledButton shape="freefloatcenter" onClick={closeFeedback}>
          Weiter
        </StyledButton>
      </div>
    </div>
  );
}
