import { AbstractMesh, ActionEvent, Mesh } from "@babylonjs/core";
import { mock, mockDeep } from "jest-mock-extended";
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

  test("pointerOver scales up iconMeshes", () => {
    const mockedMesh = mockDeep<Mesh>();
    viewModel.iconMeshes = [mockedMesh];

    systemUnderTest.pointerOver();

    expect(mockedMesh.scaling.scaleInPlace).toHaveBeenCalledTimes(1);
    expect(mockedMesh.scaling.scaleInPlace).toHaveBeenCalledWith(
      viewModel.iconScaleUpOnHover
    );
  });

  test("pointerOut calls IUIPort.hideBottomTooltip", () => {
    systemUnderTest.pointerOut();

    expect(bottomTooltipPresenterMock.hide).toHaveBeenCalledTimes(1);
  });

  test("pointerOut scales down iconMeshes", () => {
    const mockedMesh = mockDeep<Mesh>();
    viewModel.iconMeshes = [mockedMesh];

    systemUnderTest.pointerOut();

    expect(mockedMesh.scaling.scaleInPlace).toHaveBeenCalledTimes(1);
    expect(mockedMesh.scaling.scaleInPlace).toHaveBeenCalledWith(
      1 / viewModel.iconScaleUpOnHover
    );
  });

  test("picked calls IUIPort.startLoadElementUseCase", () => {
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

    systemUnderTest.picked(mockedEvent);

    expect(elementStartedUseCaseMock.executeAsync).toHaveBeenCalledTimes(1);
  });

  test("doublePicked displays the bottom tooltip", () => {
    viewModel.id = 42;

    systemUnderTest.doublePicked();

    expect(
      bottomTooltipPresenterMock.displayLearningElementSummaryTooltip
    ).toHaveBeenCalledTimes(1);
  });
});
