import { AdaptivityElementActionTypes } from "./../../../../../Core/Domain/Types/Adaptivity/AdaptivityElementActionTypes";
import { AdaptivityElementTriggerConditionTypes } from "./../../../../../Core/Domain/Types/Adaptivity/AdaptivityElementTriggerConditionTypes";
import { AdaptivityElementTriggerTypes } from "./../../../../../Core/Domain/Types/Adaptivity/AdaptivityElementTriggerTypes";
import IGetAdaptivityElementStatusUseCase from "../../../../../Core/Application/UseCases/Adaptivity/GetAdaptivityElementStatusUseCase/IGetAdaptivityElementStatusUseCase";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import GetAdaptivityElementStatusUseCase from "../../../../../Core/Application/UseCases/Adaptivity/GetAdaptivityElementStatusUseCase/GetAdaptivityElementStatusUseCase";
import AdaptivityElementProgressTO from "../../../../../Core/Application/DataTransferObjects/AdaptivityElement/AdaptivityElementProgressTO";
import { mock } from "jest-mock-extended";
import IEntityContainer from "../../../../../Core/Domain/EntityContainer/IEntityContainer";
import CORE_TYPES from "../../../../../Core/DependencyInjection/CoreTypes";
import { AdaptivityElementQuestionDifficultyTypes } from "../../../../../Core/Domain/Types/Adaptivity/AdaptivityElementQuestionDifficultyTypes";
import { AdaptivityElementQuestionTypes } from "../../../../../Core/Domain/Types/Adaptivity/AdaptivityElementQuestionTypes";
import AdaptivityElementAnswersTO from "../../../../../Core/Application/DataTransferObjects/AdaptivityElement/AdaptivityElementAnswerTO";
import AdaptivityElementTriggerTO from "../../../../../Core/Application/DataTransferObjects/AdaptivityElement/AdaptivityElementTriggerTO";
import AdaptivityElementActionTO from "../../../../../Core/Application/DataTransferObjects/AdaptivityElement/AdaptivityElementActionTO";
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

  test("should get adaptivity status", async () => {
    let progressTO = {
      id: 0,
      elementName: "abc",
      shuffleTask: false,
      introText: "",
      tasks: [] as AdaptivityElementTaskProgressTO[],
      isCompleted: false,
    } as AdaptivityElementProgressTO;

    entityContainerMock.getEntitiesOfType.mockReturnValue([
      { userToken: "", username: "", isLoggedIn: true },
    ] as UserDataEntity[]);

    getUserLocationUseCaseMock.execute.mockReturnValue({
      worldID: 1,
      spaceID: 1,
    } as UserLocationTO);

    backendAdapterMock.getAdaptivityElementStatusResponse.mockResolvedValue({
      element: { elementID: 0, success: false },
    } as AdaptivtyElementStatusResponse);

    const result = await systemUnderTest.internalExecuteAsync(progressTO);
    expect(result).toEqual(progressTO);
  });
});
