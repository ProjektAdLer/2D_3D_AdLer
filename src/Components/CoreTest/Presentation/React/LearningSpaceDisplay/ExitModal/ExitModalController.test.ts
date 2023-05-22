import history from "history/browser";
import ExitModalController from "../../../../../Core/Presentation/React/LearningSpaceDisplay/ExitModal/ExitModalController";
import ExitModalViewModel from "../../../../../Core/Presentation/React/LearningSpaceDisplay/ExitModal/ExitModalViewModel";
import ILoadLearningSpaceUseCase from "../../../../../Core/Application/UseCases/LoadLearningSpace/ILoadLearningSpaceUseCase";
import { mock } from "jest-mock-extended";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import USECASE_TYPES from "../../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import IGetUserLocationUseCase from "../../../../../Core/Application/UseCases/GetUserLocation/IGetUserLocationUseCase";

const mockHistoryBack = jest.spyOn(history, "back");
const mockHistoryPush = jest.spyOn(history, "push");
const viewModel = new ExitModalViewModel();
const loadLearningSpaceUseCaseMock = mock<ILoadLearningSpaceUseCase>();
const getUserLocationMock = mock<IGetUserLocationUseCase>();
describe("ExitModalController", () => {
  let systemUnderTest: ExitModalController;
  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind(
      USECASE_TYPES.ILoadLearningSpaceUseCase
    ).toConstantValue(loadLearningSpaceUseCaseMock);
    CoreDIContainer.rebind(
      USECASE_TYPES.IGetUserLocationUseCase
    ).toConstantValue(getUserLocationMock);
  });

  beforeEach(() => {
    systemUnderTest = new ExitModalController(viewModel);
  });
  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("onExitButtonClicked calls history.back", () => {
    systemUnderTest.onExitButtonClicked();
    expect(mockHistoryBack).toBeCalled();
  });
  test("onSuccessorSpaceClicked calls LoadSpaceUseCase", () => {
    getUserLocationMock.execute.mockReturnValue({ spaceID: 2, worldID: 1 });
    systemUnderTest.onSuccessorSpaceClicked(42);

    expect(loadLearningSpaceUseCaseMock.executeAsync).toBeCalledWith({
      spaceID: 42,
      worldID: 1,
    });
    expect(mockHistoryPush).toBeCalledWith("/spacedisplay/42");
  });
});
