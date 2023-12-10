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
    getIsAnyAnswerSelected(question)
  );

  const { t } = useTranslation("learningElement");

  useEffect(() => {
    setHeaderText(question.questionText);
    setAnswerColors(question.questionAnswers.map(() => "default"));
  }, [setHeaderText, question.questionText, question.questionAnswers]);

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
    [question]
  );

  return (
    <div className="flex flex-col w-full p-2 m-auto">
      <div className="flex flex-col flex-wrap justify-start gap-4 lg:grid lg:grid-cols-2">
        {question.questionAnswers.map((answer, index) => (
          <StyledButton
            key={answer.answerIndex}
            shape="freefloatcenter"
            onClick={() => {
              onAnswerClicked(index);
            }}
            color={answerColors[index]}
          >
            <p className="text-sm">{answer.answerText}</p>
          </StyledButton>
        ))}
      </div>

      <div className="flex items-end justify-end w-full gap-2 pt-8 font-bold">
        <StyledButton
          className="box-border "
          shape="freefloatcenter"
          onClick={() => {
            submitSelection();
          }}
          disabled={!isAnyAnswerSelected}
        >
          <p className="text-sm">{t("submitAnswers")}</p>
        </StyledButton>
      </div>
    </div>
  );
}
