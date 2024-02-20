import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";
import {
  AdaptivityQuestion,
  AdaptivityTask,
} from "../AdaptivityElementViewModel";

export default function AdaptivityElementAnswerFeedback({
  isCorrect,
  currentQuestion,
  currentTask,
  setHeaderText,
  closeFeedback,
}: {
  isCorrect: boolean;
  currentQuestion: AdaptivityQuestion;
  currentTask: AdaptivityTask;
  setHeaderText: (text: string) => void;
  closeFeedback: () => void;
}) {
  const { t: translate } = useTranslation("learningElement");
  useEffect(() => {
    setHeaderText(
      isCorrect ? translate("rightAnswer") : translate("wrongAnswer")
    );
  }, [isCorrect, setHeaderText, translate]);
  const contentText = useRef("");
  useEffect(() => {
    currentTask.questions.some((question) => {
      return (
        question.difficulty.valueOf() > currentQuestion.difficulty.valueOf()
      );
    }) &&
      isCorrect &&
      (contentText.current = translate(
        "questionSolvedWithHigherDifficultyQuestionAvailable"
      ).toString());

    currentTask.questions.some((question) => {
      return (
        question.difficulty.valueOf() < currentQuestion.difficulty.valueOf()
      );
    }) &&
      !isCorrect &&
      (contentText.current = translate(
        "questionSolvedWithLowerDifficultyQuestionAvailable"
      ));
  }, [currentQuestion, currentTask, isCorrect, translate]);

  return (
    <div className="flex flex-col w-full my-4 h-fit">
      {currentQuestion.isRequired && isCorrect && (
        <div>{translate("requiredQuestionSolvedCorrectly")}</div>
      )}
      {contentText && <div className="h-10">{contentText.current}</div>}
      <div className="flex justify-end w-1/2">
        <StyledButton shape="freefloatcenter" onClick={closeFeedback}>
          <p className="text-sm">{translate("nextButton")}</p>
        </StyledButton>
      </div>
    </div>
  );
}
