import UpdateAvatarConfigUseCase from "../../../../../../src/Components/Core/Application/UseCases/UpdateAvatarConfig/UpdateAvatarConfigUseCase";
import CoreDIContainer from "../../../../../../src/Components/Core/DependencyInjection/CoreDIContainer";
import AvatarConfigTO from "../../../../Core/Application/DataTransferObjects/AvatarConfigTO";
import ILoggerPort from "../../../../Core/Application/Ports/Interfaces/ILoggerPort";
import CORE_TYPES from "../../../../Core/DependencyInjection/CoreTypes";
import { OAvatarHairModels } from "../../../../Core/Domain/AvatarModels/AvatarModelTypes";
import AvatarEntity from "../../../../Core/Domain/Entities/AvatarEntity";
import IEntityContainer from "../../../../Core/Domain/EntityContainer/IEntityContainer";
import { mock } from "jest-mock-extended";
import { LogLevelTypes } from "../../../../Core/Domain/Types/LogLevelTypes";
import IAvatarPort from "../../../../Core/Application/Ports/Interfaces/IAvatarPort";
import PORT_TYPES from "../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import IBackendPort from "../../../../Core/Application/Ports/Interfaces/IBackendPort";

const entityContainerMock = mock<IEntityContainer>();
const loggerMock = mock<ILoggerPort>();
const avatarPortMock = mock<IAvatarPort>();
const backendAdapterMock = mock<IBackendPort>();

describe("UpdateAvatarConfigUseCase", () => {
  let systemUnderTest: UpdateAvatarConfigUseCase;

  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind(CORE_TYPES.IEntityContainer).toConstantValue(
      entityContainerMock,
    );
    CoreDIContainer.rebind(CORE_TYPES.ILogger).toConstantValue(loggerMock);
    CoreDIContainer.rebind(PORT_TYPES.IAvatarPort).toConstantValue(
      avatarPortMock,
    );
    CoreDIContainer.rebind(CORE_TYPES.IBackendAdapter).toConstantValue(
      backendAdapterMock,
    );
  });

  beforeEach(() => {
    systemUnderTest = CoreDIContainer.resolve(UpdateAvatarConfigUseCase);

    jest.resetAllMocks();
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("logs error if no user data entity found", async () => {
    entityContainerMock.getEntitiesOfType.mockReturnValue([]);

    await systemUnderTest.executeAsync({});

    expect(loggerMock.log).toHaveBeenCalledWith(
      LogLevelTypes.ERROR,
      "No user data entity found",
    );
  });

  test("logs error if multiple user data entities found", async () => {
    entityContainerMock.getEntitiesOfType.mockReturnValue([{}, {}]);

    await systemUnderTest.executeAsync({});

    expect(loggerMock.log).toHaveBeenCalledWith(
      LogLevelTypes.ERROR,
      "Multiple user data entities found",
    );
  });

  test("calls loadAvatarConfigUseCase if avatar config not loaded", async () => {
    const userDataEntity = {};

    entityContainerMock.getEntitiesOfType.mockReturnValue([userDataEntity]);

    await systemUnderTest.executeAsync({});

    expect(avatarPortMock.onAvatarConfigLoaded).toHaveBeenCalledTimes(1);
  });

  test("updates avatar config in user data entity", async () => {
    const avatarConfig: Partial<AvatarConfigTO> = {
      roundness: 0.5,
    };
    const userDataEntity = {
      avatar: {
        roundness: 0,
        hair: OAvatarHairModels.MediumPonytail,
      } as AvatarEntity,
    };

    entityContainerMock.getEntitiesOfType.mockReturnValue([userDataEntity]);

    await systemUnderTest.executeAsync(avatarConfig);

    expect(userDataEntity.avatar.roundness).toEqual(0.5);
    expect(userDataEntity.avatar.hair).toEqual(
      OAvatarHairModels.MediumPonytail,
    );
  });

  test("calls onAvatarConfigChanged on avatar port", async () => {
    const avatarConfig: Partial<AvatarConfigTO> = {
      roundness: 0.5,
    };
    const userDataEntity = {
      avatar: {
        roundness: 0,
        hair: OAvatarHairModels.MediumPonytail,
      } as AvatarEntity,
    };

    entityContainerMock.getEntitiesOfType.mockReturnValue([userDataEntity]);

    await systemUnderTest.executeAsync(avatarConfig);

    expect(avatarPortMock.onAvatarConfigChanged).toHaveBeenCalledWith(
      userDataEntity.avatar,
      avatarConfig,
    );
  });

  test("doesn't call onAvatarConfigChanged when change is already present in current config", async () => {
    const avatarConfig: Partial<AvatarConfigTO> = {
      roundness: 0.5,
    };
    const userDataEntity = {
      avatar: {
        roundness: 0.5,
        hair: OAvatarHairModels.MediumPonytail,
      } as AvatarEntity,
    };

    entityContainerMock.getEntitiesOfType.mockReturnValue([userDataEntity]);

    await systemUnderTest.executeAsync(avatarConfig);

    expect(avatarPortMock.onAvatarConfigChanged).not.toHaveBeenCalled();
  });

  test("diff and new avatar config passed to onAvatarConfigChanged do match", async () => {
    const avatarConfig: Partial<AvatarConfigTO> = {
      roundness: 0.5,
    };
    const userDataEntity = {};

    entityContainerMock.getEntitiesOfType.mockReturnValue([userDataEntity]);

    await systemUnderTest.executeAsync(avatarConfig);

    expect(
      avatarPortMock.onAvatarConfigChanged.mock.lastCall![0],
    ).toMatchObject(avatarPortMock.onAvatarConfigChanged.mock.lastCall![1]);
  });
});
