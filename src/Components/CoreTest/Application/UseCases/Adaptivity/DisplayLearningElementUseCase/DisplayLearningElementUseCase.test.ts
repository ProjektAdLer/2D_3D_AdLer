import { async } from "q";
import DisplayLearningElementUseCase from "../../../../../Core/Application/UseCases/Adaptivity/DisplayLearningElementUseCase/DisplayLearningElementUseCase";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import mock from "jest-mock-extended/lib/Mock";
import CORE_TYPES from "../../../../../Core/DependencyInjection/CoreTypes";
import IEntityContainer from "../../../../../Core/Domain/EntityContainer/IEntityContainer";
import LearningSpaceEntity from "../../../../../Core/Domain/Entities/LearningSpaceEntity";
import LearningElementEntity from "../../../../../Core/Domain/Entities/LearningElementEntity";
import IGetUserLocationUseCase from "../../../../../Core/Application/UseCases/GetUserLocation/IGetUserLocationUseCase";
import USECASE_TYPES from "../../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import UserLocationTO from "../../../../../Core/Application/DataTransferObjects/UserLocationTO";
import ILearningWorldPort from "../../../../../Core/Application/Ports/Interfaces/ILearningWorldPort";
import PORT_TYPES from "../../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import AdaptivityElementHintTO from "../../../../../Core/Application/DataTransferObjects/AdaptivityElement/AdaptivityElementHintTO";
import { AdaptivityElementActionTypes } from "../../../../../Core/Domain/Types/Adaptivity/AdaptivityElementActionTypes";
import ICalculateLearningSpaceAvailabilityUseCase from "../../../../../Core/Application/UseCases/CalculateLearningSpaceAvailability/ICalculateLearningSpaceAvailabilityUseCase";
import LearningSpaceAvailabilityTO from "../../../../../Core/Application/DataTransferObjects/LearningSpaceAvailabilityTO";
import ILoadLearningElementUseCase from "../../../../../Core/Application/UseCases/LoadLearningElement/ILoadLearningElementUseCase";

const entityContainer = mock<IEntityContainer>();
const getUserLocationUseCaseMock = mock<IGetUserLocationUseCase>();
const wordlPortMock = mock<ILearningWorldPort>();
const calculateLearingSpaceAvailabilityUseCaseMock =
  mock<ICalculateLearningSpaceAvailabilityUseCase>();
const loadLearningElementUseCaseMock = mock<ILoadLearningElementUseCase>();

describe("DisplayLearningElementUseCase", () => {
  let systemUnderTest: DisplayLearningElementUseCase;

  beforeAll(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind(CORE_TYPES.IEntityContainer).toConstantValue(
      entityContainer
    );

    CoreDIContainer.rebind(
      USECASE_TYPES.IGetUserLocationUseCase
    ).toConstantValue(getUserLocationUseCaseMock);

    CoreDIContainer.rebind(PORT_TYPES.ILearningWorldPort).toConstantValue(
      wordlPortMock
    );

    CoreDIContainer.rebind(
      USECASE_TYPES.ICalculateLearningSpaceAvailabilityUseCase
    ).toConstantValue(calculateLearingSpaceAvailabilityUseCaseMock);

    CoreDIContainer.rebind(
      USECASE_TYPES.ILoadLearningElementUseCase
    ).toConstantValue(loadLearningElementUseCaseMock);
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  beforeEach(() => {
    systemUnderTest = CoreDIContainer.resolve(DisplayLearningElementUseCase);
  });

  test("should throw, if no space space is found", async () => {
    entityContainer.getEntitiesOfType.mockReturnValue([]);

    await expect(systemUnderTest.executeAsync(1)).rejects.toThrow(
      `Could not find space in which external learning element is.`
    );
  });

  test("should throw, if no element is found", async () => {
    entityContainer.getEntitiesOfType.mockReturnValue([
      { id: 0, elements: [{ id: 1 }] } as LearningSpaceEntity,
    ]);
    entityContainer.filterEntitiesOfType.mockReturnValue([]);

    await expect(systemUnderTest.executeAsync(1)).rejects.toThrow(
      "Could not find external element."
    );
  });

  test("should throw, if user is not in space", async () => {
    entityContainer.getEntitiesOfType.mockReturnValue([
      { id: 0, elements: [{ id: 1 }] } as LearningSpaceEntity,
    ]);

    entityContainer.filterEntitiesOfType.mockReturnValue([
      { id: 3 } as LearningElementEntity,
    ]);

    getUserLocationUseCaseMock.execute.mockReturnValue({
      worldID: undefined,
      spaceID: undefined,
    } as UserLocationTO);

    await expect(systemUnderTest.executeAsync(1)).rejects.toThrow(
      `User not in a space!`
    );

    getUserLocationUseCaseMock.execute.mockReturnValue({
      worldID: 1,
      spaceID: undefined,
    } as UserLocationTO);

    await expect(systemUnderTest.executeAsync(1)).rejects.toThrow(
      `User not in a space!`
    );
  });

  test("learning element in same space calls onAdaptivityElementUserHintInformed", async () => {
    entityContainer.getEntitiesOfType.mockReturnValue([
      { id: 1, elements: [{ id: 1 }] } as LearningSpaceEntity,
    ]);

    entityContainer.filterEntitiesOfType.mockReturnValue([
      { id: 1, name: "test" } as LearningElementEntity,
    ]);

    getUserLocationUseCaseMock.execute.mockReturnValue({
      worldID: 1,
      spaceID: 1,
    } as UserLocationTO);

    await systemUnderTest.executeAsync(1);

    expect(
      wordlPortMock.onAdaptivityElementUserHintInformed
    ).toHaveBeenCalled();
    expect(
      wordlPortMock.onAdaptivityElementUserHintInformed
    ).toHaveBeenCalledWith({
      hintID: -1,
      showOnIsWrong: true,
      hintAction: {
        hintActionType: AdaptivityElementActionTypes.CommentAction,
        textData:
          "Der Hinweis für diese Frage befindet sich hier in diesem Raum. Schau dir `test` nochmal an.",
      },
    } as AdaptivityElementHintTO);
  });

  test("available learning element in other space calls loaddLearningElementUseCase", async () => {
    entityContainer.getEntitiesOfType.mockReturnValue([
      { id: 1, elements: [{ id: 1 }] } as LearningSpaceEntity,
    ]);

    entityContainer.filterEntitiesOfType.mockReturnValue([
      { id: 1, name: "test" } as LearningElementEntity,
    ]);

    getUserLocationUseCaseMock.execute.mockReturnValue({
      worldID: 1,
      spaceID: 2,
    } as UserLocationTO);

    calculateLearingSpaceAvailabilityUseCaseMock.internalExecute.mockReturnValue(
      {
        isAvailable: true,
      } as LearningSpaceAvailabilityTO
    );

    await systemUnderTest.executeAsync(1);

    expect(
      wordlPortMock.onAdaptivityElementUserHintInformed
    ).not.toHaveBeenCalled();

    expect(loadLearningElementUseCaseMock.executeAsync).toHaveBeenCalled();
  });

  test("not available learning element in other space calls onAdaptivityElementUserHintInformed", async () => {
    entityContainer.getEntitiesOfType.mockReturnValue([
      { id: 1, elements: [{ id: 1 }] } as LearningSpaceEntity,
    ]);

    entityContainer.filterEntitiesOfType.mockReturnValue([
      { id: 1, name: "test" } as LearningElementEntity,
    ]);

    getUserLocationUseCaseMock.execute.mockReturnValue({
      worldID: 1,
      spaceID: 2,
    } as UserLocationTO);

    calculateLearingSpaceAvailabilityUseCaseMock.internalExecute.mockReturnValue(
      {
        isAvailable: false,
      } as LearningSpaceAvailabilityTO
    );

    await systemUnderTest.executeAsync(1);

    expect(
      wordlPortMock.onAdaptivityElementUserHintInformed
    ).toHaveBeenCalled();
  });
});