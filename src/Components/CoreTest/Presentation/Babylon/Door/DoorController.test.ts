import { mock } from "jest-mock-extended";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import DoorController from "../../../../Core/Presentation/Babylon/Door/DoorController";
import DoorViewModel from "../../../../Core/Presentation/Babylon/Door/DoorViewModel";
import IBottomTooltipPresenter from "../../../../Core/Presentation/React/LearningSpaceDisplay/BottomTooltip/IBottomTooltipPresenter";
import PRESENTATION_TYPES from "../../../../Core/DependencyInjection/Presentation/PRESENTATION_TYPES";
import IExitModalPresenter from "../../../../Core/Presentation/React/LearningSpaceDisplay/ExitModal/IExitModalPresenter";
import IGetLearningSpacePrecursorAndSuccessorUseCase from "../../../../Core/Application/UseCases/GetLearningSpacePrecursorAndSuccessor/IGetLearningSpacePrecursorAndSuccessorUseCase";
import USECASE_TYPES from "../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import { Vector3 } from "@babylonjs/core";

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
      PRESENTATION_TYPES.IBottomTooltipPresenter,
    ).toConstantValue(bottomTooltipPresenterMock);
    CoreDIContainer.bind(
      PRESENTATION_TYPES.IExitModalPresenter,
    ).toConstantValue(exitModalPresenterMock);
    CoreDIContainer.bind(
      USECASE_TYPES.IGetLearningSpacePrecursorAndSuccessorUseCase,
    ).toConstantValue(getLearningSpacePrecursorAndSuccessorUseCaseMock);
  });

  beforeEach(() => {
    viewModel = new DoorViewModel();
    viewModel.iconMeshes = [
      { scaling: Vector3.One() } as any,
      { scaling: Vector3.One() } as any,
    ];
    systemUnderTest = new DoorController(viewModel);

    jest.clearAllMocks();
    bottomTooltipPresenterMock.display.mockReturnValue(1);
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  //ANF-ID: [ELG0022]
  test("pointerOver calls BottomTooltipPresenter.display", () => {
    systemUnderTest.pointerOver();

    expect(bottomTooltipPresenterMock.display).toHaveBeenCalledTimes(1);
  });

  test("pointerOver does not display tooltip if one is already shown", () => {
    systemUnderTest["hoverToolTipId"] = 1;

    systemUnderTest.pointerOver();

    expect(bottomTooltipPresenterMock.display).not.toHaveBeenCalled();
  });

  test("pointerOver scales up icon meshes", () => {
    systemUnderTest.pointerOver();

    viewModel.iconMeshes.forEach((mesh) => {
      expect(mesh.scaling.x).toBe(viewModel.iconScaleUpOnHover);
      expect(mesh.scaling.y).toBe(viewModel.iconScaleUpOnHover);
      expect(mesh.scaling.z).toBe(viewModel.iconScaleUpOnHover);
    });
  });

  test("pointerOver handles missing iconMeshes gracefully", () => {
    viewModel.iconMeshes = undefined as any;

    expect(() => {
      systemUnderTest.pointerOver();
    }).not.toThrow();
  });

  //ANF-ID: [ELG0022]
  test("pointerOut calls BottomTooltipPresenter.hide when hoverTooltipId is set", () => {
    systemUnderTest["hoverToolTipId"] = 1; // set tooltip id to non-default value

    systemUnderTest.pointerOut();

    expect(bottomTooltipPresenterMock.hide).toHaveBeenCalledWith(1);
  });

  test("pointerOut resets hoverToolTipId to -1 when hoverTooltipId is set", () => {
    systemUnderTest["hoverToolTipId"] = 1; // set tooltip id to non-default value

    systemUnderTest.pointerOut();

    expect(systemUnderTest["hoverToolTipId"]).toBe(-1);
  });

  test("pointerOut resets icon scale", () => {
    // First scale up
    systemUnderTest.pointerOver();

    // Then pointer out
    systemUnderTest["hoverToolTipId"] = 1;
    systemUnderTest.pointerOut();

    viewModel.iconMeshes.forEach((mesh) => {
      expect(mesh.scaling.x).toBe(1);
      expect(mesh.scaling.y).toBe(1);
      expect(mesh.scaling.z).toBe(1);
    });
  });

  test("pointerOut does nothing when hoverToolTipId is -1", () => {
    systemUnderTest["hoverToolTipId"] = -1;

    systemUnderTest.pointerOut();

    expect(bottomTooltipPresenterMock.hide).not.toHaveBeenCalled();
  });

  test("pointerOut handles missing iconMeshes gracefully", () => {
    systemUnderTest["hoverToolTipId"] = 1;
    viewModel.iconMeshes = undefined as any;

    expect(() => {
      systemUnderTest.pointerOut();
    }).not.toThrow();
  });

  // ANF-ID: [EWE0032]
  test("picked calls getLearningSpacePrecursorAndSuccessorUseCase.execute when isInteractable is set to true", () => {
    viewModel.isInteractable.Value = true;
    viewModel.isInputEnabled.Value = true;

    systemUnderTest.picked();

    expect(
      getLearningSpacePrecursorAndSuccessorUseCaseMock.execute,
    ).toHaveBeenCalledTimes(1);
  });

  // ANF-ID: [EWE0032]
  test("picked calls ExitModalPresenter.open when isInteractable is set to true", () => {
    viewModel.isInteractable.Value = true;
    viewModel.isInputEnabled.Value = true;

    systemUnderTest.picked();

    expect(exitModalPresenterMock.open).toHaveBeenCalledWith(viewModel.isExit);
  });

  test("picked does not call services when isInteractable is false", () => {
    viewModel.isInteractable.Value = false;
    viewModel.isInputEnabled.Value = true;

    systemUnderTest.picked();

    expect(
      getLearningSpacePrecursorAndSuccessorUseCaseMock.execute,
    ).not.toHaveBeenCalled();
    expect(exitModalPresenterMock.open).not.toHaveBeenCalled();
  });

  test("picked does not call services when isInputEnabled is false", () => {
    viewModel.isInteractable.Value = true;
    viewModel.isInputEnabled.Value = false;

    systemUnderTest.picked();

    expect(
      getLearningSpacePrecursorAndSuccessorUseCaseMock.execute,
    ).not.toHaveBeenCalled();
    expect(exitModalPresenterMock.open).not.toHaveBeenCalled();
  });

  test("accessibilityPicked calls onPicked directly", () => {
    const onPickedSpy = jest.spyOn(systemUnderTest as any, "onPicked");

    systemUnderTest.accessibilityPicked();

    expect(onPickedSpy).toHaveBeenCalledTimes(1);
  });

  test("onAvatarInteractableChange calls BottomTooltipPresenter.display when isInteractable is set to true", () => {
    viewModel.isInteractable.Value = false;

    systemUnderTest["onAvatarInteractableChange"](true);

    expect(bottomTooltipPresenterMock.display).toHaveBeenCalledTimes(1);
  });

  test("onAvatarInteractableChange displays correct tooltip for exit door", () => {
    viewModel.isExit = true;
    viewModel.isInteractable.Value = false;

    systemUnderTest["onAvatarInteractableChange"](true);

    expect(bottomTooltipPresenterMock.display).toHaveBeenCalledWith(
      expect.any(String), // i18next translation
      expect.any(String), // DoorTypes.exitDoor
      undefined,
      expect.any(Function),
    );
  });

  test("onAvatarInteractableChange displays correct tooltip for entry door", () => {
    viewModel.isExit = false;
    viewModel.isInteractable.Value = false;

    systemUnderTest["onAvatarInteractableChange"](true);

    expect(bottomTooltipPresenterMock.display).toHaveBeenCalledWith(
      expect.any(String), // i18next translation
      expect.any(String), // DoorTypes.entryDoor
      undefined,
      expect.any(Function),
    );
  });

  test("onAvatarInteractableChange scales up icon when becoming interactable", () => {
    systemUnderTest["onAvatarInteractableChange"](true);

    viewModel.iconMeshes.forEach((mesh) => {
      expect(mesh.scaling.x).toBe(viewModel.iconScaleUpOnHover);
    });
  });

  test("onAvatarInteractableChange calls BottomTooltipPresenter.hide when isInteractable is set to false and proximityTooltipId is set", () => {
    systemUnderTest["proximityToolTipId"] = 1; // set tooltip id to non-default value
    viewModel.isInteractable.Value = false;

    systemUnderTest["onAvatarInteractableChange"](false);

    expect(bottomTooltipPresenterMock.hide).toHaveBeenCalledWith(1);
  });

  test("onAvatarInteractableChange resets proximityTooltipId to -1 when isInteractable is set to false and proximityTooltipId is set", () => {
    systemUnderTest["proximityToolTipId"] = 1; // set tooltip id to non-default value
    viewModel.isInteractable.Value = false;

    systemUnderTest["onAvatarInteractableChange"](false);

    expect(systemUnderTest["proximityToolTipId"]).toBe(-1);
  });

  test("onAvatarInteractableChange resets icon scale when becoming non-interactable", () => {
    systemUnderTest["proximityToolTipId"] = 1;

    systemUnderTest["onAvatarInteractableChange"](false);

    viewModel.iconMeshes.forEach((mesh) => {
      expect(mesh.scaling.x).toBe(1);
    });
  });

  test("onAvatarInteractableChange calls picked if its special focused", () => {
    viewModel.isInteractable.Value = true;
    viewModel.isSpecialFocused = true;

    const pickedSpy = jest.spyOn(systemUnderTest, "picked");

    systemUnderTest["onAvatarInteractableChange"](true);

    expect(pickedSpy).toHaveBeenCalledTimes(1);
  });

  test("onAvatarInteractableChange does not call picked if not special focused", () => {
    viewModel.isInteractable.Value = true;
    viewModel.isSpecialFocused = false;

    const pickedSpy = jest.spyOn(systemUnderTest, "picked");

    systemUnderTest["onAvatarInteractableChange"](true);

    expect(pickedSpy).not.toHaveBeenCalled();
  });

  test("tooltip callback function calls picked method", () => {
    const pickedSpy = jest.spyOn(systemUnderTest, "picked");

    // Trigger display tooltip to capture the callback
    systemUnderTest["onAvatarInteractableChange"](true);

    // Get the callback function from the display call
    const callbackFunction =
      bottomTooltipPresenterMock.display.mock.calls[0][3];

    if (callbackFunction) {
      callbackFunction();
    }

    expect(pickedSpy).toHaveBeenCalledTimes(1);
  });

  test("constructor subscribes to isInteractable observable", () => {
    const subscribeSpy = jest.spyOn(viewModel.isInteractable, "subscribe");

    new DoorController(viewModel);

    expect(subscribeSpy).toHaveBeenCalledWith(expect.any(Function));
  });

  test("displayTooltip returns tooltip id from presenter", () => {
    bottomTooltipPresenterMock.display.mockReturnValue(42);

    const result = systemUnderTest["displayTooltip"]();

    expect(result).toBe(42);
  });

  test("scaleUpIcon handles empty iconMeshes array", () => {
    viewModel.iconMeshes = [];

    expect(() => {
      systemUnderTest["scaleUpIcon"]();
    }).not.toThrow();
  });

  test("resetIconScale handles empty iconMeshes array", () => {
    viewModel.iconMeshes = [];

    expect(() => {
      systemUnderTest["resetIconScale"]();
    }).not.toThrow();
  });
});
