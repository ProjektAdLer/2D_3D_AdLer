import ILearningWorldCompletionModalPresenter from "../../../../../Core/Presentation/React/LearningSpaceMenu/LearningWorldCompletionModal/ILearningWorldCompletionModalPresenter";
import mock from "jest-mock-extended/lib/Mock";
import LearningElementModalController from "../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningElementModal/LearningElementModalController";
import IScoreLearningElementUseCase from "../../../../../Core/Application/UseCases/ScoreLearningElement/IScoreLearningElementUseCase";
import IScoreH5PLearningElementUseCase from "../../../../../Core/Application/UseCases/ScoreH5PLearningElement/IScoreH5PLearningElementUseCase";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import USECASE_TYPES from "../../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import { LearningElementTypes } from "../../../../../Core/Domain/Types/LearningElementTypes";
import LearningElementModalViewModel from "../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningElementModal/LearningElementModalViewModel";
import IBottomTooltipPresenter from "../../../../../Core/Presentation/React/LearningSpaceDisplay/BottomTooltip/IBottomTooltipPresenter";
import PRESENTATION_TYPES from "../../../../../Core/DependencyInjection/Presentation/PRESENTATION_TYPES";
import IBeginStoryElementOutroCutSceneUseCase from "../../../../../Core/Application/UseCases/BeginStoryElementOutroCutScene/IBeginStoryElementOutroCutSceneUseCase";
import SettingsTO from "../../../../../Core/Application/DataTransferObjects/SettingsTO";

const scoreElementUseCaseMock = mock<IScoreLearningElementUseCase>();
const scoreH5PUseCaseMock = mock<IScoreH5PLearningElementUseCase>();
const bottomTooltipPresenterMock = mock<IBottomTooltipPresenter>();
const beginStoryElementOutroCutSceneUseCaseMock =
  mock<IBeginStoryElementOutroCutSceneUseCase>();
const learningworldcompletionModalMock =
  mock<ILearningWorldCompletionModalPresenter>();

describe("LearningElementModalController", () => {
  let systemUnderTest: LearningElementModalController;
  let viewModel: LearningElementModalViewModel;

  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind<IScoreLearningElementUseCase>(
      USECASE_TYPES.IScoreLearningElementUseCase,
    ).toConstantValue(scoreElementUseCaseMock);
    CoreDIContainer.rebind<IScoreH5PLearningElementUseCase>(
      USECASE_TYPES.IScoreH5PLearningElementUseCase,
    ).toConstantValue(scoreH5PUseCaseMock);
    CoreDIContainer.bind<IBottomTooltipPresenter>(
      PRESENTATION_TYPES.IBottomTooltipPresenter,
    ).toConstantValue(bottomTooltipPresenterMock);
    CoreDIContainer.rebind<IBeginStoryElementOutroCutSceneUseCase>(
      USECASE_TYPES.IBeginStoryElementOutroCutSceneUseCase,
    ).toConstantValue(beginStoryElementOutroCutSceneUseCaseMock);
    CoreDIContainer.bind<ILearningWorldCompletionModalPresenter>(
      PRESENTATION_TYPES.ILearningWorldCompletionModalPresenter,
    ).toConstantValue(learningworldcompletionModalMock);
  });

  beforeEach(() => {
    viewModel = new LearningElementModalViewModel();
    systemUnderTest = new LearningElementModalController(viewModel);
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("scoreElement calls the ScoreElementUseCase", async () => {
    viewModel.type.Value = LearningElementTypes.image;
    viewModel.id.Value = 1;

    await systemUnderTest.scoreLearningElement();

    expect(scoreElementUseCaseMock.executeAsync).toHaveBeenCalledTimes(1);
    expect(scoreElementUseCaseMock.executeAsync).toHaveBeenCalledWith(1);
  });

  test("closeModal sets isOpen to false", () => {
    viewModel.isOpen.Value = true;
    systemUnderTest.closeModal();
    expect(viewModel.isOpen.Value).toBe(false);
  });

  //ANF-ID: [EWE0042]
  test("triggerCutscene calls beginStoryElementOutroCutSceneUseCase", () => {
    viewModel.id.Value = 42;
    systemUnderTest.triggerOutroCutscene();
    expect(
      beginStoryElementOutroCutSceneUseCaseMock.execute,
    ).toHaveBeenCalledWith({
      scoredLearningElementID: 42,
    });
  });

  test("should handle a XAPI call with a statement", async () => {
    viewModel.isScoreable.Value = true;
    viewModel.id.Value = 123;
    await systemUnderTest.h5pEventCalled({
      data: {
        statement: {
          verb: {
            id: "http://adlnet.gov/expapi/verbs/answered",
          },
          result: {
            success: true,
          },
        },
      },
    });

    expect(scoreH5PUseCaseMock.executeAsync).toBeCalledWith({
      xapiData: {
        verb: {
          id: "http://adlnet.gov/expapi/verbs/answered",
        },
        result: {
          success: false,
        },
      },
      elementID: 123,
    });
  });

  test("should not call useCase with invalid data", async () => {
    viewModel.isScoreable.Value = true;
    await systemUnderTest.h5pEventCalled({
      data: {},
    });

    expect(scoreH5PUseCaseMock.executeAsync).not.toHaveBeenCalled();
  });

  test("should not call usecase with invalid h5p verb", async () => {
    viewModel.isScoreable.Value = true;
    await systemUnderTest.h5pEventCalled({
      data: {
        statement: {
          verb: {},
          result: {
            success: true,
          },
        },
      },
    });

    expect(scoreH5PUseCaseMock.executeAsync).not.toHaveBeenCalled();
  });

  test("showBbottomTooltip should call the presenter", () => {
    systemUnderTest.showBottomToolTip();

    expect(bottomTooltipPresenterMock.show).toHaveBeenCalledTimes(1);
  });

  test("setModalVisibility should call learningworldcompletionmodal presenter", () => {
    systemUnderTest.setModalVisibility(true);

    expect(
      learningworldcompletionModalMock.onModalVisibility,
    ).toHaveBeenCalled();
  });

  test("should handle XAPI call without result object", async () => {
    viewModel.isScoreable.Value = true;
    viewModel.id.Value = 456;

    await systemUnderTest.h5pEventCalled({
      data: {
        statement: {
          verb: {
            id: "http://adlnet.gov/expapi/verbs/completed",
          },
          // No result object
        },
      },
    });

    expect(scoreH5PUseCaseMock.executeAsync).toBeCalledWith({
      xapiData: {
        verb: {
          id: "http://adlnet.gov/expapi/verbs/completed",
        },
        result: {
          success: false,
        },
      },
      elementID: 456,
    });
  });

  test("should handle XAPI call with result but no score", async () => {
    viewModel.isScoreable.Value = true;
    viewModel.id.Value = 789;

    await systemUnderTest.h5pEventCalled({
      data: {
        statement: {
          verb: {
            id: "http://adlnet.gov/expapi/verbs/answered",
          },
          result: {
            // No score property
          },
        },
      },
    });

    expect(scoreH5PUseCaseMock.executeAsync).toBeCalledWith({
      xapiData: {
        verb: {
          id: "http://adlnet.gov/expapi/verbs/answered",
        },
        result: {
          success: false,
        },
      },
      elementID: 789,
    });
  });

  test("should handle errors from scoreH5PUseCase gracefully", async () => {
    const consoleWarnSpy = jest.spyOn(console, "warn").mockImplementation();
    scoreH5PUseCaseMock.executeAsync.mockRejectedValueOnce(
      new Error("Backend error"),
    );

    viewModel.isScoreable.Value = true;
    viewModel.id.Value = 999;

    await systemUnderTest.h5pEventCalled({
      data: {
        statement: {
          verb: {
            id: "http://adlnet.gov/expapi/verbs/answered",
          },
          result: {
            success: true,
          },
        },
      },
    });

    expect(consoleWarnSpy).toHaveBeenCalledWith(
      "Failed to score H5P element 999:",
      expect.any(Error),
    );

    consoleWarnSpy.mockRestore();
  });

  test("should not call useCase for child events", async () => {
    viewModel.isScoreable.Value = true;
    viewModel.id.Value = 321;

    await systemUnderTest.h5pEventCalled({
      data: {
        statement: {
          verb: {
            id: "http://adlnet.gov/expapi/verbs/answered",
          },
          result: {
            success: true,
          },
          context: {
            contextActivities: {
              parent: [
                {
                  id: "http://example.com/parent",
                },
              ],
            },
          },
        },
      },
    });

    expect(scoreH5PUseCaseMock.executeAsync).not.toHaveBeenCalled();
  });
});
