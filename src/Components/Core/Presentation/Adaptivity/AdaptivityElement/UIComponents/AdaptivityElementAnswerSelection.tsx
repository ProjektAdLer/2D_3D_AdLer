import { useCallback, useEffect, useState } from "react";
import { AdaptivityQuestion } from "../AdaptivityElementViewModel";
import StyledButton, {
  StyledButtonColor,
} from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";
import { useTranslation } from "react-i18next";

function getIsAnyAnswerSelected(question: AdaptivityQuestion): boolean {
  return question.questionAnswers.some((a) => a.isSelected === true);
}

export default function AdaptivityElementAnswerSelection({
  question,
  submitSelection,
  closeSelection,
  setHeaderText,
}: {
  question: AdaptivityQuestion;
  submitSelection: () => void;
  closeSelection: () => void;
  setHeaderText: (headerText: string) => void;
}) {
  const [answerColors, setAnswerColors] = useState<StyledButtonColor[]>([]);
  const [isAnyAnswerSelected, setIsAnyAnswerSelected] = useState<boolean>(
    getIsAnyAnswerSelected(question),
  );

  const { t: translate } = useTranslation("learningElement");
  const [text] = useState<string>(
    (question.isMultipleChoice
      ? translate("multipleChoiceSelected")
      : translate("singleChoiceSelected")) + question.questionText,
  );

  useEffect(() => {
    setHeaderText(text);
    setAnswerColors(question.questionAnswers.map(() => "default"));
  }, [setHeaderText, question.questionAnswers, text]);

  const onAnswerClicked = useCallback(
    (index: number) => {
      const newColors = question.questionAnswers.map((answer, i) => {
        if (index === i) {
          // switch selection status of clicked answer
          answer.isSelected = !answer.isSelected;
        } else if (!question.isMultipleChoice) {
          // deselect all other answers if question is single choice
          answer.isSelected = false;
        }

        return answer.isSelected ? "highlight" : "default";
      });

      setIsAnyAnswerSelected(getIsAnyAnswerSelected(question));

      setAnswerColors(newColors);
    },
    [question],
  );

  return (
    <div className="m-auto flex w-full flex-col p-2 lg:flex-row lg:justify-between">
      <div className="flex flex-wrap justify-start gap-4">
        {question.questionAnswers.map((answer, index) => (
          <StyledButton
            key={answer.answerIndex}
            shape="freeFloatCenter"
            onClick={() => {
              onAnswerClicked(index);
            }}
            color={
              question.isCompleted && answer.isCorrect
                ? "success"
                : answerColors[index]
            }
            title={translate("answerToolTip").toString()}
            data-testid={`adaptivity-answer-${answer.answerIndex}`}
          >
            <p className="text-sm">{answer.answerText}</p>
          </StyledButton>
        ))}
      </div>

      <div className="flex w-auto items-end justify-end gap-2 pt-8 font-bold lg:w-1/6">
        <div className="fixed">
          <StyledButton
            className="box-border"
            shape="freeFloatCenter"
            onClick={() => {
              submitSelection();
            }}
            disabled={!isAnyAnswerSelected || question.isCompleted === true}
            title={translate("submitTooltip").toString()}
            data-testid="adaptivity-submit"
          >
            <p className="text-sm">
              {question.isCompleted
                ? translate("questionAlreadyAnswered")
                : question.isMultipleChoice
                  ? translate("submitAnswers")
                  : translate("submitAnswer")}
            </p>
          </StyledButton>
        </div>
      </div>
    </div>
  );
}
