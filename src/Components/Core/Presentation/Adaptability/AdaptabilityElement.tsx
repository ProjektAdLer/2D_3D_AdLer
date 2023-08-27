import useObservable from "~ReactComponents/ReactRelated/CustomHooks/useObservable";
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

export default function AdaptabilityQuiz() {
  const [viewmodel, controller] = useBuilder<
    AdaptabilityElementViewModel,
    IAdaptabilityElementController
  >(BUILDER_TYPES.IAdaptabilityElementBuilder);

  const [element] = useObservable(viewmodel.currentElement);
  const [answerColors, setAnswerColors] = useState<StyledButtonColor[]>([]);
  const [selectedAnswersCount, setSelectedAnswersCount] = useState(0);
  const [numberOfQuestions, setNumberOfQuestions] = useState(0);

  const [finished, setFinished] = useState<boolean>(false);
  const [showFeedback, setShowFeedback] = useState<boolean>(() => {
    return false;
  });

  useEffect(() => {
    controller.loadAdaptivityElement();
    setNumberOfQuestions(viewmodel.contentData.Value.questions.length);
  }, [controller, viewmodel.contentData]);

  useEffect(() => {
    setSelectedAnswersCount(
      answerColors.filter((color) => color === "highlight").length
    );
  }, [answerColors]);

  useEffect(() => {
    if (element !== undefined)
      setAnswerColors(element.questionAnswers.map((color, index) => "default"));
  }, [element]);

  const displayQuestion = useCallback(() => {
    if (finished === true) return null;

    if (element !== undefined) {
      return element.questionText;
    } else {
      return "Keine Frage geladen!";
    }
  }, [element, finished]);

  const display = useCallback(() => {
    if (finished === true) {
      return "Gut gemacht!";
    }

    if (showFeedback === false) {
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
    } else {
      if (viewmodel.evaluation.Value === undefined) return null;

      return element.questionAnswers.map((answer, index) => (
        <StyledButton
          shape="freefloatcenter"
          key={answer.answerIndex}
          color={viewmodel.evaluation.Value.get(answer.answerIndex)}
        >
          {answer.answerText}
        </StyledButton>
      ));
    }
  }, [finished, showFeedback, element, answerColors, viewmodel.evaluation]);

  // assigns next question to display
  const continueButton = useCallback(() => {
    function nextElement() {
      if (finished === true) return;

      for (let i = 0; i < numberOfQuestions; i++) {
        if (
          viewmodel.currentElement.Value ===
            viewmodel.contentData.Value.questions[i] &&
          i !== numberOfQuestions - 1
        ) {
          viewmodel.currentElement.Value =
            viewmodel.contentData.Value.questions[i + 1];
          return;
        }
      }
      setFinished(true);
    }

    function submitBehaviour() {
      if (showFeedback === false) {
        controller.submitSelection();
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
        {viewmodel.currentElement.Value !==
          viewmodel.contentData.Value.questions[numberOfQuestions - 1] ||
        showFeedback === false
          ? "Weiter"
          : "Siehe Bericht"}
      </StyledButton>
    );
  }, [
    selectedAnswersCount,
    showFeedback,
    finished,
    controller,
    viewmodel.currentElement,
    viewmodel.contentData,
    numberOfQuestions,
  ]);

  if (!element) {
    return null;
  }

  let settings: string = "box-border flex flex-col items-start";

  function displayImageNPC() {
    return (
      <img
        className="absolute top-0 right-0 -z-10 object-scale-down max-h-[93vh] w-fit max-w-[90vw] lg:max-w-[99vw]"
        alt="LearningImage!"
        src={quizBackgroundVRGuy}
      ></img>
    );
  }

  return (
    <>
      {displayImageNPC()}
      <main className={settings}>
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
