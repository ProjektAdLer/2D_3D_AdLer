import { mock } from "jest-mock-extended";
import ILearningWorldPort from "../../../../Core/Application/Ports/Interfaces/ILearningWorldPort";
import GetLearningWorldUseCase from "../../../../Core/Application/UseCases/GetLearningWorld/GetLearningWorldUseCase";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../../Core/DependencyInjection/CoreTypes";
import IEntityContainer from "../../../../Core/Domain/EntityContainer/IEntityContainer";
import PORT_TYPES from "../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import IGetUserLocationUseCase from "../../../../Core/Application/UseCases/GetUserLocation/IGetUserLocationUseCase";
import USECASE_TYPES from "../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import LearningWorldEntity from "../../../../Core/Domain/Entities/LearningWorldEntity";

const worldPortMock = mock<ILearningWorldPort>();
const entityContainerMock = mock<IEntityContainer>();
const getUserLocationUseCaseMock = mock<IGetUserLocationUseCase>();

describe("GetLearningWorldUseCase", () => {
  let systemUnderTest: GetLearningWorldUseCase;

  beforeAll(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind(CORE_TYPES.IEntityContainer).toConstantValue(
      entityContainerMock,
    );
    CoreDIContainer.rebind(PORT_TYPES.ILearningWorldPort).toConstantValue(
      worldPortMock,
    );
    CoreDIContainer.rebind(
      USECASE_TYPES.IGetUserLocationUseCase,
    ).toConstantValue(getUserLocationUseCaseMock);
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("should call port with loaded world entity", () => {
    const worldEntity = {
      id: 1,
      completionModalShown: false,
      spaces: [
        {
          id: 1,
          currentScore: 1,
          requiredScore: 1,
        },
        {
          id: 2,
          currentScore: 2,
          requiredScore: 1,
        },
      ],
    };
    entityContainerMock.filterEntitiesOfType.mockReturnValue([worldEntity]);
    getUserLocationUseCaseMock.execute.mockReturnValue({ worldID: 1 } as any);

    systemUnderTest = CoreDIContainer.get(
      USECASE_TYPES.IGetLearningWorldUseCase,
    );
    systemUnderTest.execute();

    expect(worldPortMock.onLearningWorldEntityLoaded).toHaveBeenCalledTimes(1);
    expect(worldPortMock.onLearningWorldEntityLoaded).toHaveBeenCalledWith({
      id: 1,
      completionModalShown: false,
      spaces: [
        {
          id: 1,
          currentScore: 1,
          requiredScore: 1,
        },
        {
          id: 2,
          currentScore: 2,
          requiredScore: 1,
        },
      ],
    });
  });

  test("filterEntitiesOfType callback for learning world entity filtering should return true when element exists", async () => {
    getUserLocationUseCaseMock.execute.mockReturnValue({ worldID: 42 } as any);

    const learningWorldEntityMock = {
      id: 42,
    } as LearningWorldEntity;

    let filterResult;

    entityContainerMock.filterEntitiesOfType.mockImplementationOnce(
      (mock, callback) => {
        filterResult = callback(learningWorldEntityMock);
        return [learningWorldEntityMock];
      },
    );

    systemUnderTest = CoreDIContainer.get(
      USECASE_TYPES.IGetLearningWorldUseCase,
    );
    systemUnderTest.execute();

    expect(filterResult).toBe(true);
  });
});
