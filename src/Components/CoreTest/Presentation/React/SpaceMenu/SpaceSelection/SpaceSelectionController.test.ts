import SpaceSelectionController from "../../../../../Core/Presentation/React/SpaceMenu/SpaceSelection/SpaceSelectionController";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";

import { mock } from "jest-mock-extended";
import USECASE_TYPES from "../../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import ILoadSpaceUseCase from "../../../../../Core/Application/UseCases/LoadSpace/ILoadSpaceUseCase";
import SpaceSelectionViewModel from "../../../../../Core/Presentation/React/SpaceMenu/SpaceSelection/SpaceSelectionViewModel";

jest.mock("src/Lib/Logger");

const loadSpaceUseCaseMock = mock<ILoadSpaceUseCase>();

const viewModel = new SpaceSelectionViewModel();

describe("SpaceSelectionController", () => {
  let systemUnderTest: SpaceSelectionController;

  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind(USECASE_TYPES.ILoadSpaceUseCase).toConstantValue(
      loadSpaceUseCaseMock
    );
  });

  beforeEach(() => {
    systemUnderTest = new SpaceSelectionController(viewModel);
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("onSpaceRowClicked calls LoadSpaceUseCase", () => {
    viewModel.worldID.Value = 1;

    systemUnderTest.onSpaceRowClicked(42);

    expect(loadSpaceUseCaseMock.executeAsync).toBeCalledWith({
      spaceID: 42,
      worldID: 1,
    });
  });
});
