import { AbstractMesh, ActionEvent, Mesh, Vector3 } from "@babylonjs/core";
import { mock, mockDeep } from "jest-mock-extended";
import ILoadLearningElementUseCase from "../../../../Core/Application/UseCases/LoadLearningElement/ILoadLearningElementUseCase";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import PRESENTATION_TYPES from "../../../../Core/DependencyInjection/Presentation/PRESENTATION_TYPES";
import USECASE_TYPES from "../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import LearningElementController from "../../../../Core/Presentation/Babylon/LearningElements/LearningElementController";
import LearningElementViewModel from "../../../../Core/Presentation/Babylon/LearningElements/LearningElementViewModel";
import IBottomTooltipPresenter from "../../../../Core/Presentation/React/LearningSpaceDisplay/BottomTooltip/IBottomTooltipPresenter";
import { LearningElementTypes } from "../../../../Core/Domain/Types/LearningElementTypes";
import ILoadAdaptivityElementUseCase from "../../../../Core/Application/UseCases/Adaptivity/LoadAdaptivityElementUseCase/ILoadAdaptivityElementUseCase";

const loadLearningElementUseCaseMock = mock<ILoadLearningElementUseCase>();
const LoadAdaptivityElementUseCaseMock = mock<ILoadAdaptivityElementUseCase>();
const bottomTooltipPresenterMock = mock<IBottomTooltipPresenter>();

describe("LearningElementController", () => {
  let viewModel: LearningElementViewModel;
  let systemUnderTest: LearningElementController;

  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind(
      USECASE_TYPES.ILoadLearningElementUseCase,
    ).toConstantValue(loadLearningElementUseCaseMock);
    CoreDIContainer.rebind(
      USECASE_TYPES.ILoadAdaptivityElementUseCase,
    ).toConstantValue(LoadAdaptivityElementUseCaseMock);
    CoreDIContainer.bind(
      PRESENTATION_TYPES.IBottomTooltipPresenter,
    ).toConstantValue(bottomTooltipPresenterMock);
  });

  beforeEach(() => {
    viewModel = new LearningElementViewModel();
    systemUnderTest = new LearningElementController(viewModel);
    viewModel.difficulty = {
      // Initialize difficulty for tests
      baseXP: 10,
      multiplicator: 1,
      difficultyType: 0,
    };
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  //ANF-ID: [ELG0024]
  test("pointerOver calls displayElementSummaryTooltip on tooltip presenter", () => {
    systemUnderTest.pointerOver();

    expect(bottomTooltipPresenterMock.display).toHaveBeenCalledTimes(1);
  });

  test("pointerOver scales up iconMeshes", () => {
    const mockedMesh = mockDeep<Mesh>();
    viewModel.iconMeshes = [mockedMesh];

    systemUnderTest.pointerOver();

    expect(mockedMesh.scaling).toStrictEqual(
      new Vector3(
        viewModel.iconScaleUpOnHover,
        viewModel.iconScaleUpOnHover,
        viewModel.iconScaleUpOnHover,
      ),
    );
  });

  //ANF-ID: [ELG0024]
  test("pointerOut calls hideBottomTooltip on tooltip presenter", () => {
    systemUnderTest["hoverToolTipId"] = 1; // set tooltip id to non-default value

    systemUnderTest.pointerOut();

    expect(bottomTooltipPresenterMock.hide).toHaveBeenCalledTimes(1);
  });

  test("pointerOut scales down iconMeshes", () => {
    const mockedMesh = mockDeep<Mesh>();
    viewModel.iconMeshes = [mockedMesh];
    systemUnderTest["hoverToolTipId"] = 1; // set tooltip id to non-default value

    systemUnderTest.pointerOut();

    expect(mockedMesh.scaling).toStrictEqual(Vector3.One());
  });

  test("pointerOut resets hoverToolTipId to -1 when hoverTooltipId is set", () => {
    systemUnderTest["hoverToolTipId"] = 1; // set tooltip id to non-default value

    systemUnderTest.pointerOut();

    expect(systemUnderTest["hoverToolTipId"]).toBe(-1);
  });

  // ANF-ID: [EWE0035]
  test("picked calls LoadLearningElementUseCase for non-adaptivity elements when isInteractable is true", () => {
    viewModel.id = 42;
    viewModel.type = LearningElementTypes.pdf;
    viewModel.isInteractable.Value = true;

    systemUnderTest.picked();

    expect(loadLearningElementUseCaseMock.executeAsync).toHaveBeenCalledTimes(
      1,
    );
  });

  // ANF-ID: [EWE0035]
  test("picked calls LoadAdaptivityElementUseCase for adaptivity elements when isInteractable is true", () => {
    viewModel.id = 42;
    viewModel.type = LearningElementTypes.adaptivity;
    viewModel.isInteractable.Value = true;

    systemUnderTest.picked();

    expect(LoadAdaptivityElementUseCaseMock.executeAsync).toHaveBeenCalledTimes(
      1,
    );
  });

  test("picked calls no use case when isInteractable is false", () => {
    viewModel.id = 42;
    viewModel.type = LearningElementTypes.pdf;
    viewModel.isInteractable.Value = false;

    systemUnderTest.picked();

    expect(loadLearningElementUseCaseMock.executeAsync).toHaveBeenCalledTimes(
      0,
    );
    expect(LoadAdaptivityElementUseCaseMock.executeAsync).toHaveBeenCalledTimes(
      0,
    );
  });

  test("onAvatarInteractableChange calls display on tooltip presenter when isInteractable is true", () => {
    viewModel.name = "testName";
    viewModel.type = LearningElementTypes.pdf;
    viewModel.value = 42;

    systemUnderTest["onAvatarInteractableChange"](true);

    expect(bottomTooltipPresenterMock.display).toHaveBeenCalledTimes(1);
  });

  test("onAvatarInteractableChange calls hide on tooltip presenter when isInteractable is false and proximityToolTipId is set", () => {
    systemUnderTest["proximityToolTipId"] = 1; // set tooltip id to non-default value

    systemUnderTest["onAvatarInteractableChange"](false);

    expect(bottomTooltipPresenterMock.hide).toHaveBeenCalledTimes(1);
  });
});
