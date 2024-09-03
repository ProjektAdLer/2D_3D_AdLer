import mock from "jest-mock-extended/lib/Mock";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import PRESENTATION_TYPES from "../../../../../Core/DependencyInjection/Presentation/PRESENTATION_TYPES";
import ControlsExplanationModalBuilder from "../../../../../Core/Presentation/React/GeneralComponents/ControlsExplanationModal/ControlsExplanationModalBuilder";
import IControlsExplanationModalPresenter from "../../../../../Core/Presentation/React/GeneralComponents/ControlsExplanationModal/IControlsExplanationModalPresenter";

describe("ControlsExplanationModalBuilder", () => {
  let systemUnderTest: ControlsExplanationModalBuilder;

  beforeEach(() => {
    systemUnderTest = new ControlsExplanationModalBuilder();
  });

  test("buildPresenter registers presenter with the CoreDIContainer", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildPresenter();

    expect(
      CoreDIContainer.isBound(
        PRESENTATION_TYPES.IControlsExplanationModalPresenter
      )
    ).toBe(true);
    expect(
      CoreDIContainer.get(PRESENTATION_TYPES.IControlsExplanationModalPresenter)
    ).toBe(systemUnderTest.getPresenter()!);
  });

  test("buildPresenter unbinds the presenter if it is already bound", () => {
    CoreDIContainer.bind(
      PRESENTATION_TYPES.IControlsExplanationModalPresenter
    ).toConstantValue(mock<IControlsExplanationModalPresenter>);

    const unbindSpy = jest.spyOn(CoreDIContainer, "unbind");

    systemUnderTest.buildViewModel();
    systemUnderTest.buildPresenter();

    expect(unbindSpy).toHaveBeenCalledTimes(1);
  });
});
