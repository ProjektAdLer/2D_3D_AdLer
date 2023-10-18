import { AdaptivityElementStatusTypes } from "./../../../../../Core/Domain/Types/Adaptivity/AdaptivityElementStatusTypes";
import IGetAdaptivityElementStatusUseCase from "../../../../../Core/Application/UseCases/Adaptivity/GetAdaptivityElementStatusUseCase/IGetAdaptivityElementStatusUseCase";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import GetAdaptivityElementStatusUseCase from "../../../../../Core/Application/UseCases/Adaptivity/GetAdaptivityElementStatusUseCase/GetAdaptivityElementStatusUseCase";
import AdaptivityElementProgressTO from "../../../../../Core/Application/DataTransferObjects/AdaptivityElement/AdaptivityElementProgressTO";
import { mock } from "jest-mock-extended";
import IEntityContainer from "../../../../../Core/Domain/EntityContainer/IEntityContainer";
import CORE_TYPES from "../../../../../Core/DependencyInjection/CoreTypes";
import { AdaptivityElementQuestionDifficultyTypes } from "../../../../../Core/Domain/Types/Adaptivity/AdaptivityElementQuestionDifficultyTypes";
import { AdaptivityElementQuestionTypes } from "../../../../../Core/Domain/Types/Adaptivity/AdaptivityElementQuestionTypes";
import AdaptivityElementTaskProgressTO from "../../../../../Core/Application/DataTransferObjects/AdaptivityElement/AdaptivityElementTaskProgressTO";
import UserDataEntity from "../../../../../Core/Domain/Entities/UserDataEntity";
import IGetUserLocationUseCase from "../../../../../Core/Application/UseCases/GetUserLocation/IGetUserLocationUseCase";
import USECASE_TYPES from "../../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import UserLocationTO from "../../../../../Core/Application/DataTransferObjects/UserLocationTO";
import IBackendPort from "../../../../../Core/Application/Ports/Interfaces/IBackendPort";
import AdaptivtyElementStatusResponse from "../../../../../Core/Adapters/BackendAdapter/Types/AdaptivityElementStatusResponse";

const entityContainerMock = mock<IEntityContainer>();
const getUserLocationUseCaseMock = mock<IGetUserLocationUseCase>();
const backendAdapterMock = mock<IBackendPort>();

const progressTO = {
  id: 0,
  elementName: "abc",
  shuffleTask: false,
  introText: "",
  tasks: [
    {
      isCompleted: null,
      taskId: 0,
      taskTitle: "",
      taskOptional: false,
      requiredDifficulty: AdaptivityElementQuestionDifficultyTypes.easy,
      questions: [
        {
          isCompleted: null,
          questionType: AdaptivityElementQuestionTypes.multipleResponse,
          questionId: 0,
          questionDifficulty: AdaptivityElementQuestionDifficultyTypes.easy,
          questionText: "",
          questionAnswers: [],
          triggers: [],
        },
        {
          isCompleted: null,
          questionType: AdaptivityElementQuestionTypes.multipleResponse,
          questionId: 1,
          questionDifficulty: AdaptivityElementQuestionDifficultyTypes.medium,
          questionText: "",
          questionAnswers: [],
          triggers: [],
        },
        {
          isCompleted: null,
          questionType: AdaptivityElementQuestionTypes.multipleResponse,
          questionId: 2,
          questionDifficulty: AdaptivityElementQuestionDifficultyTypes.hard,
          questionText: "",
          questionAnswers: [],
          triggers: [],
        },
      ],
    },
  ] as AdaptivityElementTaskProgressTO[],
  isCompleted: false,
} as AdaptivityElementProgressTO;

const backendResponseMock = {
  element: {
    elementID: 0,
    success: false,
  },
  questions: [
    {
      id: 0,
      status: AdaptivityElementStatusTypes.Correct,
    },
    {
      id: 1,
      status: AdaptivityElementStatusTypes.Incorrect,
    },
    {
      id: 2,
      status: AdaptivityElementStatusTypes.NotAttempted,
    },
  ],
  tasks: [
    {
      taskId: 0,
      taskStatus: AdaptivityElementStatusTypes.Incorrect,
    },
  ],
} as AdaptivtyElementStatusResponse;

describe("GetAdaptivityElementStatusUseCase", () => {
  let systemUnderTest: IGetAdaptivityElementStatusUseCase;

  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind(CORE_TYPES.IEntityContainer).toConstantValue(
      entityContainerMock
    );
    CoreDIContainer.rebind(
      USECASE_TYPES.IGetUserLocationUseCase
    ).toConstantValue(getUserLocationUseCaseMock);
    CoreDIContainer.rebind(CORE_TYPES.IBackendAdapter).toConstantValue(
      backendAdapterMock
    );
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  beforeEach(() => {
    systemUnderTest = CoreDIContainer.resolve(
      GetAdaptivityElementStatusUseCase
    );
  });

  test("throws error when worldID is not set", async () => {
    entityContainerMock.getEntitiesOfType.mockReturnValue([
      {} as UserDataEntity,
    ]);
    getUserLocationUseCaseMock.execute.mockReturnValue({
      worldID: undefined,
      spaceID: 1,
    });

    const result = systemUnderTest.internalExecuteAsync(progressTO);
    await expect(result).rejects.toThrowError();
  });

  test("throws error when spaceID is not set", async () => {
    entityContainerMock.getEntitiesOfType.mockReturnValue([
      {} as UserDataEntity,
    ]);
    getUserLocationUseCaseMock.execute.mockReturnValue({
      worldID: 1,
      spaceID: undefined,
    });

    const result = systemUnderTest.internalExecuteAsync(progressTO);
    await expect(result).rejects.toThrowError();
  });

  test("should get adaptivity status", async () => {
    entityContainerMock.getEntitiesOfType.mockReturnValue([
      { userToken: "", username: "", isLoggedIn: true },
    ] as UserDataEntity[]);

    getUserLocationUseCaseMock.execute.mockReturnValue({
      worldID: 1,
      spaceID: 1,
    } as UserLocationTO);

    backendAdapterMock.getAdaptivityElementStatusResponse.mockResolvedValue(
      backendResponseMock
    );

    const result = structuredClone(progressTO);
    result.tasks[0].isCompleted = false;
    result.tasks[0].questions[0].isCompleted = true;
    result.tasks[0].questions[1].isCompleted = false;
    result.tasks[0].questions[2].isCompleted = null;

    await systemUnderTest.internalExecuteAsync(progressTO);

    expect(progressTO).toEqual(result);
  });
});
