import history from "~ReactEntryPoint/history";
import ExitModalController from "../../../../../Core/Presentation/React/LearningSpaceDisplay/ExitModal/ExitModalController";
import ExitModalViewModel from "../../../../../Core/Presentation/React/LearningSpaceDisplay/ExitModal/ExitModalViewModel";
import { mock } from "jest-mock-extended";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import USECASE_TYPES from "../../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import ISetUserLocationUseCase from "../../../../../Core/Application/UseCases/SetUserLocation/ISetUserLocationUseCase";
import IGetUserLocationUseCase from "../../../../../Core/Application/UseCases/GetUserLocation/IGetUserLocationUseCase";

const mockHistoryPush = jest.spyOn(history, "push");
const viewModel = new ExitModalViewModel();
const setUserLocationMock = mock<ISetUserLocationUseCase>();
const getUserLocationMock = mock<IGetUserLocationUseCase>();

describe("ExitModalController", () => {
  let systemUnderTest: ExitModalController;
  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind(
      USECASE_TYPES.ISetUserLocationUseCase,
    ).toConstantValue(setUserLocationMock);
    CoreDIContainer.rebind(
      USECASE_TYPES.IGetUserLocationUseCase,
    ).toConstantValue(getUserLocationMock);
  });

  beforeEach(() => {
    systemUnderTest = new ExitModalController(viewModel);
  });
  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("onExitButtonClicked calls history.push", () => {
    systemUnderTest.onExitButtonClicked();
    expect(mockHistoryPush).toBeCalledWith("/spacemenu");
  });

  test("onSuccessorSpaceClicked calls SetUserLocationUseCase", () => {
    getUserLocationMock.execute.mockReturnValue({ spaceID: 2, worldID: 1 });
    systemUnderTest.onPrecursorOrSuccessorSpaceClicked(42);

    expect(setUserLocationMock.execute).toBeCalledWith({
      spaceID: 42,
      worldID: 1,
    });
    expect(mockHistoryPush).toBeCalledWith("/spacedisplay/42");
  });
});
