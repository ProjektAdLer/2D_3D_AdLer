import MoodlePort from "../../../../Core/Ports/MoodlePort/MoodlePort";
import MoodleLoginFormBuilder from "../../../../Core/Presentation/React/MoodleLoginForm/MoodleLoginFormBuilder";
import MoodleLoginFormController from "../../../../Core/Presentation/React/MoodleLoginForm/MoodleLoginFormController";
import MoodleLoginFormPresenter from "../../../../Core/Presentation/React/MoodleLoginForm/MoodleLoginFormPresenter";
import MoodleLoginFormViewModel from "../../../../Core/Presentation/React/MoodleLoginForm/MoodleLoginFormViewModel";
import ViewModelControllerProvider from "../../../../Core/Presentation/ViewModelProvider/ViewModelControllerProvider";

const registerTupelMock = jest.spyOn(
  ViewModelControllerProvider.prototype,
  "registerTupel"
);
const registerMoodleLoginPresenterMock = jest.spyOn(
  MoodlePort.prototype,
  "registerMoodleLoginPresenter"
);

describe("MoodleLoginFormBuilder", () => {
  let systemUnderTest: MoodleLoginFormBuilder;

  beforeEach(() => {
    systemUnderTest = new MoodleLoginFormBuilder();
  });

  test("buildController builds the controller and registers it and the viewModel with the VMCProvider", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildController();

    expect(systemUnderTest["controller"]).toBeDefined();
    expect(systemUnderTest["controller"]).toBeInstanceOf(
      MoodleLoginFormController
    );
    expect(registerTupelMock).toHaveBeenCalledTimes(1);
    expect(registerTupelMock).toHaveBeenCalledWith(
      systemUnderTest["viewModel"],
      systemUnderTest["controller"],
      MoodleLoginFormViewModel
    );
  });

  test("buildPresenter build the presenter and register it with the MoodlePort", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildPresenter();

    expect(systemUnderTest["presenter"]).toBeDefined();
    expect(systemUnderTest["presenter"]).toBeInstanceOf(
      MoodleLoginFormPresenter
    );
    expect(registerMoodleLoginPresenterMock).toHaveBeenCalledTimes(1);
    expect(registerMoodleLoginPresenterMock).toHaveBeenCalledWith(
      systemUnderTest["presenter"]
    );
  });
});
