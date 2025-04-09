import mock from "jest-mock-extended/lib/Mock";
import ILearningWorldPort from "../../../../../../Core/Application/Ports/Interfaces/ILearningWorldPort";
import CoreDIContainer from "../../../../../../Core/DependencyInjection/CoreDIContainer";
import PORT_TYPES from "../../../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import LearningWorldScorePanelBuilder from "../../../../../../Core/Presentation/React/LearningSpaceDisplay/ProgressScorePanel/LearningWorldScorePanel/LearningWorldScorePanelBuilder";
import {
  HistoryWrapper,
  LocationScope,
} from "../../../../../../Core/Presentation/React/ReactRelated/ReactEntryPoint/HistoryWrapper";
import USECASE_TYPES from "../../../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import UserDataEntity from "../../../../../../Core/Domain/Entities/UserDataEntity";
import IEntityContainer from "../../../../../../Core/Domain/EntityContainer/IEntityContainer";
import CORE_TYPES from "../../../../../../Core/DependencyInjection/CoreTypes";
import IGetLearningWorldUseCase from "../../../../../../Core/Application/UseCases/GetLearningWorld/IGetLearningWorldUseCase";

const worldPortMock = mock<ILearningWorldPort>();
const entityContainerMock = mock<IEntityContainer>();

describe("LearningWorldScorePanelBuilder", () => {
  let systemUnderTest: LearningWorldScorePanelBuilder;

  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind(PORT_TYPES.ILearningWorldPort).toConstantValue(
      worldPortMock,
    );
    CoreDIContainer.rebind(CORE_TYPES.IEntityContainer).toConstantValue(
      entityContainerMock,
    );
  });

  beforeEach(() => {
    systemUnderTest = new LearningWorldScorePanelBuilder();

    if (CoreDIContainer.isBound(USECASE_TYPES.IGetLearningWorldUseCase)) {
      CoreDIContainer.unbind(USECASE_TYPES.IGetLearningWorldUseCase);
    }
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
    const mockUserDataEntity = new UserDataEntity();
    mockUserDataEntity.isLoggedIn = true;

    entityContainerMock.filterEntitiesOfType.mockReturnValue([
      mockUserDataEntity,
    ]);

    systemUnderTest.buildViewModel();
    systemUnderTest.buildPresenter();

    expect(systemUnderTest["presenter"]).toBeDefined();
    expect(worldPortMock.registerAdapter).toHaveBeenCalledWith(
      systemUnderTest["presenter"],
      LocationScope.spaceDisplay,
    );
  });
});
