import mock from "jest-mock-extended/lib/Mock";
import ILearningWorldPort from "../../../../../Core/Application/Ports/Interfaces/ILearningWorldPort";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import PORT_TYPES from "../../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import LearningElementModalBuilder from "../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningElementModal/LearningElementModalBuilder";

const worldPortMock = mock<ILearningWorldPort>();

describe("LearningElementModalBuilder", () => {
  let systemUnderTest: LearningElementModalBuilder;

  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind<ILearningWorldPort>(
      PORT_TYPES.ILearningWorldPort
    ).toConstantValue(worldPortMock);
  });

  beforeEach(() => {
    systemUnderTest = new LearningElementModalBuilder();
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("buildPresenter builds the presenter and registers presenter with the ElementPort", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildPresenter();

    expect(systemUnderTest["presenter"]).toBeDefined();
    expect(worldPortMock.registerAdapter).toHaveBeenCalledTimes(1);
    expect(worldPortMock.registerAdapter).toHaveBeenCalledWith(
      systemUnderTest["presenter"]
    );
  });
});
