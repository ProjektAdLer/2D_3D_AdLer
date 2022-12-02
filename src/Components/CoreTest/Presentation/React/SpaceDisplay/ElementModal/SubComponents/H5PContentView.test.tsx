import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import ElementModalViewModel from "../../../../../../Core/Presentation/React/SpaceDisplay/ElementModal/ElementModalViewModel";
import H5PContent, {
  h5pEventCalled,
} from "../../../../../../Core/Presentation/React/SpaceDisplay/ElementModal/SubComponents/H5PContent";
import React from "react";
import CoreDIContainer from "../../../../../../Core/DependencyInjection/CoreDIContainer";
import USECASE_TYPES from "../../../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import mock from "jest-mock-extended/lib/Mock";
import IGetElementSourceUseCase from "../../../../../../Core/Application/UseCases/GetElementSourceUseCase/IGetElementSourceUseCase";
import { Provider } from "inversify-react";
import IScoreH5PElement from "../../../../../../Core/Application/UseCases/ScoreH5PElement/IScoreH5PElement";
import GetElementSourceUseCase from "../../../../../../Core/Application/UseCases/GetElementSourceUseCase/GetElementSourceUseCase";

const viewModel = new ElementModalViewModel();
viewModel.id.Value = 1;
viewModel.parentCourseId.Value = 1;
viewModel.filePath.Value = "test";

jest.mock("h5p-standalone");

const sourceUseCaseMock = mock<IGetElementSourceUseCase>();
const scoreH5PUseCaseMock = mock<IScoreH5PElement>();
const getElementSourceUseCaseMock = mock<GetElementSourceUseCase>();

global.console = {
  ...console,
  // uncomment to ignore a specific log level
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  // warn: jest.fn(),
  // error: jest.fn(),
};

describe("H5PContentView", () => {
  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.unbindAll();
    CoreDIContainer.bind(USECASE_TYPES.IGetElementSource).toConstantValue(
      sourceUseCaseMock
    );
    CoreDIContainer.bind(USECASE_TYPES.IScoreH5PElement).toConstantValue(
      scoreH5PUseCaseMock
    );
    CoreDIContainer.rebind(USECASE_TYPES.IGetElementSource).toConstantValue(
      getElementSourceUseCaseMock
    );
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterAll(() => {
    CoreDIContainer.restore();
    jest.clearAllMocks();
  });

  test("should render", () => {
    sourceUseCaseMock.executeAsync.mockResolvedValue(
      "wwwroot\\courses\\2\\World_For_Evaluation\\h5p\\H5P-SchiebeSpiel"
    );
    const oldError = console.error;
    console.error = jest.fn();

    const { container } = render(
      <Provider container={CoreDIContainer}>
        <H5PContent viewModel={viewModel} />
      </Provider>
    );

    console.error = oldError;
  });

  test("should handle a xapi call with a statement", () => {
    h5pEventCalled(
      {
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
      },
      viewModel
    );

    expect(scoreH5PUseCaseMock.executeAsync).toBeCalledWith({
      xapiData: {
        verb: {
          id: "http://adlnet.gov/expapi/verbs/answered",
        },
        result: {
          success: false,
        },
      },
      elementId: 1,
      courseId: 1,
    });
  });

  test("should not call useCase with invalid data", () => {
    h5pEventCalled(
      {
        data: {},
      },
      viewModel
    );

    expect(scoreH5PUseCaseMock.executeAsync).not.toHaveBeenCalled();
  });

  test("should not call usecase with invalid h5p verb", () => {
    h5pEventCalled(
      {
        data: {
          statement: {
            verb: {},
            result: {
              success: true,
            },
          },
        },
      },
      viewModel
    );

    expect(scoreH5PUseCaseMock.executeAsync).not.toHaveBeenCalled();
  });
});
