import { mock } from "jest-mock-extended";
import IElementStartedUseCase from "../../../../Core/Application/UseCases/ElementStarted/IElementStartedUseCase";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import PORT_TYPES from "../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import USECASE_TYPES from "../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import IUIPort from "../../../../Core/Ports/UIPort/IUIPort";
import ElementController from "../../../../Core/Presentation/Babylon/Elements/ElementController";
import ElementViewModel from "../../../../Core/Presentation/Babylon/Elements/ElementViewModel";

const elementStartedUseCaseMock = mock<IElementStartedUseCase>();
const uiPortMock = mock<IUIPort>();

describe("ElementController", () => {
  let viewModel: ElementViewModel;
  let systemUnderTest: ElementController;

  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind(
      USECASE_TYPES.IElementStartedUseCase
    ).toConstantValue(elementStartedUseCaseMock);
    CoreDIContainer.rebind(PORT_TYPES.IUIPort).toConstantValue(uiPortMock);
  });

  beforeEach(() => {
    viewModel = new ElementViewModel();
    systemUnderTest = new ElementController(viewModel);
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("pointerOver calls IUIPort.displayElementTooltip", () => {
    systemUnderTest.pointerOver();

    expect(uiPortMock.displayElementTooltip).toHaveBeenCalledTimes(1);
  });

  test("pointerOut calls IUIPort.hideBottomTooltip", () => {
    systemUnderTest.pointerOut();

    expect(uiPortMock.hideBottomTooltip).toHaveBeenCalledTimes(1);
  });

  test("clicked calls IElementStartedUseCase.executeAsync", () => {
    viewModel.id = 42;

    systemUnderTest.clicked();

    expect(elementStartedUseCaseMock.executeAsync).toHaveBeenCalledTimes(1);
    expect(elementStartedUseCaseMock.executeAsync).toHaveBeenCalledWith(42);
  });
});
