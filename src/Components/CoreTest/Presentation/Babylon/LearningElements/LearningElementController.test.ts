import { ActionEvent } from "@babylonjs/core";
import { mock } from "jest-mock-extended";
import ILoadLearningElementUseCase from "../../../../Core/Application/UseCases/LoadLearningElement/ILoadLearningElementUseCase";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import PRESENTATION_TYPES from "../../../../Core/DependencyInjection/Presentation/PRESENTATION_TYPES";
import USECASE_TYPES from "../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import LearningElementController from "../../../../Core/Presentation/Babylon/LearningElements/LearningElementController";
import LearningElementViewModel from "../../../../Core/Presentation/Babylon/LearningElements/LearningElementViewModel";
import IBottomTooltipPresenter from "../../../../Core/Presentation/React/LearningSpaceDisplay/BottomTooltip/IBottomTooltipPresenter";

const elementStartedUseCaseMock = mock<ILoadLearningElementUseCase>();
const bottomTooltipPresenterMock = mock<IBottomTooltipPresenter>();

describe("LearningElementController", () => {
  let viewModel: LearningElementViewModel;
  let systemUnderTest: LearningElementController;

  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind(
      USECASE_TYPES.ILoadLearningElementUseCase
    ).toConstantValue(elementStartedUseCaseMock);
    CoreDIContainer.bind(
      PRESENTATION_TYPES.IBottomTooltipPresenter
    ).toConstantValue(bottomTooltipPresenterMock);
  });

  beforeEach(() => {
    viewModel = new LearningElementViewModel();
    systemUnderTest = new LearningElementController(viewModel);
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("pointerOver calls IUIPort.displayElementSummaryTooltip", () => {
    systemUnderTest.pointerOver();

    expect(
      bottomTooltipPresenterMock.displayLearningElementSummaryTooltip
    ).toHaveBeenCalledTimes(1);
  });

  test("pointerOut calls IUIPort.hideBottomTooltip", () => {
    systemUnderTest.pointerOut();

    expect(bottomTooltipPresenterMock.hide).toHaveBeenCalledTimes(1);
  });

  test("clicked calls IElementStartedUseCase.executeAsync when pointerType is mouse", () => {
    viewModel.id = 42;
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

    expect(elementStartedUseCaseMock.executeAsync).toHaveBeenCalledTimes(1);
    expect(elementStartedUseCaseMock.executeAsync).toHaveBeenCalledWith(42);
  });

  test("clicked calls IUIPort.displayElementSummaryTooltip when pointerType is touch", () => {
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
      bottomTooltipPresenterMock.displayLearningElementSummaryTooltip
    ).toHaveBeenCalledTimes(1);
  });
});
