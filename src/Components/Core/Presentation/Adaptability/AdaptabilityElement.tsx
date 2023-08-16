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
import { useInjection } from "inversify-react";
import IPresentationBuilder from "../PresentationBuilder/IPresentationBuilder";
import IPresentationDirector from "../PresentationBuilder/IPresentationDirector";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import ViewModelControllerProvider from "../ViewModelProvider/ViewModelControllerProvider";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import BuilderDIContainer from "~DependencyInjection/Builders/BuilderDIContainer";
import { json } from "stream/consumers";
import QuizElementTO from "../../Application/DataTransferObjects/QuizElementTO";

export default function AdaptabilityQuiz({
  viewModel,
}: {
  viewModel: LearningElementModalViewModel;
}) {
  const [vm, c] = useBuilder<
    AdaptabilityElementViewModel,
    IAdaptabilityElementController
  >(BUILDER_TYPES.IAdaptabilityElementBuilder);

  const [filepath] = useObservable(viewModel.filePath);
  const [element] = useObservable(vm.currentElement);
  const [answerColors, setAnswerColors] = useState<StyledButtonColor[]>([]);
  const [selectedAnswersCount, setSelectedAnswersCount] = useState(0);

  useEffect(() => {
    c.loadAdaptivityElement(filepath);
  }, [filepath]);

  useEffect(() => {
    setSelectedAnswersCount(
      answerColors.filter((color) => color === "highlight").length
    );
  }, [answerColors]);

  useEffect(() => {
    if (element !== undefined)
      setAnswerColors(element.answerOptions.map((color, index) => "default"));
  }, [element]);

  const displayQuestion = useCallback(() => {
    if (element !== undefined) {
      return element.question;
    } else {
      return "Keine Frage geladen!";
    }
  }, [element]);

  const displayAnswers = useCallback(() => {
    const toggleAnswerSingleChoice = (index: number) => {
      setAnswerColors(
        answerColors.map((color, i) => (i === index ? "highlight" : "default"))
      );
    };

    if (element !== undefined) {
      return element.answerOptions.map((answer, index) => (
        <StyledButton
          shape="freefloatcenter"
          onClick={(e) => toggleAnswerSingleChoice(index)}
          key={index}
          color={answerColors[index]}
        >
          {answer}
        </StyledButton>
      ));
    } else {
      return "Keine Antworten geladen!";
    }
  }, [element, answerColors]);

  const nextButton = useCallback(() => {
    return (
      <StyledButton
        className="box-border"
        shape="freefloatcenter"
        disabled={selectedAnswersCount !== 1}
      >
        Weiter
      </StyledButton>
    );
  }, [selectedAnswersCount]);

  return (
    <main className="box-border flex flex-col items-start">
      <p className="text-sm font-bold lg:text-lg">{displayQuestion()}</p>
      <section className="flex p-4 pl-0 m-auto">
        <div className="flex flex-wrap justify-start gap-3 p-4">
          {displayAnswers()}
        </div>
        <div className="flex items-end">{nextButton()}</div>
      </section>
    </main>
  );
}
