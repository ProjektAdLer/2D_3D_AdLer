import { useEffect } from "react";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation("learningElement");
  useEffect(() => {
    setHeaderText(isCorrect ? t("rightAnswer") : t("wrongAnswer"));
  }, [isCorrect, setHeaderText, t]);

  return (
    <div className="flex w-full my-4 h-fit">
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
          <p className="text-sm">{t("nextButton")}</p>
        </StyledButton>
      </div>
    </div>
  );
}
