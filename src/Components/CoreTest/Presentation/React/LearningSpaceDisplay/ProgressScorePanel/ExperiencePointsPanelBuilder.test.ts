import ExperiencePointsPanelBuilder from "../../../../../Core/Presentation/React/LearningSpaceDisplay/ProgressScorePanel/ExperiencePointsPanel/ExperiencePointsPanelBuilder";
import { mock } from "jest-mock-extended";
import ILearningWorldPort from "../../../../../Core/Application/Ports/Interfaces/ILearningWorldPort";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import PORT_TYPES from "../../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import {
  HistoryWrapper,
  LocationScope,
} from "../../../../../Core/Presentation/React/ReactRelated/ReactEntryPoint/HistoryWrapper";
import ExperiencePointsPanelPresenter from "../../../../../Core/Presentation/React/LearningSpaceDisplay/ProgressScorePanel/ExperiencePointsPanel/ExperiencePointsPanelPresenter";
import PRESENTATION_TYPES from "../../../../../Core/DependencyInjection/Presentation/PRESENTATION_TYPES";
import IExperiencePointsPanelPresenter from "../../../../../Core/Presentation/React/LearningSpaceDisplay/ProgressScorePanel/ExperiencePointsPanel/IExperiencePointsPanelPresenter";

const worldPortMock = mock<ILearningWorldPort>();

describe("ExperiencePointsPanelBuilder", () => {
  let systemUnderTest: ExperiencePointsPanelBuilder;

  beforeAll(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind(PORT_TYPES.ILearningWorldPort).toConstantValue(
      worldPortMock,
    );
  });

  beforeEach(() => {
    systemUnderTest = new ExperiencePointsPanelBuilder();
    jest
      .spyOn(HistoryWrapper, "currentLocationScope")
      .mockReturnValue(LocationScope.spaceDisplay);
  });

  afterAll(() => {
    CoreDIContainer.restore();
    jest.restoreAllMocks();
  });

  test("buildPresenter builds the presenter and registers it with the WorldPort", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildPresenter();

    expect(systemUnderTest["presenter"]).toBeDefined();
    expect(systemUnderTest["presenter"]).toBeInstanceOf(
      ExperiencePointsPanelPresenter,
    );
  });

  test("buildPresenter unbinds the presenter if it is already bound", () => {
    CoreDIContainer.bind(
      PRESENTATION_TYPES.IExperiencePointsPanelPresenter,
    ).toConstantValue(mock<IExperiencePointsPanelPresenter>);

    const unbindSpy = jest.spyOn(CoreDIContainer, "unbind");

    systemUnderTest.buildViewModel();
    systemUnderTest.buildPresenter();

    expect(unbindSpy).toHaveBeenCalledTimes(1);
  });
});
