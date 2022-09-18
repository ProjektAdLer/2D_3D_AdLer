import SpaceSelectionController from "../../../../../Core/Presentation/React/SpaceMenu/SpaceSelection/SpaceSelectionController";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import { logger } from "../../../../../../Lib/Logger";
import ILoadSpaceUseCase from "../../../../../Core/Application/LoadSpace/ILoadSpaceUseCase";
import { mock } from "jest-mock-extended";
import USECASE_TYPES from "../../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";

jest.mock("src/Lib/Logger");

const loadSpaceUseCaseMock = mock<ILoadSpaceUseCase>();

describe("SpaceSelectionController", () => {
  let systemUnderTest: SpaceSelectionController;

  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind(USECASE_TYPES.ILoadSpaceUseCase).toConstantValue(
      loadSpaceUseCaseMock
    );
  });

  beforeEach(() => {
    systemUnderTest = new SpaceSelectionController();
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("onSpaceRowClicked warns", () => {
    systemUnderTest.onSpaceRowClicked(42);

    expect(loadSpaceUseCaseMock.executeAsync).toBeCalledWith(42);
  });
});
