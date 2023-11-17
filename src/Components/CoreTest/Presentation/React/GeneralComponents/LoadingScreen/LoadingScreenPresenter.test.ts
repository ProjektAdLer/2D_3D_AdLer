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
    systemUnderTest.showLoadingScreen();
    expect(viewModelMock.isOpen.Value).toBe(true);
  });
  test("releaseLoadingLock sets isReadyToBeClosed to true", () => {
    systemUnderTest.releaseLoadingLock();
    expect(viewModelMock.isReadyToBeClosed.Value).toBe(true);
  });
  test("pushLoadStep sets the new current Load Step in the viewModel", () => {
    systemUnderTest.pushLoadStep("test");
    expect(viewModelMock.loadStep.Value).toBe("test");
  });
});
