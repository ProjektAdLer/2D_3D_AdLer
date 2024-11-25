import UpdateAvatarConfigUseCase from "../../../../../../src/Components/Core/Application/UseCases/UpdateAvatarConfig/UpdateAvatarConfigUseCase";
import CoreDIContainer from "../../../../../../src/Components/Core/DependencyInjection/CoreDIContainer";
import AvatarConfigTO from "../../../../Core/Application/DataTransferObjects/AvatarConfigTO";
import ILoggerPort from "../../../../Core/Application/Ports/Interfaces/ILoggerPort";
import CORE_TYPES from "../../../../Core/DependencyInjection/CoreTypes";
import { AvatarHairModels } from "../../../../Core/Domain/AvatarModels/AvatarModelTypes";
import AvatarEntity from "../../../../Core/Domain/Entities/AvatarEntity";
import IEntityContainer from "../../../../Core/Domain/EntityContainer/IEntityContainer";
import { mock } from "jest-mock-extended";
import { LogLevelTypes } from "../../../../Core/Domain/Types/LogLevelTypes";
import IAvatarPort from "../../../../Core/Application/Ports/Interfaces/IAvatarPort";
import PORT_TYPES from "../../../../Core/DependencyInjection/Ports/PORT_TYPES";

const entityContainerMock = mock<IEntityContainer>();
const loggerMock = mock<ILoggerPort>();
const avatarPortMock = mock<IAvatarPort>();

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
  });

  beforeEach(() => {
    systemUnderTest = CoreDIContainer.resolve(UpdateAvatarConfigUseCase);
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("logs error if no user data entity found", () => {
    entityContainerMock.getEntitiesOfType.mockReturnValue([]);

    systemUnderTest.execute({});

    expect(loggerMock.log).toHaveBeenCalledWith(
      LogLevelTypes.ERROR,
      "No user data entity found",
    );
  });

  test("logs error if multiple user data entities found", () => {
    entityContainerMock.getEntitiesOfType.mockReturnValue([{}, {}]);

    systemUnderTest.execute({});

    expect(loggerMock.log).toHaveBeenCalledWith(
      LogLevelTypes.ERROR,
      "Multiple user data entities found",
    );
  });

  test("updates avatar config in user data entity", () => {
    const avatarConfig: Partial<AvatarConfigTO> = {
      roundness: 0.5,
    };
    const userDataEntity = {
      avatar: {
        roundness: 0,
        hair: AvatarHairModels.PLACEHOLDER,
      } as AvatarEntity,
    };

    entityContainerMock.getEntitiesOfType.mockReturnValue([userDataEntity]);

    systemUnderTest.execute(avatarConfig);

    expect(userDataEntity.avatar.roundness).toEqual(0.5);
    expect(userDataEntity.avatar.hair).toEqual(AvatarHairModels.PLACEHOLDER);
  });

  test("calls onAvatarConfigChanged on avatar port", () => {
    const avatarConfig: Partial<AvatarConfigTO> = {
      roundness: 0.5,
    };
    const userDataEntity = {
      avatar: {
        roundness: 0,
        hair: AvatarHairModels.PLACEHOLDER,
      } as AvatarEntity,
    };

    entityContainerMock.getEntitiesOfType.mockReturnValue([userDataEntity]);

    systemUnderTest.execute(avatarConfig);

    expect(avatarPortMock.onAvatarConfigChanged).toHaveBeenCalledWith(
      userDataEntity.avatar,
    );
  });
});
