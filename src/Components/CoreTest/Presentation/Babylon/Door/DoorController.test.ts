import { ActionEvent } from "@babylonjs/core";
import { mock } from "jest-mock-extended";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import DoorController from "../../../../Core/Presentation/Babylon/Door/DoorController";
import DoorViewModel from "../../../../Core/Presentation/Babylon/Door/DoorViewModel";
import IBottomTooltipPresenter from "../../../../Core/Presentation/React/LearningSpaceDisplay/BottomTooltip/IBottomTooltipPresenter";
import PRESENTATION_TYPES from "../../../../Core/DependencyInjection/Presentation/PRESENTATION_TYPES";
import IExitModalPresenter from "../../../../Core/Presentation/React/LearningSpaceDisplay/ExitModal/IExitModalPresenter";
import IGetLearningSpacePrecursorAndSuccessorUseCase from "../../../../Core/Application/UseCases/GetLearningSpacePrecursorAndSuccessor/IGetLearningSpacePrecursorAndSuccessorUseCase";
import USECASE_TYPES from "../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";

const bottomTooltipPresenterMock = mock<IBottomTooltipPresenter>();
const exitModalPresenterMock = mock<IExitModalPresenter>();
const getLearningSpacePrecursorAndSuccessorUseCaseMock =
  mock<IGetLearningSpacePrecursorAndSuccessorUseCase>();

describe("DoorController", () => {
  let viewModel: DoorViewModel;
  let systemUnderTest: DoorController;

  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.unbindAll();
    CoreDIContainer.bind(
      PRESENTATION_TYPES.IBottomTooltipPresenter
    ).toConstantValue(bottomTooltipPresenterMock);
    CoreDIContainer.bind(
      PRESENTATION_TYPES.IExitModalPresenter
    ).toConstantValue(exitModalPresenterMock);
    CoreDIContainer.bind(
      USECASE_TYPES.IGetLearningSpacePrecursorAndSuccessorUseCase
    ).toConstantValue(getLearningSpacePrecursorAndSuccessorUseCaseMock);
  });

  beforeEach(() => {
    viewModel = new DoorViewModel();
    systemUnderTest = new DoorController(viewModel);
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("pointerOver calls BottomTooltipPresenter.displayExitQueryTooltip", () => {
    systemUnderTest.pointerOver();

    expect(
      bottomTooltipPresenterMock.displayExitQueryTooltip
    ).toHaveBeenCalledTimes(1);
  });

  test("pointerOut calls BottomTooltipPresenter.hide", () => {
    systemUnderTest.pointerOut();

    expect(bottomTooltipPresenterMock.hide).toHaveBeenCalledTimes(1);
  });

  test("clicked calls getLearningSpacePrecursorAndSuccessorUseCase.execute when pointerType is mouse", () => {
    const mockedEvent: ActionEvent = {
      sourceEvent: {
        pointerType: "mouse",
      },
      source: undefined,
      pointerX: 0,
      pointerY: 0,
      meshUnderPointer: null,
    };

    systemUnderTest.clicked(mockedEvent);

    expect(
      getLearningSpacePrecursorAndSuccessorUseCaseMock.execute
    ).toHaveBeenCalledTimes(1);
  });

  test("clicked calls BottomTooltipPresenter.displayExitQueryTooltip when pointerType is touch", () => {
    const mockedEvent: ActionEvent = {
      sourceEvent: {
        pointerType: "touch",
      },
      source: undefined,
      pointerX: 0,
      pointerY: 0,
      meshUnderPointer: null,
    };

    systemUnderTest.clicked(mockedEvent);

    expect(
      bottomTooltipPresenterMock.displayExitQueryTooltip
    ).toHaveBeenCalledTimes(1);
  });
});
