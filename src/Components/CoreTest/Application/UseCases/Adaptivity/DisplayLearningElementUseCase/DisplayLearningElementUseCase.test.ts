import DisplayLearningElementUseCase from "../../../../../Core/Application/UseCases/Adaptivity/DisplayAdaptivityHintLearningElement/DisplayAdaptivityHintLearningElementUseCase";
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
import { LearningElementModelTypeEnums } from "../../../../../Core/Domain/LearningElementModels/LearningElementModelTypes";

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

  //ANF-ID: [EZZ0013]
  test("should throw, if user is not in space", async () => {
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

    getUserLocationUseCaseMock.execute.mockReturnValue({
      worldID: undefined,
      spaceID: 1,
    } as UserLocationTO);

    await expect(systemUnderTest.executeAsync(1)).rejects.toThrow(
      `User not in a space!`
    );
  });

  test("should throw, if no space space is found", async () => {
    getUserLocationUseCaseMock.execute.mockReturnValue({
      worldID: 1,
      spaceID: 1,
    } as UserLocationTO);

    entityContainer.filterEntitiesOfType.mockReturnValue([]);

    await expect(systemUnderTest.executeAsync(1)).rejects.toThrow(
      `Could not find space for currently active learning world.`
    );
  });

  test("should throw, if no element is found", async () => {
    getUserLocationUseCaseMock.execute.mockReturnValue({
      worldID: 1,
      spaceID: 1,
    } as UserLocationTO);

    entityContainer.filterEntitiesOfType.mockReturnValueOnce([
      { id: 0, elements: [{ id: 1 }] } as LearningSpaceEntity,
    ]);

    entityContainer.filterEntitiesOfType.mockReturnValueOnce([]);

    await expect(systemUnderTest.executeAsync(1)).rejects.toThrow(
      "Could not find referenced learning element."
    );
  });

  test("should throw, if no space has referenced element", async () => {
    getUserLocationUseCaseMock.execute.mockReturnValue({
      worldID: 1,
      spaceID: 1,
    } as UserLocationTO);

    entityContainer.filterEntitiesOfType.mockReturnValueOnce([
      { id: 0, elements: undefined },
    ]);

    entityContainer.filterEntitiesOfType.mockReturnValueOnce([
      { id: 0, elements: [{ id: 1 }] } as LearningSpaceEntity,
    ]);

    await expect(systemUnderTest.executeAsync(1)).rejects.toThrow(
      "No space contains referenced learning element"
    );
  });

  test("filterEntitiesOfType callback for learning space entity filtering should return true when element is in the same world", async () => {
    getUserLocationUseCaseMock.execute.mockReturnValue({
      worldID: 1,
      spaceID: 1,
    } as UserLocationTO);

    const learningSpaceEntityMock = {
      parentWorldID: 1,
    } as LearningSpaceEntity;

    let filterResult;
    entityContainer.filterEntitiesOfType.mockImplementationOnce(
      (mock, callback) => {
        filterResult = callback(learningSpaceEntityMock);
        return [learningSpaceEntityMock];
      }
    );

    entityContainer.filterEntitiesOfType.mockReturnValueOnce([]);

    try {
      await systemUnderTest.executeAsync(2);
    } catch (e) {}
    expect(filterResult).toBe(true);
  });

  test("filterEntitiesOfType callback for learning element entity filtering should return true when element exists and is in the same world", async () => {
    getUserLocationUseCaseMock.execute.mockReturnValue({
      worldID: 1,
      spaceID: 1,
    } as UserLocationTO);

    const learningElementEntityMock = {
      id: 42,
      parentWorldID: 1,
    } as LearningElementEntity;

    let filterResult;
    entityContainer.filterEntitiesOfType.mockReturnValueOnce([
      { id: 0, elements: [{ id: 42 }] } as LearningSpaceEntity,
    ]);

    entityContainer.filterEntitiesOfType.mockImplementationOnce(
      (mock, callback) => {
        filterResult = callback(learningElementEntityMock);
        return [learningElementEntityMock];
      }
    );
    calculateLearingSpaceAvailabilityUseCaseMock.internalExecute.mockReturnValue(
      { isAvailable: true } as LearningSpaceAvailabilityTO
    );
    await systemUnderTest.executeAsync(42);
    expect(filterResult).toBe(true);
  });

  test("learning element in same space calls loadLearningElementUseCase", async () => {
    getUserLocationUseCaseMock.execute.mockReturnValue({
      worldID: 1,
      spaceID: 2,
    } as UserLocationTO);

    entityContainer.filterEntitiesOfType.mockReturnValueOnce([
      {
        id: 2,
        elements: [
          { id: 42 } as LearningElementEntity,
        ] as LearningElementEntity[],
      } as LearningSpaceEntity,
    ]);

    entityContainer.filterEntitiesOfType.mockReturnValueOnce([
      { id: 42, name: "test" } as LearningElementEntity,
    ]);

    await systemUnderTest.executeAsync(42);

    expect(
      wordlPortMock.onAdaptivityElementUserHintInformed
    ).not.toHaveBeenCalled();

    expect(loadLearningElementUseCaseMock.executeAsync).toHaveBeenCalledWith({
      elementID: 42,
      isScoreable: true,
    });
  });

  // ANF-ID: [EWE0006]
  test("available learning element in other space calls loadLearningElementUseCase", async () => {
    getUserLocationUseCaseMock.execute.mockReturnValue({
      worldID: 1,
      spaceID: 2,
    } as UserLocationTO);

    entityContainer.filterEntitiesOfType.mockReturnValueOnce([
      {
        id: 10,
        elements: [
          { id: 42 } as LearningElementEntity,
        ] as LearningElementEntity[],
      } as LearningSpaceEntity,
    ]);

    entityContainer.filterEntitiesOfType.mockReturnValueOnce([
      { id: 42, name: "test" } as LearningElementEntity,
    ]);

    calculateLearingSpaceAvailabilityUseCaseMock.internalExecute.mockReturnValue(
      {
        isAvailable: true,
      } as LearningSpaceAvailabilityTO
    );

    await systemUnderTest.executeAsync(42);

    expect(
      wordlPortMock.onAdaptivityElementUserHintInformed
    ).not.toHaveBeenCalled();

    expect(
      calculateLearingSpaceAvailabilityUseCaseMock.internalExecute
    ).toHaveBeenCalled();

    expect(loadLearningElementUseCaseMock.executeAsync).toHaveBeenCalledWith({
      elementID: 42,
      isScoreable: false,
    });
  });

  // ANF-ID: [EWE0007]
  test("not available learning element in other space calls onAdaptivityElementUserHintInformed", async () => {
    getUserLocationUseCaseMock.execute.mockReturnValue({
      worldID: 1,
      spaceID: 2,
    } as UserLocationTO);

    entityContainer.filterEntitiesOfType.mockReturnValueOnce([
      { id: 1, elements: [{ id: 1 }], name: "Testraum" } as LearningSpaceEntity,
    ]);

    entityContainer.filterEntitiesOfType.mockReturnValueOnce([
      { id: 1, name: "TestLernelement" } as LearningElementEntity,
    ]);

    calculateLearingSpaceAvailabilityUseCaseMock.internalExecute.mockReturnValue(
      {
        isAvailable: false,
      } as LearningSpaceAvailabilityTO
    );

    await systemUnderTest.executeAsync(1);

    expect(
      wordlPortMock.onAdaptivityElementUserHintInformed
    ).toHaveBeenCalledWith({
      hintID: -1,
      showOnIsWrong: true,
      hintAction: {
        hintActionType: AdaptivityElementActionTypes.CommentAction,
        textData:
          "Der Hinweis für diese Frage ist das Lernelement `TestLernelement` im Lernraum `Testraum`",
      },
    });
  });
});
