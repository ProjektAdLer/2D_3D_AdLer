import mock from "jest-mock-extended/lib/Mock";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import PORT_TYPES from "../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import ILearningElementPort from "../../../../Core/Ports/LearningElementPort/ILearningElementPort";
import LearningElementModalBuilder from "../../../../Core/Presentation/React/LearningElementModal/LearningElementModalBuilder";
import LearningElementModalViewModel from "../../../../Core/Presentation/React/LearningElementModal/LearningElementModalViewModel";
import ViewModelControllerProvider from "../../../../Core/Presentation/ViewModelProvider/ViewModelControllerProvider";

const registerTupelMock = jest.spyOn(
  ViewModelControllerProvider.prototype,
  "registerTupel"
);

const learningElementPortMock = mock<ILearningElementPort>();

describe("LearningElementModalBuilder", () => {
  let systemUnderTest: LearningElementModalBuilder;

  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind<ILearningElementPort>(
      PORT_TYPES.ILearningElementPort
    ).toConstantValue(learningElementPortMock);
  });

  beforeEach(() => {
    systemUnderTest = new LearningElementModalBuilder();
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("buildController builds the controller and registers the viewModel and controller", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildController();

    expect(systemUnderTest["viewModel"]).toBeDefined();
    expect(systemUnderTest["controller"]).toBeDefined();
    expect(registerTupelMock).toHaveBeenCalledTimes(1);
    expect(registerTupelMock).toHaveBeenCalledWith(
      systemUnderTest["viewModel"],
      systemUnderTest["controller"],
      LearningElementModalViewModel
    );
  });

  test("buildPresenter builds the presenter and registers presenter with the LearningElementPort", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildPresenter();

    expect(systemUnderTest["presenter"]).toBeDefined();
    expect(
      learningElementPortMock.registerModalPresenter
    ).toHaveBeenCalledTimes(1);
    expect(learningElementPortMock.registerModalPresenter).toHaveBeenCalledWith(
      systemUnderTest["presenter"]
    );
  });
});
