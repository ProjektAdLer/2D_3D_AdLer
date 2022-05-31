import AvatarPresenter from "../../../../Core/Presentation/Babylon/Avatar/AvatarPresenter";
import AvatarViewModel from "../../../../Core/Presentation/Babylon/Avatar/AvatarViewModel";
import PresentationDirector from "../../../../Core/Presentation/PresentationBuilder/PresentationDirector";

const buildMock = jest.spyOn(PresentationDirector.prototype, "build");

describe("AvatarPresenter", () => {
  let presenter: AvatarPresenter;

  beforeEach(() => {
    presenter = new AvatarPresenter();
  });

  test("ViewModel setter sets the private viewModel member", () => {
    const viewModel = new AvatarViewModel();
    presenter.ViewModel = viewModel;
    expect(presenter["viewModel"]).toBe(viewModel);
  });

  test("presentAvatar uses the PresentationDirector to build the rest of the VCVMP construct", () => {
    const avatarTO = {
      avatarName: "test",
    };
    presenter.presentAvatar(avatarTO);
    expect(buildMock).toHaveBeenCalledTimes(1);
  });

  test("presentAvatar does not call the PresentationDirector if a viewModel was already defined", () => {
    const avatarTO = {
      avatarName: "test",
    };
    presenter.ViewModel = new AvatarViewModel();
    presenter.presentAvatar(avatarTO);
    expect(buildMock).not.toHaveBeenCalled();
  });
});
