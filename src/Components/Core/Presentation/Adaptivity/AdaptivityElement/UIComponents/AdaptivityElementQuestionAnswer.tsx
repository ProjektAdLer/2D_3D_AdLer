import { useCallback, useEffect, useState } from "react";
import {
  AdaptivityAnswer,
  AdaptivityQuestion,
} from "../AdaptivityElementViewModel";
import StyledButton, {
  StyledButtonColor,
} from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";

export default function AdaptivityElementQuestionAnswer({
  question,
  submitSelection,
  setHeaderText,
}: {
  question: AdaptivityQuestion;
  submitSelection: () => void;
  setHeaderText: (headerText: string) => void;
}) {
  const [answerColors, setAnswerColors] = useState<StyledButtonColor[]>([]);

  useEffect(() => {
    setHeaderText(question.questionText);
    setAnswerColors(question.questionAnswers.map(() => "default"));
  }, [setHeaderText, question]);

  const onAnswerClicked = useCallback(
    (index: number) => {
      const newColors = question.questionAnswers.map((answer, i) => {
        if (index === i) {
          // switch selection status of clicked answer
          answer.isSelected = !answer.isSelected;
        } else {
          // deselect all other answers if question is single choice
          if (!question.isMultipleChoice) answer.isSelected = false;
        }

        return answer.isSelected ? "highlight" : "default";
      });

      setAnswerColors(newColors);
    },
    [answerColors]
  );

  return (
    <div className="flex flex-col w-full m-auto p-2">
      <div className="flex flex-col lg:grid lg:grid-cols-2 flex-wrap justify-start gap-4 ">
        {question.questionAnswers.map((answer, index) => (
          <StyledButton
            key={answer.answerIndex}
            shape="freefloatcenter"
            onClick={() => {
              onAnswerClicked(index);
            }}
            color={answerColors[index]}
          >
            {answer.answerText}
          </StyledButton>
        ))}
      </div>

      <div className="flex items-end justify-end w-full pt-8 font-bold">
        <StyledButton
          className="box-border"
          shape="freefloatcenter"
          onClick={submitSelection}
        >
          {"Antworten abgeben"}
        </StyledButton>
      </div>
    </div>
  );
}
