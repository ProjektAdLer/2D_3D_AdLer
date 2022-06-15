import IAvatarPort from "../../../Core/Application/LoadAvatar/IAvatarPort";
import LoadAvatarUseCase from "../../../Core/Application/LoadAvatar/LoadAvatarUseCase";
import CoreDIContainer from "../../../Core/DependencyInjection/CoreDIContainer";
import PORT_TYPES from "../../../Core/DependencyInjection/Ports/PORT_TYPES";
import PresentationDirector from "../../../Core/Presentation/PresentationBuilder/PresentationDirector";

const buildMock = jest.spyOn(PresentationDirector.prototype, "build");

describe("LoadAvatarUseCase", () => {
  let useCase: LoadAvatarUseCase;

  beforeEach(() => {
    useCase = new LoadAvatarUseCase(
      CoreDIContainer.get<IAvatarPort>(PORT_TYPES.IAvatarPort)
    );
  });

  test("executeAsync builds the avatar via its builder", async () => {
    const presentAvatarSpy = jest.spyOn(
      CoreDIContainer.get<IAvatarPort>(PORT_TYPES.IAvatarPort),
      "presentAvatar"
    );

    await useCase.executeAsync();

    expect(buildMock).toHaveBeenCalledTimes(1);
  });
});
