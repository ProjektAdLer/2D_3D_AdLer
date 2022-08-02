import { mock } from "jest-mock-extended";
import ILearningElementStartedUseCase from "../../../../Core/Application/LearningElementStarted/ILearningElementStartedUseCase";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import PORT_TYPES from "../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import USECASE_TYPES from "../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import IUIPort from "../../../../Core/Ports/UIPort/IUIPort";
import LearningElementController from "../../../../Core/Presentation/Babylon/LearningElement/LearningElementController";
import LearningElementViewModel from "../../../../Core/Presentation/Babylon/LearningElement/LearningElementViewModel";

const learningElementStartedUseCaseMock =
  mock<ILearningElementStartedUseCase>();
const uiPortMock = mock<IUIPort>();

describe("LearningElementController", () => {
  let viewModel: LearningElementViewModel;
  let systemUnderTest: LearningElementController;

  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind(
      USECASE_TYPES.ILearningElementStartedUseCase
    ).toConstantValue(learningElementStartedUseCaseMock);
    CoreDIContainer.rebind(PORT_TYPES.IUIPort).toConstantValue(uiPortMock);
  });

  beforeEach(() => {
    viewModel = new LearningElementViewModel();
    systemUnderTest = new LearningElementController(viewModel);
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("pointerOver calls IUIPort.displayLearningElementTooltip", () => {
    systemUnderTest.pointerOver();

    expect(uiPortMock.displayLearningElementTooltip).toHaveBeenCalledTimes(1);
    expect(uiPortMock.displayLearningElementTooltip).toHaveBeenCalledWith({
      name: viewModel.name.Value,
      learningElementData: viewModel.learningElementData.Value,
      id: viewModel.id,
    });
  });

  test("pointerOut calls IUIPort.hideBottomTooltip", () => {
    systemUnderTest.pointerOut();

    expect(uiPortMock.hideBottomTooltip).toHaveBeenCalledTimes(1);
  });

  test("clicked calls ILearningElementStartedUseCase.execute", () => {
    viewModel.id = 42;

    systemUnderTest.clicked();

    expect(learningElementStartedUseCaseMock.execute).toHaveBeenCalledTimes(1);
    expect(learningElementStartedUseCaseMock.execute).toHaveBeenCalledWith({
      learningElementId: 42,
    });
  });
});
