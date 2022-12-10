import MoodleLoginFormPresenter from "../../../../../../../src/Components/Core/Presentation/React/GeneralComponents/MoodleLoginForm/MoodleLoginFormPresenter";
import IMoodleLoginFormPresenter from "../../../../../../../src/Components/Core/Presentation/React/GeneralComponents/MoodleLoginForm/IMoodleLoginFormPresenter";
import MoodleLoginFormViewModel from "../../../../../../../src/Components/Core/Presentation/React/GeneralComponents/MoodleLoginForm/MoodleLoginFormViewModel";

describe("MoodleLoginFormPresenter", () => {
  let systemUnderTest: IMoodleLoginFormPresenter;
  let vm: MoodleLoginFormViewModel;

  beforeEach(() => {
    vm = new MoodleLoginFormViewModel();
    systemUnderTest = new MoodleLoginFormPresenter(vm);
  });

  test("should set visible to fale, if login is successfull", () => {
    systemUnderTest.setLoginSuccessful();
    expect(vm.visible.Value).toBe(false);
  });

  test("should set visible to true, if login should be displayed", () => {
    systemUnderTest.displayLoginForm();
    expect(vm.visible.Value).toBe(true);
  });
});
