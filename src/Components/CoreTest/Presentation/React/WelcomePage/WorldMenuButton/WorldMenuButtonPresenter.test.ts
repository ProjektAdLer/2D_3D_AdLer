import WorldMenuButtonPresenter from "../../../../../Core/Presentation/React/WelcomePage/WorldMenuButton/WorldMenuButtonPresenter";
import IWorldMenuButtonPresenter from "../../../../../Core/Presentation/React/WelcomePage/WorldMenuButton/IWorldMenuButtonPresenter";
import WorldMenuButtonViewModel from "../../../../../Core/Presentation/React/WelcomePage/WorldMenuButton/WorldMenuButtonViewModel";

describe("WorldMenuButtonPresenter", () => {
  let systemUnderTest: IWorldMenuButtonPresenter;
  let vm: WorldMenuButtonViewModel;

  beforeEach(() => {
    vm = new WorldMenuButtonViewModel();
    systemUnderTest = new WorldMenuButtonPresenter(vm);
  });

  test("should set login successfull in VM", () => {
    systemUnderTest.onLoginSuccessful();
    expect(vm.userLoggedIn.Value).toBe(true);
  });
});
