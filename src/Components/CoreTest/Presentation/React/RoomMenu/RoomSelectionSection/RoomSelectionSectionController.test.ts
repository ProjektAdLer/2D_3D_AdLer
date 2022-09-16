import RoomSelectionSectionController from "../../../../../Core/Presentation/React/RoomMenu/RoomSelectionSection/RoomSelectionSectionController";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import { logger } from "../../../../../../Lib/Logger";
import ILoadRoomUseCase from "../../../../../Core/Application/LoadRoom/ILoadRoomUseCase";
import { mock } from "jest-mock-extended";
import USECASE_TYPES from "../../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";

jest.mock("src/Lib/Logger");

const loadRoomUseCaseMock = mock<ILoadRoomUseCase>();

describe("RoomSelectionSectionController", () => {
  let systemUnderTest: RoomSelectionSectionController;

  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind(USECASE_TYPES.ILoadRoomUseCase).toConstantValue(
      loadRoomUseCaseMock
    );
  });

  beforeEach(() => {
    systemUnderTest = new RoomSelectionSectionController();
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("onLearningRoomRowClicked warns", () => {
    systemUnderTest.onRoomRowClicked(42);

    expect(loadRoomUseCaseMock.executeAsync).toBeCalledWith(42);
  });
});
