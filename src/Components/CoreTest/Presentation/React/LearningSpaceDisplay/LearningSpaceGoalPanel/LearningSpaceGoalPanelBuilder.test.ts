import { mock } from "jest-mock-extended";
import ILearningWorldPort from "../../../../../Core/Application/Ports/Interfaces/ILearningWorldPort";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import PORT_TYPES from "../../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import LearningSpaceGoalPanelBuilder from "../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningSpaceGoalPanel/LearningSpaceGoalPanelBuilder";
import LearningSpaceGoalPanelPresenter from "../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningSpaceGoalPanel/LearningSpaceGoalPanelPresenter";
import PRESENTATION_TYPES from "../../../../../Core/DependencyInjection/Presentation/PRESENTATION_TYPES";
import ILearningSpaceGoalPanelPresenter from "../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningSpaceGoalPanel/ILearningSpaceGoalPanelPresenter";

const worldPortMock = mock<ILearningWorldPort>();

describe("LearningSpaceGoalPanelBuilder", () => {
  let systemUnderTest: LearningSpaceGoalPanelBuilder;

  beforeAll(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind(PORT_TYPES.ILearningWorldPort).toConstantValue(
      worldPortMock
    );
  });

  beforeEach(() => {
    systemUnderTest = new LearningSpaceGoalPanelBuilder();
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("buildPresenter builds the presenter and register it with the WorldPort", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildPresenter();

    expect(systemUnderTest["presenter"]).toBeDefined();
    expect(systemUnderTest["presenter"]).toBeInstanceOf(
      LearningSpaceGoalPanelPresenter
    );
    expect(worldPortMock.registerAdapter).toHaveBeenCalledWith(
      systemUnderTest["presenter"]
    );
  });
  test("buildPresenter unbinds the presenter if it is already bound", () => {
    CoreDIContainer.bind(
      PRESENTATION_TYPES.ILearningSpaceGoalPanelPresenter
    ).toConstantValue(mock<ILearningSpaceGoalPanelPresenter>);

    const unbindSpy = jest.spyOn(CoreDIContainer, "unbind");

    systemUnderTest.buildViewModel();
    systemUnderTest.buildPresenter();

    expect(unbindSpy).toHaveBeenCalledTimes(1);
  });
});
