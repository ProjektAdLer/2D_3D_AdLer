import { BackendAvatarConfigTO } from "./../../../../Core/Application/DataTransferObjects/BackendAvatarConfigTO";
import mock from "jest-mock-extended/lib/Mock";
import Logger from "../../../../Core/Adapters/Logger/Logger";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../../Core/DependencyInjection/CoreTypes";
import LoadAvatarConfigUseCase from "../../../../Core/Application/UseCases/LoadAvatarConfig/LoadAvatarConfigUseCase";
import IAvatarPort from "../../../../Core/Application/Ports/Interfaces/IAvatarPort";
import IEntityContainer from "../../../../Core/Domain/EntityContainer/IEntityContainer";
import PORT_TYPES from "../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import { LogLevelTypes } from "../../../../Core/Domain/Types/LogLevelTypes";
import AvatarEntity from "../../../../Core/Domain/Entities/AvatarEntity";
import BackendAdapter from "../../../../Core/Adapters/BackendAdapter/BackendAdapter";
import UserDataEntity from "../../../../Core/Domain/Entities/UserDataEntity";

const loggerMock = mock<Logger>();
const avatarPortMock = mock<IAvatarPort>();
const entityContainerMock = mock<IEntityContainer>();
const backendAdapterMock = mock<BackendAdapter>();

describe("LoadAvatarUseCase", () => {
  let systemUnderTest: LoadAvatarConfigUseCase;
  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind<Logger>(CORE_TYPES.ILogger).toConstantValue(
      loggerMock,
    );
    CoreDIContainer.rebind<IAvatarPort>(PORT_TYPES.IAvatarPort).toConstantValue(
      avatarPortMock,
    );
    CoreDIContainer.rebind<IEntityContainer>(
      CORE_TYPES.IEntityContainer,
    ).toConstantValue(entityContainerMock);
    CoreDIContainer.rebind<BackendAdapter>(
      CORE_TYPES.IBackendAdapter,
    ).toConstantValue(backendAdapterMock);
  });

  beforeEach(() => {
    systemUnderTest = CoreDIContainer.resolve(LoadAvatarConfigUseCase);
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

  test("calls onAvatarConfigLoaded with avatar config from user data", async () => {
    const avatarConfig = new AvatarEntity();
    avatarConfig.roundness = 0.5;
    const userDataEntity = { avatar: avatarConfig };
    entityContainerMock.getEntitiesOfType.mockReturnValue([userDataEntity]);

    await systemUnderTest.executeAsync();

    expect(avatarPortMock.onAvatarConfigLoaded).toHaveBeenCalledWith(
      avatarConfig,
    );
  });

  test("calls getAvatarConfig if no avatar data exists", async () => {
    let avatarEntityMock = {
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
    const userDataEntity = { avatar: undefined } as unknown as UserDataEntity;
    entityContainerMock.getEntitiesOfType.mockReturnValue([userDataEntity]);
    backendAdapterMock.getAvatarConfig.mockResolvedValue(
      {} as BackendAvatarConfigTO,
    );

    await systemUnderTest.executeAsync();

    expect(backendAdapterMock.getAvatarConfig).toHaveBeenCalled();
  });
});
