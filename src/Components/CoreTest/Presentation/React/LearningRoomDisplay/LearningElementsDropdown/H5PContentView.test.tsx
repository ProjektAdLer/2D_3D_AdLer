import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import { mock, mockClear } from "jest-mock-extended";
import { act } from "react-dom/test-utils";
import H5PLearningElementData from "../../../../../Core/Domain/Entities/SpecificLearningElements/H5PLearningElementData";
import LearningElementModalViewModel from "../../../../../Core/Presentation/React/LearningRoomDisplay/LearningElementModal/LearningElementModalViewModel";
import NewH5PContent from "../../../../../Core/Presentation/React/LearningRoomDisplay/LearningElementModal/SubComponents/NewH5PContent";

const viewModel = mock<LearningElementModalViewModel<H5PLearningElementData>>();

viewModel.learningElementData.Value = new H5PLearningElementData();
viewModel.learningElementData.Value.fileName = "test.h5p";

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
