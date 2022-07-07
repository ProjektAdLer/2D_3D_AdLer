import { injectable } from "inversify";
import LogUserIntoMoodleUseCase from "../../../Core/Application/LogUserIntoMoodle/LogUserIntoMoodleUseCase";
import CoreDIContainer from "../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../Core/DependencyInjection/CoreTypes";
import PORT_TYPES from "../../../Core/DependencyInjection/Ports/PORT_TYPES";
import UserDataEntity from "../../../Core/Domain/Entities/UserData";
import EntityContainer from "../../../Core/Domain/EntityContainer/EntityContainer";
import IMoodlePort from "../../../Core/Ports/MoodlePort/IMoodlePort";

import { mock } from "jest-mock-extended";
import IBackend from "../../../Core/Adapters/Backend/IBackend";
import IDebugPort from "../../../Core/Ports/DebugPort/IDebugPort";
import IEntityContainer from "../../../Core/Domain/EntityContainer/IEntityContainer";

const entityContainerMock = mock<IEntityContainer>();
const backendMock = mock<IBackend>();
const debugMock = mock<IDebugPort>();
const moodleMock = mock<IMoodlePort>();

describe("LogUserIntoMoodleUseCase", () => {
  let useCase: LogUserIntoMoodleUseCase;

  beforeAll(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.unbind(PORT_TYPES.IMoodlePort);
    CoreDIContainer.bind(PORT_TYPES.IMoodlePort).toConstantValue(moodleMock);

    CoreDIContainer.unbind(PORT_TYPES.IDebugPort);
    CoreDIContainer.bind(PORT_TYPES.IDebugPort).toConstantValue(debugMock);

    CoreDIContainer.unbind(CORE_TYPES.IBackend);
    CoreDIContainer.bind(CORE_TYPES.IBackend).toConstantValue(backendMock);

    CoreDIContainer.unbind(CORE_TYPES.IEntityContainer);
    CoreDIContainer.bind(CORE_TYPES.IEntityContainer).toConstantValue(
      entityContainerMock
    );
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  beforeEach(() => {
    useCase = CoreDIContainer.resolve(LogUserIntoMoodleUseCase);
  });

  test("executeAsync calls the backend and stores correct user data in Enity", async () => {
    backendMock.logInUser.mockResolvedValue("token");
    entityContainerMock.getEntitiesOfType.mockReturnValue([]);

    await useCase.executeAsync({
      username: "username",
      password: "password",
    });

    expect(backendMock.logInUser).toHaveBeenCalledWith({
      username: "username",
      password: "password",
    });

    expect(entityContainerMock.useSingletonEntity).toHaveBeenCalledWith(
      {
        userToken: "token",
        username: "username",
        isLoggedIn: true,
      },
      UserDataEntity
    );

    expect(moodleMock.loginSuccessful).toHaveBeenCalled();
  });
});
