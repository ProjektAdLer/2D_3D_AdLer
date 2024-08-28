import { mock } from "jest-mock-extended";
import ILearningWorldPort from "../../../../../Core/Application/Ports/Interfaces/ILearningWorldPort";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import PORT_TYPES from "../../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import LearningSpaceNamePanelBuilder from "../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningSpaceNamePanel/LearningSpaceNamePanelBuilder";
import LearningSpaceNamePanelPresenter from "../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningSpaceNamePanel/LearningSpaceNamePanelPresenter";

const worldPortMock = mock<ILearningWorldPort>();

describe("LearningSpaceNamePanelBuilder", () => {
  let systemUnderTest: LearningSpaceNamePanelBuilder;

  beforeAll(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind(PORT_TYPES.ILearningWorldPort).toConstantValue(
      worldPortMock
    );
  });

  beforeEach(() => {
    systemUnderTest = new LearningSpaceNamePanelBuilder();
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("buildPresenter builds the presenter and register it with the worldPort", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildPresenter();

    expect(systemUnderTest["presenter"]).toBeDefined();
    expect(systemUnderTest["presenter"]).toBeInstanceOf(
      LearningSpaceNamePanelPresenter
    );
    expect(worldPortMock.registerAdapter).toHaveBeenCalledWith(
      systemUnderTest["presenter"]
    );
  });
});
