import LMSButtonPresenter from "../../../../../Core/Presentation/React/WelcomePage/LMSButton/LMSButtonPresenter";
import LMSButtonViewModel from "../../../../../Core/Presentation/React/WelcomePage/LMSButton/LMSButtonViewModel";

describe("LMSButtonPresenter", () => {
  let systemUnderTest: LMSButtonPresenter;
  let vm: LMSButtonViewModel;

  beforeEach(() => {
    vm = new LMSButtonViewModel();
    systemUnderTest = new LMSButtonPresenter(vm);
  });
});
