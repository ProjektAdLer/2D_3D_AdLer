import AdaptivityElementEntity from "../../../../../Core/Domain/Entities/Adaptivity/AdaptivityElementEntity";
import LoadAdaptivityElementUseCase from "../../../../../Core/Application/UseCases/Adaptivity/LoadAdaptivityElementUseCase/LoadAdaptivityElementUseCase";
import { mock } from "jest-mock-extended";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import ILearningWorldPort from "../../../../../Core/Application/Ports/Interfaces/ILearningWorldPort";
import PORT_TYPES from "../../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import ILoadAdaptivityElementUseCase from "../../../../../Core/Application/UseCases/Adaptivity/LoadAdaptivityElementUseCase/ILoadAdaptivityElementUseCase";
import USECASE_TYPES from "../../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import IEntityContainer from "../../../../../Core/Domain/EntityContainer/IEntityContainer";
import CORE_TYPES from "../../../../../Core/DependencyInjection/CoreTypes";
import IGetUserLocationUseCase from "../../../../../Core/Application/UseCases/GetUserLocation/IGetUserLocationUseCase";
import UserLocationTO from "../../../../../Core/Application/DataTransferObjects/UserLocationTO";
import LearningElementEntity from "../../../../../Core/Domain/Entities/LearningElementEntity";
import AdaptivityElementProgressTO from "../../../../../Core/Application/DataTransferObjects/AdaptivityElement/AdaptivityElementProgressTO";
import IGetAdaptivityElementStatusUseCase from "../../../../../Core/Application/UseCases/Adaptivity/GetAdaptivityElementStatusUseCase/IGetAdaptivityElementStatusUseCase";

const worldPortMock = mock<ILearningWorldPort>();
const entityContainerMock = mock<IEntityContainer>();
const getUserLocationUseCaseMock = mock<IGetUserLocationUseCase>();
const getAdaptivityElementStatusUseCaseMock =
  mock<IGetAdaptivityElementStatusUseCase>();

const learningElement = {
  id: 0,
  value: 0,
  hasScored: false,
  name: "abc",
  description: "",
  goals: [],
  type: "adaptivity",
  model: "",
  parentWorldID: 1,
} as LearningElementEntity;

describe("LoadAdaptivityElementUseCase", () => {
  let systemUnderTest: ILoadAdaptivityElementUseCase;

  beforeAll(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind(PORT_TYPES.ILearningWorldPort).toConstantValue(
      worldPortMock
    );
    CoreDIContainer.rebind(CORE_TYPES.IEntityContainer).toConstantValue(
      entityContainerMock
    );
    CoreDIContainer.rebind(
      USECASE_TYPES.IGetUserLocationUseCase
    ).toConstantValue(getUserLocationUseCaseMock);
    CoreDIContainer.rebind(
      USECASE_TYPES.IGetAdaptivityElementStatusUseCase
    ).toConstantValue(getAdaptivityElementStatusUseCaseMock);
  });

  beforeEach(() => {
    systemUnderTest = CoreDIContainer.resolve(LoadAdaptivityElementUseCase);
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("should throw, if AdpativityElement is not found", async () => {
    getUserLocationUseCaseMock.execute.mockReturnValueOnce({
      spaceID: 1,
      worldID: 1,
    } as UserLocationTO);
    entityContainerMock.filterEntitiesOfType.mockReturnValue([]);
    await expect(systemUnderTest.executeAsync(0)).rejects.toThrow(
      "Could not find element"
    );
  });

  //ANF-ID: [EZZ0013]
  test("should throw, if user is not in learningspace", async () => {
    getUserLocationUseCaseMock.execute.mockReturnValueOnce({
      spaceID: undefined,
      worldID: undefined,
    } as UserLocationTO);
    await expect(systemUnderTest.executeAsync(0)).rejects.toThrow(
      "User is not in a space!"
    );
  });

  test("should throw, if more than one AdaptivityElement is found", async () => {
    getUserLocationUseCaseMock.execute.mockReturnValueOnce({
      spaceID: 1,
      worldID: 1,
    } as UserLocationTO);
    entityContainerMock.filterEntitiesOfType.mockReturnValue([
      { id: 0 },
      { id: 1 },
    ]);
    await expect(systemUnderTest.executeAsync(0)).rejects.toThrow(
      "Found more than one element"
    );
  });

  // ANF-ID: [EWE0013]
  test("calls port onAdaptivityElementLoaded", async () => {
    getUserLocationUseCaseMock.execute.mockReturnValueOnce({
      spaceID: 1,
      worldID: 1,
    } as UserLocationTO);
    entityContainerMock.filterEntitiesOfType.mockReturnValue([
      {
        element: learningElement,
        introText: "",
        shuffleTask: false,
        tasks: [],
      } as AdaptivityElementEntity,
    ]);
    let progressTO = {
      elementName: "abc",
    } as AdaptivityElementProgressTO;

    progressTO = Object.assign(progressTO, {
      element: learningElement,
      introText: "",
      shuffleTask: false,
      tasks: [],
    } as AdaptivityElementEntity);

    getAdaptivityElementStatusUseCaseMock.internalExecuteAsync.mockResolvedValue();

    await systemUnderTest.executeAsync(0);
    expect(worldPortMock.onAdaptivityElementLoaded).toHaveBeenCalled();
  });
});
