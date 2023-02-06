import { ActionEvent } from "@babylonjs/core";
import { mock } from "jest-mock-extended";
import ILoadElementUseCase from "../../../../Core/Application/UseCases/ElementStarted/ILoadElementUseCase";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import PORT_TYPES from "../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import USECASE_TYPES from "../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import IUIPort from "../../../../Core/Ports/UIPort/IUIPort";
import ElementController from "../../../../Core/Presentation/Babylon/Elements/ElementController";
import ElementViewModel from "../../../../Core/Presentation/Babylon/Elements/ElementViewModel";

const elementStartedUseCaseMock = mock<ILoadElementUseCase>();
const uiPortMock = mock<IUIPort>();

describe("ElementController", () => {
  let viewModel: ElementViewModel;
  let systemUnderTest: ElementController;

  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind(USECASE_TYPES.ILoadElementUseCase).toConstantValue(
      elementStartedUseCaseMock
    );
    CoreDIContainer.rebind(PORT_TYPES.IUIPort).toConstantValue(uiPortMock);
  });

  beforeEach(() => {
    viewModel = new ElementViewModel();
    systemUnderTest = new ElementController(viewModel);
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("pointerOver calls IUIPort.displayElementSummaryTooltip", () => {
    systemUnderTest.pointerOver();

    expect(uiPortMock.displayElementSummaryTooltip).toHaveBeenCalledTimes(1);
  });

  test("pointerOut calls IUIPort.hideBottomTooltip", () => {
    systemUnderTest.pointerOut();

    expect(uiPortMock.hideBottomTooltip).toHaveBeenCalledTimes(1);
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

    expect(uiPortMock.displayElementSummaryTooltip).toHaveBeenCalledTimes(1);
  });
});
