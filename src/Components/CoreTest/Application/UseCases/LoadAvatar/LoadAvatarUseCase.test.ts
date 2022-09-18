import IAvatarPort from "../../../../Core/Application/UseCases/LoadAvatar/IAvatarPort";
import LoadAvatarUseCase from "../../../../Core/Application/UseCases/LoadAvatar/LoadAvatarUseCase";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import PORT_TYPES from "../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import PresentationDirector from "../../../../Core/Presentation/PresentationBuilder/PresentationDirector";

const buildMock = jest.spyOn(PresentationDirector.prototype, "build");

describe("LoadAvatarUseCase", () => {
  let systemUnderTest: LoadAvatarUseCase;

  beforeEach(() => {
    systemUnderTest = new LoadAvatarUseCase(
      CoreDIContainer.get<IAvatarPort>(PORT_TYPES.IAvatarPort)
    );
  });

  test("executeAsync builds the avatar via its builder", async () => {
    await systemUnderTest.executeAsync();

    expect(buildMock).toHaveBeenCalledTimes(1);
  });
});
