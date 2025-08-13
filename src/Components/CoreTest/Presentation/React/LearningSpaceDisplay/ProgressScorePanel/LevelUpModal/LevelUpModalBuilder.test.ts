import LevelUpModalBuilder from "../../../../../../Core/Presentation/React/LearningSpaceDisplay/LevelUpModal/LevelUpModalBuilder";
import CoreDIContainer from "../../../../../../Core/DependencyInjection/CoreDIContainer";
import PORT_TYPES from "../../../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import ILearningWorldPort from "../../../../../../Core/Application/Ports/Interfaces/ILearningWorldPort";
import {
  HistoryWrapper,
  LocationScope,
} from "../../../../../../Core/Presentation/React/ReactRelated/ReactEntryPoint/HistoryWrapper";
import { mock } from "jest-mock-extended";
import LevelUpModalPresenter from "../../../../../../Core/Presentation/React/LearningSpaceDisplay/LevelUpModal/LevelUpModalPresenter";
import PRESENTATION_TYPES from "../../../../../../Core/DependencyInjection/Presentation/PRESENTATION_TYPES";
import { ILevelUpModalPresenter } from "../../../../../../Core/Presentation/React/LearningSpaceDisplay/LevelUpModal/ILevelUpModalPresenter";

const worldPortMock = mock<ILearningWorldPort>();

describe("LevelUpModalBuilder", () => {
  let systemUnderTest: LevelUpModalBuilder;

  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind(PORT_TYPES.ILearningWorldPort).toConstantValue(
      worldPortMock,
    );
  });

  beforeEach(() => {
    systemUnderTest = new LevelUpModalBuilder();
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
    expect(systemUnderTest["presenter"]).toBeInstanceOf(LevelUpModalPresenter);
  });

  test("buildPresenter unbinds the presenter if it is already bound", () => {
    CoreDIContainer.bind(
      PRESENTATION_TYPES.ILevelUpModalPresenter,
    ).toConstantValue(mock<ILevelUpModalPresenter>);

    const unbindSpy = jest.spyOn(CoreDIContainer, "unbind");

    systemUnderTest.buildViewModel();
    systemUnderTest.buildPresenter();

    expect(unbindSpy).toHaveBeenCalledTimes(1);
  });
});
