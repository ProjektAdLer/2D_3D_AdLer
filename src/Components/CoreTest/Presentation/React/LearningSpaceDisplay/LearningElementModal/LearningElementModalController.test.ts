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

  test("getUserSettings should return settings with cookieConsent", () => {
    const result = systemUnderTest.getUserSettings();

    expect(result).toBeDefined();
    expect(result).toHaveProperty("cookieConsent");
  });

  test("setUserSettings should accept settings with cookieConsent accepted", () => {
    const settings = new SettingsTO();
    settings.cookieConsent = "accepted";

    expect(() => {
      systemUnderTest.setUserSettings(settings);
    }).not.toThrow();
  });

  test("setUserSettings should accept settings with cookieConsent declined", () => {
    const settings = new SettingsTO();
    settings.cookieConsent = "declined";

    expect(() => {
      systemUnderTest.setUserSettings(settings);
    }).not.toThrow();
  });

  test("getUserSettings returns current cookieConsent state", () => {
    const settings = new SettingsTO();
    settings.cookieConsent = "accepted";

    systemUnderTest.setUserSettings(settings);
    const result = systemUnderTest.getUserSettings();

    expect(result.cookieConsent).toBeDefined();
  });
});
