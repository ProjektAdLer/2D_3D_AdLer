import mock from "jest-mock-extended/lib/Mock";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import PRESENTATION_TYPES from "../../../../../Core/DependencyInjection/Presentation/PRESENTATION_TYPES";
import HelpDeskModalBuilder from "../../../../../Core/Presentation/React/GeneralComponents/HelpDeskModal/HelpDeskModalBuilder";
import IHelpDeskModalPresenter from "../../../../../Core/Presentation/React/GeneralComponents/HelpDeskModal/IHelpDeskModalPresenter";

describe("HelpDeskModalBuilder", () => {
  let systemUnderTest: HelpDeskModalBuilder;

  beforeEach(() => {
    systemUnderTest = new HelpDeskModalBuilder();
  });

  test("buildController builds the controller and registers the viewModel and controller", () => {
    systemUnderTest.buildViewModel();

    expect(systemUnderTest["viewModel"]).toBeDefined();
  });

  test("buildPresenter registers presenter with the CoreDIContainer", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildPresenter();

    expect(
      CoreDIContainer.isBound(PRESENTATION_TYPES.IHelpDeskModalPresenter)
    ).toBe(true);
    expect(
      CoreDIContainer.get(PRESENTATION_TYPES.IHelpDeskModalPresenter)
    ).toBe(systemUnderTest.getPresenter()!);
  });
  test("buildPresenter unbinds the presenter if it is already bound", () => {
    CoreDIContainer.bind(
      PRESENTATION_TYPES.IHelpDeskModalPresenter
    ).toConstantValue(mock<IHelpDeskModalPresenter>);

    const unbindSpy = jest.spyOn(CoreDIContainer, "unbind");

    systemUnderTest.buildViewModel();
    systemUnderTest.buildPresenter();

    expect(unbindSpy).toHaveBeenCalledTimes(1);
  });
});
