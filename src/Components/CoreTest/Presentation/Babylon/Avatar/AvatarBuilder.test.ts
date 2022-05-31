import IAvatarPort from "../../../../Core/Application/LoadAvatar/IAvatarPort";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import PORT_TYPES from "../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import AvatarBuilder from "../../../../Core/Presentation/Babylon/Avatar/AvatarBuilder";
import AvatarPresenter from "../../../../Core/Presentation/Babylon/Avatar/AvatarPresenter";

const setViewModelMock = jest.spyOn(
  AvatarPresenter.prototype,
  "ViewModel",
  "set"
);

describe("AvatarBuilder", () => {
  let builder: AvatarBuilder;

  beforeEach(() => {
    builder = new AvatarBuilder();
  });

  test("buildPresenter builds the AvatarPresenter and sets the ViewModel with its setter", () => {
    builder.buildPresenter();

    expect(builder["presenter"]).toBeInstanceOf(AvatarPresenter);
    expect(builder["presenter"]).toBe(
      CoreDIContainer.get<IAvatarPort>(PORT_TYPES.IAvatarPort)
    );
    expect(setViewModelMock).toHaveBeenCalledTimes(1);
  });
});
