import { mock } from "jest-mock-extended";
import ILearningWorldPort from "../../../../../Core/Application/Ports/Interfaces/ILearningWorldPort";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import PORT_TYPES from "../../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import LearningWorldDetailBuilder from "../../../../../Core/Presentation/React/LearningWorldMenu/LearningWorldDetail/LearningWorldDetailBuilder";

const worldPortMock = mock<ILearningWorldPort>();
describe("LearningWorldDetailBuilder", () => {
  let systemUnderTest: LearningWorldDetailBuilder;

  beforeAll(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind(PORT_TYPES.ILearningWorldPort).toConstantValue(
      worldPortMock
    );
  });
  beforeEach(() => {
    systemUnderTest = new LearningWorldDetailBuilder();
  });

  test("constructor doesn't throw", () => {
    expect(systemUnderTest).toBeDefined();
  });

  test("buildPresenter builds the presenter and register it with the WorldPort", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildPresenter();

    expect(systemUnderTest["presenter"]).toBeDefined();
    expect(worldPortMock.registerAdapter).toHaveBeenCalledWith(
      systemUnderTest["presenter"]
    );
  });
});