import { mock } from "jest-mock-extended";
import ILearningWorldPort from "../../../../../Core/Application/Ports/Interfaces/ILearningWorldPort";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import PORT_TYPES from "../../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import LearningSpaceDetailBuilder from "../../../../../Core/Presentation/React/LearningSpaceMenu/LearningSpaceDetail/LearningSpaceDetailBuilder";
import {
  History,
  LocationScope,
} from "../../../../../Core/Presentation/React/ReactRelated/ReactEntryPoint/History";

const worldPortMock = mock<ILearningWorldPort>();

describe("LearningSpaceDetailBuilder", () => {
  let systemUnderTest: LearningSpaceDetailBuilder;

  beforeAll(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind(PORT_TYPES.ILearningWorldPort).toConstantValue(
      worldPortMock
    );
  });

  beforeEach(() => {
    systemUnderTest = new LearningSpaceDetailBuilder();
    jest
      .spyOn(History, "currentLocationScope")
      .mockReturnValue(LocationScope.spaceMenu);
  });

  afterAll(() => {
    CoreDIContainer.restore();
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
      LocationScope.spaceMenu
    );
  });
});
