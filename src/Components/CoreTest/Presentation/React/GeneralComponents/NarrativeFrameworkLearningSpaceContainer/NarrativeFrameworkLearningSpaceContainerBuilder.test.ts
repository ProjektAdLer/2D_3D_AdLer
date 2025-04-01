import { mock } from "jest-mock-extended";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import PRESENTATION_TYPES from "../../../../../Core/DependencyInjection/Presentation/PRESENTATION_TYPES";
import NarrativeFrameworkLearningSpaceContainerBuilder from "../../../../../Core/Presentation/React/GeneralComponents/NarrativeFrameworkLearningSpaceContainer/NarrativeFrameworkLearningSpaceContainerBuilder";
import INarrativeFrameworkLearningSpaceContainerPresenter from "../../../../../Core/Presentation/React/GeneralComponents/NarrativeFrameworkLearningSpaceContainer/INarrativeFrameworkLearningSpaceContainerPresenter";

describe("NarrativeFrameworkLearningSpaceContainerBuilder", () => {
  let systemUnderTest: NarrativeFrameworkLearningSpaceContainerBuilder;

  beforeEach(() => {
    systemUnderTest = new NarrativeFrameworkLearningSpaceContainerBuilder();
  });
  test("buildPresenter unbinds the presenter if it is already bound", () => {
    CoreDIContainer.bind(
      PRESENTATION_TYPES.INarrativeFrameworkLearningSpaceContainerPresenter,
    ).toConstantValue(mock<INarrativeFrameworkLearningSpaceContainerPresenter>);

    const unbindSpy = jest.spyOn(CoreDIContainer, "unbind");

    systemUnderTest.buildPresenter();

    expect(unbindSpy).toHaveBeenCalledTimes(1);
  });
});
