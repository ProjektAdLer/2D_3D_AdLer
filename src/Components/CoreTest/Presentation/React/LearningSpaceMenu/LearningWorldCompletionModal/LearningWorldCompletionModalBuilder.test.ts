import { mock } from "jest-mock-extended";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import PRESENTATION_TYPES from "../../../../../Core/DependencyInjection/Presentation/PRESENTATION_TYPES";
import ILearningWorldCompletionModalPresenter from "../../../../../Core/Presentation/React/LearningSpaceMenu/LearningWorldCompletionModal/ILearningWorldCompletionModalPresenter";
import LearningWorldCompletionModalBuilder from "../../../../../Core/Presentation/React/LearningSpaceMenu/LearningWorldCompletionModal/LearningWorldCompletionModalBuilder";

describe("LearningWorldCompletionModalBuilder", () => {
  let systemUnderTest: LearningWorldCompletionModalBuilder;

  beforeEach(() => {
    systemUnderTest = new LearningWorldCompletionModalBuilder();
  });

  test("buildPresenter registers presenter with the CoreDIContainer", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildPresenter();

    expect(
      CoreDIContainer.isBound(
        PRESENTATION_TYPES.ILearningWorldCompletionModalPresenter,
      ),
    ).toBe(true);
    expect(
      CoreDIContainer.get(
        PRESENTATION_TYPES.ILearningWorldCompletionModalPresenter,
      ),
    ).toBe(systemUnderTest.getPresenter()!);
  });

  test("buildPresenter unbinds the presenter if it is already bound", () => {
    CoreDIContainer.bind(
      PRESENTATION_TYPES.ILearningWorldCompletionModalPresenter,
    ).toConstantValue(mock<ILearningWorldCompletionModalPresenter>);

    const unbindSpy = jest.spyOn(CoreDIContainer, "unbind");

    systemUnderTest.buildViewModel();
    systemUnderTest.buildPresenter();

    expect(unbindSpy).toHaveBeenCalledTimes(1);
  });
});
