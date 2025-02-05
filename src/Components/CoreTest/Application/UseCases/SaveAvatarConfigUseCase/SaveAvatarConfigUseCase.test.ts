import IEntityContainer from "../../../../Core/Domain/EntityContainer/IEntityContainer";
import SaveAvatarConfigUseCase from "../../../../Core/Application/UseCases/SaveAvatarConfig/SaveAvatarConfigUseCase";
import { mock } from "jest-mock-extended";
import ILoggerPort from "../../../../Core/Application/Ports/Interfaces/ILoggerPort";
import BackendAdapter from "../../../../Core/Adapters/BackendAdapter/BackendAdapter";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../../Core/DependencyInjection/CoreTypes";
import { LogLevelTypes } from "../../../../Core/Domain/Types/LogLevelTypes";
import BackendAdapterUtils from "../../../../Core/Adapters/BackendAdapter/BackendAdapterUtils";
import UserDataEntity from "../../../../Core/Domain/Entities/UserDataEntity";
import AvatarEntity from "../../../../Core/Domain/Entities/AvatarEntity";

const entityContainerMock = mock<IEntityContainer>();
const loggerMock = mock<ILoggerPort>();
const backendAdapterMock = mock<BackendAdapter>();

jest.spyOn(BackendAdapterUtils, "convertAvatarConfigToBackendAvatarConfig");

describe("SaveAvatarConfigUseCase", () => {
  let systemUnderTest: SaveAvatarConfigUseCase;
  let avatarEntityMock: AvatarEntity;

  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind(CORE_TYPES.IEntityContainer).toConstantValue(
      entityContainerMock,
    );
    CoreDIContainer.rebind(CORE_TYPES.ILogger).toConstantValue(loggerMock);
    CoreDIContainer.rebind(CORE_TYPES.IBackendAdapter).toConstantValue(
      backendAdapterMock,
    );
  });
  beforeEach(() => {
    systemUnderTest = CoreDIContainer.resolve(SaveAvatarConfigUseCase);
    avatarEntityMock = {
      eyebrows: 0,
      eyes: 1,
      nose: 2,
      mouth: 3,
      hair: "none",
      beard: "none",
      hairColor: { id: 4, nameKey: "black", hexColor: "x" },
      headgear: "none",
      glasses: "none",
      backpack: "none",
      other: "none",
      shirt: "shirts-dress",
      shirtColor: { id: 4, nameKey: "black", hexColor: "x" },
      pants: "pants-cargo",
      pantsColor: { id: 4, nameKey: "black", hexColor: "x" },
      shoes: "shoes-boots",
      shoesColor: { id: 4, nameKey: "black", hexColor: "x" },
      skinColor: { id: 4, nameKey: "black", hexColor: "x" },
      roundness: 30,
    } as AvatarEntity;
    jest.restoreAllMocks();
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("logs error if no user data entity found", async () => {
    entityContainerMock.getEntitiesOfType.mockReturnValue([]);

    await systemUnderTest.executeAsync();

    expect(loggerMock.log).toHaveBeenCalledWith(
      LogLevelTypes.ERROR,
      "No user data entity found",
    );
  });

  test("logs error if multiple user data entities found", async () => {
    entityContainerMock.getEntitiesOfType.mockReturnValue([{}, {}]);

    await systemUnderTest.executeAsync();

    expect(loggerMock.log).toHaveBeenCalledWith(
      LogLevelTypes.ERROR,
      "Multiple user data entities found",
    );
  });

  test("doesn't call backend if no avatar data exists", async () => {
    entityContainerMock.getEntitiesOfType.mockReturnValue([{}]);

    await systemUnderTest.executeAsync();

    expect(backendAdapterMock.updateAvatarConfig).not.toHaveBeenCalled();
  });

  test("calls backend if avatar data exists", async () => {
    entityContainerMock.getEntitiesOfType.mockReturnValue([
      {
        userToken: "",
        username: "",
        isLoggedIn: true,
        availableWorlds: [],
        currentWorldID: 0,
        currentSpaceID: 0,
        lastVisitedWorldID: 0,
        avatar: avatarEntityMock,
      } as UserDataEntity,
    ]);

    await systemUnderTest.executeAsync();
    expect(backendAdapterMock.updateAvatarConfig).toHaveBeenCalled();
  });

  test("successfully calling backend calls logger", async () => {
    const userDataEntityMock = {
      userToken: "",
      username: "",
      isLoggedIn: true,
      availableWorlds: [],
      currentWorldID: 0,
      currentSpaceID: 0,
      lastVisitedWorldID: 0,
      avatar: avatarEntityMock,
    } as UserDataEntity;

    backendAdapterMock.updateAvatarConfig.mockResolvedValue(true);
    entityContainerMock.getEntitiesOfType.mockReturnValue([userDataEntityMock]);

    await systemUnderTest.executeAsync();
    expect(loggerMock.log).toHaveBeenCalledWith(
      LogLevelTypes.TRACE,
      `SaveAvatarConfigUseCase: Avatar config saved. ${JSON.stringify(avatarEntityMock)}`,
    );
  });
});
