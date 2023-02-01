import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import ElementModalViewModel from "../../../../../../Core/Presentation/React/SpaceDisplay/ElementModal/ElementModalViewModel";
import H5PContent from "../../../../../../Core/Presentation/React/SpaceDisplay/ElementModal/SubComponents/H5PContent";
import React from "react";
import CoreDIContainer from "../../../../../../Core/DependencyInjection/CoreDIContainer";
import USECASE_TYPES from "../../../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import mock from "jest-mock-extended/lib/Mock";
import IGetElementSourceUseCase from "../../../../../../Core/Application/UseCases/GetElementSourceUseCase/IGetElementSourceUseCase";
import { Provider } from "inversify-react";
import IElementModalController from "../../../../../../Core/Presentation/React/SpaceDisplay/ElementModal/IElementModalController";

const viewModel = new ElementModalViewModel();
viewModel.id.Value = 1;
viewModel.parentCourseId.Value = 1;
viewModel.filePath.Value = "test";

jest.mock("h5p-standalone");

const getElementSourceUseCaseMock = mock<IGetElementSourceUseCase>();
const elementModalControllerMock = mock<IElementModalController>();

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
      USECASE_TYPES.IGetElementSourceUseCase
    ).toConstantValue(getElementSourceUseCaseMock);
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterAll(() => {
    CoreDIContainer.restore();
    jest.clearAllMocks();
  });

  test("should render", () => {
    getElementSourceUseCaseMock.executeAsync.mockResolvedValue(
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
