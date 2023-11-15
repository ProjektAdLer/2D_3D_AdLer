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
    setHeaderText(
      isCorrect
        ? "Glückwunsch! Diese Antwort war richtig!"
        : "Schade, leider war deine Antwort falsch."
    );
  }, [isCorrect, setHeaderText]);

  return (
    <div className="flex w-full h-fit my-4">
      {/*       <div className="w-1/2">
        {isCorrect && (
          <p className="pl-4 font-bold">
            Glückwunsch! Diese Antwort war richtig!
          </p>
        )}
        {!isCorrect && (
          <p className="pl-4 font-bold">
            Schade, leider war deine Antwort falsch.
          </p>
        )}
      </div> */}
      <div className="flex justify-end w-1/2">
        <StyledButton shape="freefloatcenter" onClick={closeFeedback}>
          <p className="text-sm">Weiter</p>
        </StyledButton>
      </div>
    </div>
  );
}
