import mock from "jest-mock-extended/lib/Mock";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import PRESENTATION_TYPES from "../../../../../Core/DependencyInjection/Presentation/PRESENTATION_TYPES";
import ExitModalBuilder from "../../../../../Core/Presentation/React/SpaceDisplay/ExitModal/ExitModalBuilder";
import IExitModalPresenter from "../../../../../Core/Presentation/React/SpaceDisplay/ExitModal/IExitModalPresenter";

describe("exitModalBuilder", () => {
  let systemUnderTest: ExitModalBuilder;

  beforeEach(() => {
    systemUnderTest = new ExitModalBuilder();
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
      CoreDIContainer.isBound(PRESENTATION_TYPES.IExitModalPresenter)
    ).toBe(true);
    expect(CoreDIContainer.get(PRESENTATION_TYPES.IExitModalPresenter)).toBe(
      systemUnderTest.getPresenter()!
    );
  });

  test("buildPresenter unbinds the presenter if it is already bound", () => {
    CoreDIContainer.bind(
      PRESENTATION_TYPES.IExitModalPresenter
    ).toConstantValue(mock<IExitModalPresenter>);

    const unbindSpy = jest.spyOn(CoreDIContainer, "unbind");

    systemUnderTest.buildViewModel();
    systemUnderTest.buildPresenter();

    expect(unbindSpy).toHaveBeenCalledTimes(1);
  });
});
