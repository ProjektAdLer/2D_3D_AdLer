import mock from "jest-mock-extended/lib/Mock";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import PRESENTATION_TYPES from "../../../../../Core/DependencyInjection/Presentation/PRESENTATION_TYPES";
import StoryElementBuilder from "../../../../../Core/Presentation/React/LearningSpaceDisplay/StoryElement/StoryElementBuilder";
import IStoryElementPresenter from "../../../../../Core/Presentation/React/LearningSpaceDisplay/StoryElement/IStoryElementPresenter";

describe("StoryElementBuilder", () => {
  let systemUnderTest: StoryElementBuilder;

  beforeEach(() => {
    systemUnderTest = new StoryElementBuilder();
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
      CoreDIContainer.isBound(PRESENTATION_TYPES.IStoryElementPresenter)
    ).toBe(true);
    expect(CoreDIContainer.get(PRESENTATION_TYPES.IStoryElementPresenter)).toBe(
      systemUnderTest.getPresenter()!
    );
  });

  test("buildPresenter unbinds the presenter if it is already bound", () => {
    CoreDIContainer.bind(
      PRESENTATION_TYPES.IStoryElementPresenter
    ).toConstantValue(mock<IStoryElementPresenter>);

    const unbindSpy = jest.spyOn(CoreDIContainer, "unbind");

    systemUnderTest.buildViewModel();
    systemUnderTest.buildPresenter();

    expect(unbindSpy).toHaveBeenCalledTimes(1);
  });
});
