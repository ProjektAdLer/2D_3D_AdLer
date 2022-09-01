import mock from "jest-mock-extended/lib/Mock";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import PORT_TYPES from "../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import ILearningRoomPort from "../../../../Core/Ports/LearningRoomPort/ILearningRoomPort";
import ScorePanelBuilder from "../../../../Core/Presentation/React/ScorePanel/ScorePanelBuilder";
import ScorePanelViewModel from "../../../../Core/Presentation/React/ScorePanel/ScorePanelViewModel";
import ViewModelControllerProvider from "../../../../Core/Presentation/ViewModelProvider/ViewModelControllerProvider";

const registerViewModelOnlyMock = jest.spyOn(
  ViewModelControllerProvider.prototype,
  "registerViewModelOnly"
);

const learningRoomPortMock = mock<ILearningRoomPort>();

describe("ScorePanelBuilder", () => {
  let systemUnderTest: ScorePanelBuilder;

  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind(PORT_TYPES.ILearningRoomPort).toConstantValue(
      learningRoomPortMock
    );
  });

  beforeEach(() => {
    systemUnderTest = new ScorePanelBuilder();
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("buildViewModel builds the viewModel, and registers it with the VMCProvider", () => {
    systemUnderTest.buildViewModel();

    expect(systemUnderTest["viewModel"]).toBeDefined();
    expect(registerViewModelOnlyMock).toHaveBeenCalledTimes(1);
    expect(registerViewModelOnlyMock).toHaveBeenCalledWith(
      systemUnderTest["viewModel"],
      ScorePanelViewModel
    );
  });

  test("buildPresenter builds the presenter, and registers it with the LearningRoomPort", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildPresenter();

    expect(systemUnderTest["presenter"]).toBeDefined();
    expect(
      learningRoomPortMock.registerScorePanelPresenter
    ).toHaveBeenCalledTimes(1);
    expect(
      learningRoomPortMock.registerScorePanelPresenter
    ).toHaveBeenCalledWith(systemUnderTest["presenter"]);
  });
});
