import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import LearningElementModalViewModel from "../../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningElementModal/LearningElementModalViewModel";
import H5PContent from "../../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningElementModal/SubComponents/H5PContent";
import React from "react";
import CoreDIContainer from "../../../../../../Core/DependencyInjection/CoreDIContainer";
import USECASE_TYPES from "../../../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import mock from "jest-mock-extended/lib/Mock";
import IGetLearningElementSourceUseCase from "../../../../../../Core/Application/UseCases/GetLearningElementSource/IGetLearningElementSourceUseCase";
import { Provider } from "inversify-react";
import ILearningElementModalController from "../../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningElementModal/ILearningElementModalController";

const viewModel = new LearningElementModalViewModel();
viewModel.id.Value = 1;
viewModel.parentWorldID.Value = 1;
viewModel.filePath.Value = "test";

jest.mock("h5p-standalone");

const getElementSourceUseCaseMock = mock<IGetLearningElementSourceUseCase>();
const elementModalControllerMock = mock<ILearningElementModalController>();

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
    CoreDIContainer.rebind(
      USECASE_TYPES.IGetLearningElementSourceUseCase
    ).toConstantValue(getElementSourceUseCaseMock);
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterAll(() => {
    CoreDIContainer.restore();
    jest.clearAllMocks();
  });

  test("should render", () => {
    getElementSourceUseCaseMock.internalExecuteAsync.mockResolvedValue(
      "wwwroot\\courses\\2\\World_For_Evaluation\\h5p\\H5P-SchiebeSpiel"
    );
    const oldError = console.error;
    console.error = jest.fn();

    const { container } = render(
      <Provider container={CoreDIContainer}>
        <H5PContent
          viewModel={viewModel}
          controller={elementModalControllerMock}
        />
      </Provider>
    );

    console.error = oldError;
  });
});
