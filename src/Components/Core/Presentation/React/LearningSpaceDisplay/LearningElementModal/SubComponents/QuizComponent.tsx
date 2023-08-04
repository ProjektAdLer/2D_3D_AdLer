import useObservable from "~ReactComponents/ReactRelated/CustomHooks/useObservable";
import LearningElementModalViewModel from "../LearningElementModalViewModel";
import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";
import { StyledButtonColor } from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";
import { useState, useEffect, useCallback } from "react";

function parseTextToQuiz(text: string): [string, string[]] {
  let contents = text.split("\n");
  let question = contents[0];
  contents.shift();
  return [question, contents];
}

export default function QuizComponent({
  viewModel,
}: {
  viewModel: LearningElementModalViewModel;
}) {
  const [text, setText] = useState("");
  const [filepath] = useObservable(viewModel.filePath);
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState<string[]>([]);
  const [answerColors, setAnswerColors] = useState<StyledButtonColor[]>([]);
  const [selectedAnswersCount, setSelectedAnswersCount] = useState(0);

  useEffect(() => {
    fetch(filepath)
      .then((response) => response.text())
      .then((text) => setText(text));
  }, [filepath]);

  useEffect(() => {
    const [q, a] = parseTextToQuiz(text);
    // Hardcoded maximum of provided answers
    if (a.length > 12) {
      return;
    }
    setQuestion(q);
    setAnswers(a);
    setAnswerColors(a.map((color, index) => "default"));
  }, [text]);

  useEffect(() => {
    setSelectedAnswersCount(
      answerColors.filter((color) => color === "highlight").length
    );
  }, [answerColors]);

  const toggleAnswerSingleChoice = (index: number) => {
    setAnswerColors(
      answerColors.map((color, i) => (i == index ? "highlight" : "default"))
    );
  };

  const generateAnswers = useCallback(() => {
    return answers.map((answer, index) => (
      <StyledButton
        shape="freefloatcenter"
        onClick={(e) => toggleAnswerSingleChoice(index)}
        key={index}
        color={answerColors[index]}
      >
        {answer}
      </StyledButton>
    ));
  }, [answers, answerColors]);

  const nextButton = useCallback(() => {
    return (
      <StyledButton
        className="box-border"
        shape="freefloatcenter"
        disabled={selectedAnswersCount != 1}
      >
        Weiter
      </StyledButton>
    );
  }, [selectedAnswersCount]);

  return (
    <main className="box-border flex flex-col items-start">
      <p className="text-sm font-bold lg:text-lg">{question}</p>
      <section className="flex p-4 pl-0 m-auto">
        <div className="flex flex-wrap justify-start gap-3 p-4">
          {generateAnswers()}
        </div>
        <div className="flex items-end">{nextButton()}</div>
      </section>
    </main>
  );
}
