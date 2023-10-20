import mock from "jest-mock-extended/lib/Mock";
import LearningElementModalController from "../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningElementModal/LearningElementModalController";
import IScoreLearningElementUseCase from "../../../../../Core/Application/UseCases/ScoreLearningElement/IScoreLearningElementUseCase";
import IScoreH5PLearningElementUseCase from "../../../../../Core/Application/UseCases/ScoreH5PLearningElement/IScoreH5PLearningElementUseCase";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import USECASE_TYPES from "../../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import { LearningElementTypes } from "../../../../../Core/Domain/Types/LearningElementTypes";
import LearningElementModalViewModel from "../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningElementModal/LearningElementModalViewModel";

const scoreElementUseCaseMock = mock<IScoreLearningElementUseCase>();
const scoreH5PUseCaseMock = mock<IScoreH5PLearningElementUseCase>();

describe("LearningElementModalController", () => {
  let systemUnderTest: LearningElementModalController;
  let viewModel: LearningElementModalViewModel;

  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind<IScoreLearningElementUseCase>(
      USECASE_TYPES.IScoreLearningElementUseCase
    ).toConstantValue(scoreElementUseCaseMock);
    CoreDIContainer.rebind<IScoreH5PLearningElementUseCase>(
      USECASE_TYPES.IScoreH5PLearningElementUseCase
    ).toConstantValue(scoreH5PUseCaseMock);
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
});
