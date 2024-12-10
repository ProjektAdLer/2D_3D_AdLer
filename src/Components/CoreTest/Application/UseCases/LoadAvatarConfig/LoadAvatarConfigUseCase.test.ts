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

const loggerMock = mock<Logger>();
const avatarPortMock = mock<IAvatarPort>();
const entityContainerMock = mock<IEntityContainer>();

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
});
