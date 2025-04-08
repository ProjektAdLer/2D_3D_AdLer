import mock from "jest-mock-extended/lib/Mock";
import ILearningWorldPort from "../../../../../Core/Application/Ports/Interfaces/ILearningWorldPort";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import PORT_TYPES from "../../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import LearningSpaceScorePanelBuilder from "../../../../../Core/Presentation/React/LearningSpaceDisplay/ProgressScorePanel/LearningSpaceScorePanel/LearningSpaceScorePanelBuilder";
import {
  HistoryWrapper,
  LocationScope,
} from "../../../../../Core/Presentation/React/ReactRelated/ReactEntryPoint/HistoryWrapper";

const worldPortMock = mock<ILearningWorldPort>();

describe("LearningSpaceScorePanelBuilder", () => {
  let systemUnderTest: LearningSpaceScorePanelBuilder;

  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind(PORT_TYPES.ILearningWorldPort).toConstantValue(
      worldPortMock,
    );
  });

  beforeEach(() => {
    systemUnderTest = new LearningSpaceScorePanelBuilder();
    jest
      .spyOn(HistoryWrapper, "currentLocationScope")
      .mockReturnValue(LocationScope.spaceDisplay);
  });

  afterAll(() => {
    CoreDIContainer.restore();
    jest.restoreAllMocks();
  });

  test("buildPresenter builds the presenter, and registers it with the LearningWorldPort", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildPresenter();

    expect(systemUnderTest["presenter"]).toBeDefined();
    expect(worldPortMock.registerAdapter).toHaveBeenCalledWith(
      systemUnderTest["presenter"],
      LocationScope.spaceDisplay,
    );
  });
});
