import IAvatarPort from "../../../../Core/Application/Ports/Interfaces/IAvatarPort";
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
  let systemUnderTest: AvatarBuilder;

  beforeEach(() => {
    systemUnderTest = new AvatarBuilder();
  });

  test("buildPresenter builds the AvatarPresenter and sets the ViewModel with its setter", () => {
    systemUnderTest.buildPresenter();

    expect(systemUnderTest["presenter"]).toBeInstanceOf(AvatarPresenter);
    expect(systemUnderTest["presenter"]).toBe(
      CoreDIContainer.get<IAvatarPort>(PORT_TYPES.IAvatarPort)
    );
    expect(setViewModelMock).toHaveBeenCalledTimes(1);
  });
});
