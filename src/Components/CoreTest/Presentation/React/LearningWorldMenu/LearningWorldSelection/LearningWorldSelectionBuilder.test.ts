import { mock } from "jest-mock-extended";
import ILearningWorldPort from "../../../../../Core/Application/Ports/Interfaces/ILearningWorldPort";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import PORT_TYPES from "../../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import LearningWorldSelectionBuilder from "../../../../../Core/Presentation/React/LearningWorldMenu/LearningWorldSelection/LearningWorldSelectionBuilder";
import {
  HistoryWrapper,
  LocationScope,
} from "../../../../../Core/Presentation/React/ReactRelated/ReactEntryPoint/HistoryWrapper";

const worldPortMock = mock<ILearningWorldPort>();

describe("WorldSelectionBuilder", () => {
  let systemUnderTest: LearningWorldSelectionBuilder;

  beforeAll(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind(PORT_TYPES.ILearningWorldPort).toConstantValue(
      worldPortMock,
    );
  });

  beforeEach(() => {
    systemUnderTest = new LearningWorldSelectionBuilder();
    jest
      .spyOn(HistoryWrapper, "currentLocationScope")
      .mockReturnValue(LocationScope.worldMenu);
  });

  afterAll(() => {
    CoreDIContainer.restore();
    jest.restoreAllMocks();
  });

  test("buildPresenter registers presenter with WorldPort", () => {
    // build view model first
    systemUnderTest.buildViewModel();

    systemUnderTest.buildPresenter();

    expect(systemUnderTest["presenter"]).toBeDefined();
    expect(worldPortMock.registerAdapter).toBeCalledTimes(1);
    expect(worldPortMock.registerAdapter).toBeCalledWith(
      systemUnderTest["presenter"],
      LocationScope._global,
    );
  });
});
