import mock from "jest-mock-extended/lib/Mock";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import PRESENTATION_TYPES from "../../../../../Core/DependencyInjection/Presentation/PRESENTATION_TYPES";
import IntroStoryElementBuilder from "../../../../../Core/Presentation/React/LearningSpaceDisplay/IntroStoryElement/IntroStoryElementBuilder";
import IIntroStoryElementPresenter from "../../../../../Core/Presentation/React/LearningSpaceDisplay/IntroStoryElement/IIntroStoryElementPresenter";

describe("IntroStoryElementBuilder", () => {
  let systemUnderTest: IntroStoryElementBuilder;

  beforeEach(() => {
    systemUnderTest = new IntroStoryElementBuilder();
  });

  test("buildController builds the controller and registers the viewModel and controller", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildController();

    expect(systemUnderTest["viewModel"]).toBeDefined();
    expect(systemUnderTest["controller"]).toBeDefined();
  });

  test("buildPresenter registers presenter with the CoreDIContainer", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildPresenter();

    expect(
      CoreDIContainer.isBound(PRESENTATION_TYPES.IIntroStoryElementPresenter)
    ).toBe(true);
    expect(
      CoreDIContainer.get(PRESENTATION_TYPES.IIntroStoryElementPresenter)
    ).toBe(systemUnderTest.getPresenter()!);
  });

  test("buildPresenter unbinds the presenter if it is already bound", () => {
    CoreDIContainer.bind(
      PRESENTATION_TYPES.IIntroStoryElementPresenter
    ).toConstantValue(mock<IIntroStoryElementPresenter>);

    const unbindSpy = jest.spyOn(CoreDIContainer, "unbind");

    systemUnderTest.buildViewModel();
    systemUnderTest.buildPresenter();

    expect(unbindSpy).toHaveBeenCalledTimes(1);
  });
});
