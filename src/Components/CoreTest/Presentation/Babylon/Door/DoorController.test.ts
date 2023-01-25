import { ActionEvent } from "@babylonjs/core";
import { mock } from "jest-mock-extended";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import PORT_TYPES from "../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import IUIPort from "../../../../Core/Ports/UIPort/IUIPort";
import DoorController from "../../../../Core/Presentation/Babylon/Door/DoorController";
import DoorViewModel from "../../../../Core/Presentation/Babylon/Door/DoorViewModel";
const uiPortMock = mock<IUIPort>();

describe("DoorController", () => {
  let viewModel: DoorViewModel;
  let systemUnderTest: DoorController;

  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind(PORT_TYPES.IUIPort).toConstantValue(uiPortMock);
  });

  beforeEach(() => {
    viewModel = new DoorViewModel();
    systemUnderTest = new DoorController(viewModel);
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("pointerOver calls IUIPort.displayExitQueryTooltip", () => {
    systemUnderTest.pointerOver();

    expect(uiPortMock.displayExitQueryTooltip).toHaveBeenCalledTimes(1);
  });

  test("pointerOut calls IUIPort.hideBottomTooltip", () => {
    systemUnderTest.pointerOut();

    expect(uiPortMock.hideBottomTooltip).toHaveBeenCalledTimes(1);
  });

  test.skip("clicked calls IElementStartedUseCase.executeAsync when pointerType is mouse", () => {
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

  test("clicked calls IUIPort.displayExitQueryTooltip when pointerType is touch", () => {
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

    expect(uiPortMock.displayExitQueryTooltip).toHaveBeenCalledTimes(1);
  });
});
