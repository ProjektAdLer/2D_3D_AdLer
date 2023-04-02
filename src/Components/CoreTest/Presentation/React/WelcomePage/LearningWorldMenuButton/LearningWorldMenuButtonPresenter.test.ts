import LearningWorldMenuButtonPresenter from "../../../../../Core/Presentation/React/WelcomePage/LearningWorldMenuButton/LearningWorldMenuButtonPresenter";
import ILearningWorldMenuButtonPresenter from "../../../../../Core/Presentation/React/WelcomePage/LearningWorldMenuButton/ILearningWorldMenuButtonPresenter";
import LearningWorldMenuButtonViewModel from "../../../../../Core/Presentation/React/WelcomePage/LearningWorldMenuButton/LearningWorldMenuButtonViewModel";

describe("LearningWorldMenuButtonPresenter", () => {
  let systemUnderTest: ILearningWorldMenuButtonPresenter;
  let vm: LearningWorldMenuButtonViewModel;

  beforeEach(() => {
    vm = new LearningWorldMenuButtonViewModel();
    systemUnderTest = new LearningWorldMenuButtonPresenter(vm);
  });

  test("should set login successfull in VM", () => {
    systemUnderTest.onLoginSuccessful();
    expect(vm.userLoggedIn.Value).toBe(true);
  });
});
