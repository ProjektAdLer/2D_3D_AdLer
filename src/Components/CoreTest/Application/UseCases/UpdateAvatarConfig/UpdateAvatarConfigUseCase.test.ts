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
import ILoadAvatarConfigUseCase from "../../../../Core/Application/UseCases/LoadAvatarConfig/ILoadAvatarConfigUseCase";
import USECASE_TYPES from "../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";

const entityContainerMock = mock<IEntityContainer>();
const loggerMock = mock<ILoggerPort>();
const avatarPortMock = mock<IAvatarPort>();
const backendAdapterMock = mock<IBackendPort>();
const loadAvatarConfigUseCaseMock = mock<ILoadAvatarConfigUseCase>();

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
    CoreDIContainer.rebind(
      USECASE_TYPES.ILoadAvatarConfigUseCase,
    ).toConstantValue(loadAvatarConfigUseCaseMock);
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

    expect(loadAvatarConfigUseCaseMock.executeAsync).toHaveBeenCalledTimes(1);
  });

  test("updates avatar config in user data entity", async () => {
    const avatarConfig: Partial<AvatarConfigTO> = {
      roundness: 0.5,
    };
    const userDataEntity = {
      avatar: {
        roundness: 0,
        hair: OAvatarHairModels.HairMediumPonytail,
      } as AvatarEntity,
    };

    entityContainerMock.getEntitiesOfType.mockReturnValue([userDataEntity]);

    await systemUnderTest.executeAsync(avatarConfig);

    expect(userDataEntity.avatar.roundness).toEqual(0.5);
    expect(userDataEntity.avatar.hair).toEqual(
      OAvatarHairModels.HairMediumPonytail,
    );
  });

  test("calls onAvatarConfigChanged on avatar port", async () => {
    const avatarConfig: Partial<AvatarConfigTO> = {
      roundness: 0.5,
    };
    const userDataEntity = {
      avatar: {
        roundness: 0,
        hair: OAvatarHairModels.HairMediumPonytail,
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
        hair: OAvatarHairModels.HairMediumPonytail,
      } as AvatarEntity,
    };

    entityContainerMock.getEntitiesOfType.mockReturnValue([userDataEntity]);

    await systemUnderTest.executeAsync(avatarConfig);

    expect(avatarPortMock.onAvatarConfigChanged).not.toHaveBeenCalled();
  });
});
