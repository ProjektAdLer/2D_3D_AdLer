import mock from "jest-mock-extended/lib/Mock";
import LoadingScreenPresenter from "../../../../../Core/Presentation/React/GeneralComponents/LoadingScreen/LoadingScreenPresenter";
import LoadingScreenViewModel from "../../../../../Core/Presentation/React/GeneralComponents/LoadingScreen/LoadingScreenViewModel";

describe("LoadingScreenPresenter", () => {
  let systemUnderTest: LoadingScreenPresenter;
  let viewModelMock: LoadingScreenViewModel;

  beforeEach(() => {
    viewModelMock = mock<LoadingScreenViewModel>();
    systemUnderTest = new LoadingScreenPresenter(viewModelMock);
  });

  test("showLoadingScreen sets viewModel Entry to true", () => {
    viewModelMock.isOpen.Value = false;
    systemUnderTest.showLoadingScreen();
    expect(viewModelMock.isOpen.Value).toBe(true);
  });

  test("releaseLoadingLock sets isReadyToBeClosed to true", () => {
    viewModelMock.isReadyToBeClosed.Value = false;
    systemUnderTest.releaseLoadingLock();
    expect(viewModelMock.isReadyToBeClosed.Value).toBe(true);
  });

  test("pushLoadStep sets the new current Load Step in the viewModel", () => {
    viewModelMock.loadStep.Value = "";
    systemUnderTest.pushLoadStep("test");
    expect(viewModelMock.loadStep.Value).toBe("test");
  });

  test("closeLoadingScreen sets isOpen to false", () => {
    viewModelMock.isOpen.Value = true;
    systemUnderTest.closeLoadingScreen();
    expect(viewModelMock.isOpen.Value).toBe(false);
  });

  test("lockLoadingLock sets isReadyToBeClosed to false", () => {
    viewModelMock.isReadyToBeClosed.Value = true;
    systemUnderTest.lockLoadingLock();
    expect(viewModelMock.isReadyToBeClosed.Value).toBe(false);
  });
});
