import { mock } from "jest-mock-extended";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import PRESENTATION_TYPES from "../../../../../Core/DependencyInjection/Presentation/PRESENTATION_TYPES";
import LoadingScreenBuilder from "../../../../../Core/Presentation/React/GeneralComponents/LoadingScreen/LoadingScreenBuilder";
import ILoadingScreenPresenter from "../../../../../Core/Presentation/React/GeneralComponents/LoadingScreen/ILoadingScreenPresenter";
describe("LoadingScreenBuilder", () => {
  let systemUnderTest: LoadingScreenBuilder;

  beforeEach(() => {
    systemUnderTest = new LoadingScreenBuilder();
  });
  test("builder does its job of building the mvc construct", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildController();

    expect(systemUnderTest["viewModel"]).toBeDefined();
    expect(systemUnderTest["controller"]).toBeDefined();
  });
  test("buildPresenter registers presenter with the CoreDIContainer", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildPresenter();

    expect(
      CoreDIContainer.isBound(PRESENTATION_TYPES.ILoadingScreenPresenter)
    ).toBe(true);
    expect(
      CoreDIContainer.get(PRESENTATION_TYPES.ILoadingScreenPresenter)
    ).toBe(systemUnderTest.getPresenter()!);
  });
  test("buildPresenter unbinds the presenter if it is already bound", () => {
    CoreDIContainer.bind(
      PRESENTATION_TYPES.ILoadingScreenPresenter
    ).toConstantValue(mock<ILoadingScreenPresenter>);

    const unbindSpy = jest.spyOn(CoreDIContainer, "unbind");

    systemUnderTest.buildViewModel();
    systemUnderTest.buildPresenter();

    expect(unbindSpy).toHaveBeenCalledTimes(1);
  });
});
