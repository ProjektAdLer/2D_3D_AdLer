import MoodleButtonPresenter from "../../../../../Core/Presentation/React/WelcomePage/MoodleButton/MoodleButtonPresenter";
import MoodleButtonViewModel from "../../../../../Core/Presentation/React/WelcomePage/MoodleButton/MoodleButtonViewModel";

describe("MoodleButtonPresenter", () => {
  let systemUnderTest: MoodleButtonPresenter;
  let vm: MoodleButtonViewModel;

  beforeEach(() => {
    vm = new MoodleButtonViewModel();
    systemUnderTest = new MoodleButtonPresenter(vm);
  });
});
