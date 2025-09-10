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
      isCorrect ? translate("rightAnswer") : translate("wrongAnswer"),
    );
  }, [isCorrect, setHeaderText, translate]);
  const difficultyHint = useRef(null as string | null);
  useEffect(() => {
    currentTask.questions.some((question) => {
      return (
        question.difficulty.valueOf() > currentQuestion.difficulty.valueOf()
      );
    }) &&
      isCorrect &&
      (difficultyHint.current = translate(
        "questionSolvedWithHigherDifficultyQuestionAvailable",
      ).toString());

    currentTask.questions.some((question) => {
      return (
        question.difficulty.valueOf() < currentQuestion.difficulty.valueOf()
      );
    }) &&
      !isCorrect &&
      (difficultyHint.current = translate(
        "questionSolvedWithLowerDifficultyQuestionAvailable",
      ));
  }, [currentQuestion, currentTask, isCorrect, translate]);
  const solvedHint = useRef(null as string | null);
  useEffect(() => {
    if (
      // hint is given if the solved question is required or if a question of lower difficulty is required
      (currentTask.questions.some((question) => {
        return (
          question.isRequired &&
          question.difficulty.valueOf() < currentQuestion.difficulty.valueOf()
        );
      }) ||
        currentQuestion.isRequired) &&
      isCorrect
    ) {
      solvedHint.current = translate("requiredQuestionSolvedCorrectly");
    }
  }, [
    currentQuestion.difficulty,
    currentQuestion.isRequired,
    currentTask,
    isCorrect,
    translate,
  ]);

  return (
    <div className="my-4 flex h-fit flex-col gap-4 pl-4 pr-2">
      <div className="flex flex-col items-start justify-start rounded-xl bg-buttonbgblue">
        {solvedHint.current && <div className="p-2">{solvedHint.current}</div>}
        {difficultyHint.current && (
          <div className="p-2">{difficultyHint.current}</div>
        )}
      </div>
      <div className="flex w-full justify-end">
        <StyledButton
          shape="freeFloatCenter"
          onClick={closeFeedback}
          data-testid="adaptivity-closefeedback"
        >
          <p className="text-sm">{translate("nextButton")}</p>
        </StyledButton>
      </div>
    </div>
  );
}
