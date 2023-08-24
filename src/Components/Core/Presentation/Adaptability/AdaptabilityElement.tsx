import useObservable from "~ReactComponents/ReactRelated/CustomHooks/useObservable";
import LearningElementModalViewModel from "~ReactComponents/LearningSpaceDisplay/LearningElementModal/LearningElementModalViewModel";
import StyledButton, {
  StyledButtonColor,
} from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";
import { useState, useEffect, useCallback } from "react";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import AdaptabilityElementViewModel from "./AdaptabilityElementViewModel";
import IAdaptabilityElementController from "./IAdaptabilityElementController";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import quizBackgroundVRGuy from "../../../../Assets/misc/quizBackgrounds/vr-guy-quiz-background.png";

function toggledColor(color: StyledButtonColor) {
  return color === "highlight" ? "default" : "highlight";
}

export default function AdaptabilityQuiz({
  viewModel,
}: {
  viewModel: LearningElementModalViewModel;
}) {
  const [vm, c] = useBuilder<
    AdaptabilityElementViewModel,
    IAdaptabilityElementController
  >(BUILDER_TYPES.IAdaptabilityElementBuilder);

  const [element] = useObservable(vm.currentElement);
  const [answerColors, setAnswerColors] = useState<StyledButtonColor[]>([]);
  const [selectedAnswersCount, setSelectedAnswersCount] = useState(0);
  const [numberOfQuestions, setNumberOfQuestions] = useState(0);

  const [finished, setFinished] = useState<boolean>(false);
  const [showFeedback, setShowFeedback] = useState<boolean>(() => {
    return false;
  });

  useEffect(() => {
    c.loadAdaptivityElement();
    setNumberOfQuestions(vm.contentData.Value.questions.length);
  }, []);

  useEffect(() => {
    setSelectedAnswersCount(
      answerColors.filter((color) => color === "highlight").length
    );
  }, [answerColors]);

  useEffect(() => {
    if (element !== undefined)
      setAnswerColors(element.questionAnswers.map((color, index) => "default"));
  }, [element]);

  const display = useCallback(() => {
    if (finished === true) {
      return displayReport();
    }

    if (showFeedback === false) {
      return displayAnswers();
    } else if (showFeedback === true) {
      return displayFeedback();
    } else return null;
  }, [showFeedback, element, answerColors]);

  const displayReport = useCallback(() => {
    if (finished === false) return null;

    return "Gut gemacht!";
  }, [finished]);

  const displayQuestion = useCallback(() => {
    if (finished === true) return null;

    if (element !== undefined) {
      return element.questionText;
    } else {
      return "Keine Frage geladen!";
    }
  }, [element, finished]);

  const displayFeedback = useCallback(() => {
    if (vm.evaluation.Value === undefined) return null;

    if (element !== undefined) {
      return element.questionAnswers.map((answer, index) => (
        <StyledButton
          shape="freefloatcenter"
          key={answer.answerIndex}
          color={vm.evaluation.Value.get(answer.answerIndex)}
        >
          {answer.answerText}
        </StyledButton>
      ));
    } else {
      return "Kein Feedback geladen!";
    }
  }, [showFeedback]);

  const displayAnswers = useCallback(() => {
    if (finished === true || showFeedback === true) return null;

    const setSelection = (index: number, selected: boolean) => {
      element.questionAnswers[index].isSelected = selected;
    };

    const toggleAnswersMultipleChoice = (index: number) => {
      setAnswerColors(
        answerColors.map((color, i) =>
          i === index ? toggledColor(answerColors[index]) : answerColors[i]
        )
      );
      element.questionAnswers[index].isSelected === true
        ? setSelection(index, false)
        : setSelection(index, true);
    };

    if (element !== undefined) {
      return element.questionAnswers.map((answer, index) => (
        <StyledButton
          shape="freefloatcenter"
          onClick={(e) => toggleAnswersMultipleChoice(index)}
          key={answer.answerIndex}
          color={answerColors[index]}
        >
          {answer.answerText}
        </StyledButton>
      ));
    } else {
      return "Keine Antworten geladen!";
    }
  }, [element, answerColors, showFeedback]);

  // assigns next question to display
  const continueButton = useCallback(() => {
    function nextElement() {
      if (finished === true) return;

      for (let i = 0; i < numberOfQuestions; i++) {
        if (
          vm.currentElement.Value === vm.contentData.Value.questions[i] &&
          i !== numberOfQuestions - 1
        ) {
          vm.currentElement.Value = vm.contentData.Value.questions[i + 1];
          return;
        }
      }
      setFinished(true);
    }

    function submitBehaviour() {
      if (showFeedback === false) {
        c.submitSelection();
        setShowFeedback(true);
      } else if (showFeedback === true) {
        nextElement();
        setShowFeedback(false);
      }
    }

    if (finished === true) return null;

    return (
      <StyledButton
        className="box-border"
        shape="freefloatcenter"
        disabled={selectedAnswersCount < 1}
        onClick={() => submitBehaviour()}
      >
        {vm.currentElement.Value !==
          vm.contentData.Value.questions[numberOfQuestions - 1] ||
        showFeedback === false
          ? "Weiter"
          : "Siehe Bericht"}
      </StyledButton>
    );
  }, [selectedAnswersCount, showFeedback, finished]);

  if (!element) {
    return null;
  }

  return (
    <>
      <main className="box-border flex flex-col items-start">
        <p className="text-sm font-bold lg:text-lg">{displayQuestion()}</p>
        <section className="flex p-4 pl-0 m-auto">
          <div className="flex flex-wrap justify-start gap-3 p-4">
            {display()}
          </div>
          <div className="flex items-end">{continueButton()}</div>
        </section>
      </main>
    </>
  );
}
