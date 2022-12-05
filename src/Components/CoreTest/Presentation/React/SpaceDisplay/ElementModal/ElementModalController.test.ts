import mock from "jest-mock-extended/lib/Mock";
import ElementModalController from "../../../../../../../src/Components/Core/Presentation/React/SpaceDisplay/ElementModal/ElementModalController";
import IScoreElementUseCase from "../../../../../Core/Application/UseCases/ScoreElement/IScoreElementUseCase";
import IScoreH5PElement from "../../../../../Core/Application/UseCases/ScoreH5PElement/IScoreH5PElement";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import USECASE_TYPES from "../../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import { ElementTypes } from "../../../../../Core/Domain/Types/ElementTypes";
import ElementModalViewModel from "../../../../../Core/Presentation/React/SpaceDisplay/ElementModal/ElementModalViewModel";

const scoreElementUseCaseMock = mock<IScoreElementUseCase>();
const scoreH5PUseCaseMock = mock<IScoreH5PElement>();

describe("ElementModalController", () => {
  let systemUnderTest: ElementModalController;
  let viewModel: ElementModalViewModel;

  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind<IScoreElementUseCase>(
      USECASE_TYPES.IScoreElementUseCase
    ).toConstantValue(scoreElementUseCaseMock);
    CoreDIContainer.rebind<IScoreH5PElement>(
      USECASE_TYPES.IScoreH5PElement
    ).toConstantValue(scoreH5PUseCaseMock);
  });

  beforeEach(() => {
    viewModel = new ElementModalViewModel();
    systemUnderTest = new ElementModalController(viewModel);
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("scoreElement calls the ScoreElementUseCase", async () => {
    viewModel.type.Value = ElementTypes.image;

    await systemUnderTest.scoreElement(1, 1);

    expect(scoreElementUseCaseMock.executeAsync).toHaveBeenCalledTimes(1);
    expect(scoreElementUseCaseMock.executeAsync).toHaveBeenCalledWith({
      elementId: 1,
      courseId: 1,
    });
  });

  test("should handle a XAPI call with a statement", async () => {
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
    await systemUnderTest.h5pEventCalled({
      data: {},
    });

    expect(scoreH5PUseCaseMock.executeAsync).not.toHaveBeenCalled();
  });

  test("should not call usecase with invalid h5p verb", async () => {
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
