import ReturnHomeModalBuilder from "../../../../../Core/Presentation/React/LearningWorldMenu/ReturnHomeModal/ReturnHomeModalBuilder";
import { mock } from "jest-mock-extended";
import ILearningWorldPort from "../../../../../Core/Application/Ports/Interfaces/ILearningWorldPort";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import PORT_TYPES from "../../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import {
  LocationScope,
  HistoryWrapper,
} from "../../../../../Core/Presentation/React/ReactRelated/ReactEntryPoint/HistoryWrapper";

const worldPortMock = mock<ILearningWorldPort>();

describe("ReturnHomeModalBuilder", () => {
  let systemUnderTest: ReturnHomeModalBuilder;

  beforeAll(() => {
    CoreDIContainer.rebind(PORT_TYPES.ILearningWorldPort).toConstantValue(
      worldPortMock
    );
  });

  beforeEach(() => {
    systemUnderTest = new ReturnHomeModalBuilder();
    jest
      .spyOn(HistoryWrapper, "currentLocationScope")
      .mockReturnValue(LocationScope.worldMenu);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test("constructor doesn't throw", () => {
    expect(systemUnderTest).toBeDefined();
  });

  test("buildPresenter builds the presenter and register it with the WorldPort", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildPresenter();

    expect(systemUnderTest["presenter"]).toBeDefined();
    expect(worldPortMock.registerAdapter).toHaveBeenCalledWith(
      systemUnderTest["presenter"],
      LocationScope.worldMenu
    );
  });
});
