import ProgressScorePanelBuilder from "../../../../../Core/Presentation/React/LearningSpaceDisplay/ProgressScorePanel/ProgressScorePanelBuilder";
import mock from "jest-mock-extended/lib/Mock";
import ILearningWorldPort from "../../../../../Core/Application/Ports/Interfaces/ILearningWorldPort";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import PORT_TYPES from "../../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import {
  HistoryWrapper,
  LocationScope,
} from "../../../../../Core/Presentation/React/ReactRelated/ReactEntryPoint/HistoryWrapper";
import ProgressScorePanelPresenter from "../../../../../Core/Presentation/React/LearningSpaceDisplay/ProgressScorePanel/ProgressScorePanelPresenter";
import PRESENTATION_TYPES from "../../../../../Core/DependencyInjection/Presentation/PRESENTATION_TYPES";
import { IProgressScorePanelPresenter } from "../../../../../Core/Presentation/React/LearningSpaceDisplay/ProgressScorePanel/IProgressScorePanelPresenter";

const worldPortMock = mock<ILearningWorldPort>();

describe("ProgressScorePanelBuilder", () => {
  let systemUnderTest: ProgressScorePanelBuilder;

  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind(PORT_TYPES.ILearningWorldPort).toConstantValue(
      worldPortMock,
    );
  });

  beforeEach(() => {
    systemUnderTest = new ProgressScorePanelBuilder();
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
      ProgressScorePanelPresenter,
    );
  });

  test("buildPresenter unbinds the presenter if it is already bound", () => {
    CoreDIContainer.bind(
      PRESENTATION_TYPES.IProgressScorePanelPresenter,
    ).toConstantValue(mock<IProgressScorePanelPresenter>);

    const unbindSpy = jest.spyOn(CoreDIContainer, "unbind");

    systemUnderTest.buildViewModel();
    systemUnderTest.buildPresenter();

    expect(unbindSpy).toHaveBeenCalledTimes(1);
  });
});
