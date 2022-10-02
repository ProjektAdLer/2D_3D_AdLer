import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { mock } from "jest-mock-extended";
import ElementModalViewModel from "../../../../../Core/Presentation/React/SpaceDisplay/ElementModal/ElementModalViewModel";
import NewH5PContent from "../../../../../Core/Presentation/React/SpaceDisplay/ElementModal/SubComponents/NewH5PContent";

const viewModel = new ElementModalViewModel();
viewModel.id.Value = 1;

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
