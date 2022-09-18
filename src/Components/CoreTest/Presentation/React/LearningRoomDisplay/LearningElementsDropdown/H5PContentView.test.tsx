import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import { mock, mockClear } from "jest-mock-extended";
import { act } from "react-dom/test-utils";
import H5PElementData from "../../../../../Core/Domain/Entities/ElementData/H5PElementData";
import ElementModalViewModel from "../../../../../Core/Presentation/React/SpaceDisplay/ElementModal/ElementModalViewModel";
import NewH5PContent from "../../../../../Core/Presentation/React/SpaceDisplay/ElementModal/SubComponents/NewH5PContent";

const viewModel = mock<ElementModalViewModel<H5PElementData>>();

viewModel.elementData.Value = new H5PElementData();
viewModel.elementData.Value.fileName = "test.h5p";

jest.mock("h5p-standalone");

global.console = {
  ...console,
  // uncomment to ignore a specific log level
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  // warn: jest.fn(),
  // error: jest.fn(),
};

beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});

afterAll(() => {
  jest.clearAllMocks();
});

describe("H5PContentView", () => {
  test("should render", () => {
    const oldError = console.error;
    console.error = jest.fn();

    const { container } = render(<NewH5PContent viewModel={viewModel} />);

    //expect(container).toBeInTheDocument();

    console.error = oldError;
  });
});
