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
  let moodleLoginFormBuilder: MoodleLoginFormBuilder;

  beforeEach(() => {
    moodleLoginFormBuilder = new MoodleLoginFormBuilder();
  });

  test("buildController builds the controller and registers it and the viewModel with the VMCProvider", () => {
    moodleLoginFormBuilder.buildViewModel();
    moodleLoginFormBuilder.buildController();

    expect(moodleLoginFormBuilder["controller"]).toBeDefined();
    expect(moodleLoginFormBuilder["controller"]).toBeInstanceOf(
      MoodleLoginFormController
    );
    expect(registerTupelMock).toHaveBeenCalledTimes(1);
    expect(registerTupelMock).toHaveBeenCalledWith(
      moodleLoginFormBuilder["viewModel"],
      moodleLoginFormBuilder["controller"],
      MoodleLoginFormViewModel
    );
  });

  test("buildPresenter build the presenter and register it with the MoodlePort", () => {
    moodleLoginFormBuilder.buildViewModel();
    moodleLoginFormBuilder.buildPresenter();

    expect(moodleLoginFormBuilder["presenter"]).toBeDefined();
    expect(moodleLoginFormBuilder["presenter"]).toBeInstanceOf(
      MoodleLoginFormPresenter
    );
    expect(registerMoodleLoginPresenterMock).toHaveBeenCalledTimes(1);
    expect(registerMoodleLoginPresenterMock).toHaveBeenCalledWith(
      moodleLoginFormBuilder["presenter"]
    );
  });
});
