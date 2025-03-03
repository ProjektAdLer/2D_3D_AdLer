import mock from "jest-mock-extended/lib/Mock";
import ILearningWorldPort from "../../../../../Core/Application/Ports/Interfaces/ILearningWorldPort";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import PORT_TYPES from "../../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import LearningWorldScorePanelBuilder from "../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningWorldScorePanel/LearningWorldScorePanelBuilder";
import {
  HistoryWrapper,
  LocationScope,
} from "../../../../../Core/Presentation/React/ReactRelated/ReactEntryPoint/HistoryWrapper";
import USECASE_TYPES from "../../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import UserDataEntity from "../../../../../Core/Domain/Entities/UserDataEntity";
import IEntityContainer from "../../../../../Core/Domain/EntityContainer/IEntityContainer";
import CORE_TYPES from "../../../../../Core/DependencyInjection/CoreTypes";
import IGetLearningWorldUseCase from "../../../../../Core/Application/UseCases/GetLearningWorld/IGetLearningWorldUseCase";

const worldPortMock = mock<ILearningWorldPort>();

describe("LearningWorldScorePanelBuilder", () => {
  let systemUnderTest: LearningWorldScorePanelBuilder;

  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind(PORT_TYPES.ILearningWorldPort).toConstantValue(
      worldPortMock,
    );
  });

  beforeEach(() => {
    systemUnderTest = new LearningWorldScorePanelBuilder();

    // Vorherige Bindings für IGetLearningWorldUseCase unbinden
    if (CoreDIContainer.isBound(USECASE_TYPES.IGetLearningWorldUseCase)) {
      CoreDIContainer.unbind(USECASE_TYPES.IGetLearningWorldUseCase);
    }

    // UserDataEntity hinzufügen
    const mockUserDataEntity = new UserDataEntity();
    mockUserDataEntity.isLoggedIn = true;
    const entityContainer = CoreDIContainer.get<IEntityContainer>(
      CORE_TYPES.IEntityContainer,
    );
    entityContainer.createEntity(mockUserDataEntity, UserDataEntity);

    // IGetLearningWorldUseCase mocken
    CoreDIContainer.bind<IGetLearningWorldUseCase>(
      USECASE_TYPES.IGetLearningWorldUseCase,
    ).toConstantValue({ execute: jest.fn() });

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
