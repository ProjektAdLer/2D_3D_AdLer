import { useCallback, useEffect, useState } from "react";
import { AdaptivityQuestion } from "../AdaptivityElementViewModel";
import StyledButton, {
  StyledButtonColor,
} from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";

export default function AdaptivityElementAnswerSelection({
  question,
  submitSelection,
  closeSelection,
  setHeaderText,
}: {
  question: AdaptivityQuestion;
  submitSelection: (selectedAnswers: number[]) => void;
  closeSelection: () => void;
  setHeaderText: (headerText: string) => void;
}) {
  const [answerColors, setAnswerColors] = useState<StyledButtonColor[]>([]);
  const [selectedAnswerIDs, setSelectedAnswerIDs] = useState<number[]>([]);

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
        } else {
          // deselect all other answers if question is single choice
          if (!question.isMultipleChoice) answer.isSelected = false;
        }

        return answer.isSelected ? "highlight" : "default";
      });

      setAnswerColors(newColors);

      const selectedIDs = question.questionAnswers
        .filter((answer) => {
          return answer.isSelected;
        })
        .map((selectedAnswer) => {
          return selectedAnswer.answerIndex;
        });
      setSelectedAnswerIDs(selectedIDs);
    },
    [question.isMultipleChoice, question.questionAnswers]
  );

  return (
    <div className="flex flex-col w-full p-2 m-auto">
      <div className="flex flex-col flex-wrap justify-start gap-4 lg:grid lg:grid-cols-2 ">
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

      <div className="flex items-end justify-end w-full gap-2 pt-8 font-bold">
        {/* <StyledButton
          className="box-border"
          shape="freefloatcenter"
          onClick={closeSelection}
        >
          {"Zurück"}
        </StyledButton> */}
        <StyledButton
          className="box-border"
          shape="freefloatcenter"
          onClick={() => {
            console.log(selectedAnswerIDs);
            submitSelection(selectedAnswerIDs);
          }}
        >
          {"Antworten abgeben"}
        </StyledButton>
      </div>
    </div>
  );
}
