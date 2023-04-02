import { mock } from "jest-mock-extended";
import LearningSpaceCompletionModalBuilder from "../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningSpaceCompletionModal/LearningSpaceCompletionModalBuilder";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import PORT_TYPES from "../../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import ILearningWorldPort from "../../../../../Core/Application/Ports/Interfaces/ILearningWorldPort";

const worldPortMock = mock<ILearningWorldPort>();

describe("LearningSpaceCompletionModalBuilder", () => {
  let systemUnderTest: LearningSpaceCompletionModalBuilder;

  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind<ILearningWorldPort>(
      PORT_TYPES.ILearningWorldPort
    ).toConstantValue(worldPortMock);
  });

  beforeEach(() => {
    systemUnderTest = new LearningSpaceCompletionModalBuilder();
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("buildPresenter should register the presenter with the LearningWorldPort", () => {
    systemUnderTest.buildViewModel();

    systemUnderTest.buildPresenter();

    expect(worldPortMock.registerAdapter).toHaveBeenCalledWith(
      systemUnderTest.getPresenter()
    );
  });
});
