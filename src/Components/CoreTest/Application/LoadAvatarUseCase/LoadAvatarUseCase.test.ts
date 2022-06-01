import IAvatarPort from "../../../Core/Application/LoadAvatar/IAvatarPort";
import LoadAvatarUseCase from "../../../Core/Application/LoadAvatar/LoadAvatarUseCase";
import CoreDIContainer from "../../../Core/DependencyInjection/CoreDIContainer";
import PORT_TYPES from "../../../Core/DependencyInjection/Ports/PORT_TYPES";
import scenePresenter from "../../../Core/Presentation/Babylon/SceneManagement/scenePresenter";

// to prevent errors in tests for undefined scene
jest.spyOn(scenePresenter.prototype, "Scene", "get");

describe("LoadAvatarUseCase", () => {
  let useCase: LoadAvatarUseCase;

  beforeEach(() => {
    useCase = new LoadAvatarUseCase(
      CoreDIContainer.get<IAvatarPort>(PORT_TYPES.IAvatarPort)
    );
  });

  test("executeAsync calls the avatar port's presentAvatar method", async () => {
    const presentAvatarSpy = jest.spyOn(
      CoreDIContainer.get<IAvatarPort>(PORT_TYPES.IAvatarPort),
      "presentAvatar"
    );

    await useCase.executeAsync();

    expect(presentAvatarSpy).toHaveBeenCalledTimes(1);
    expect(presentAvatarSpy).toHaveBeenCalledWith({
      avatarName: "PlaceholderCharacter",
    });
  });
});
