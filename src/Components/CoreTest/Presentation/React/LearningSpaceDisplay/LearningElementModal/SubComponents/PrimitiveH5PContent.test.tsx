import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import LearningElementModalViewModel from "../../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningElementModal/LearningElementModalViewModel";
import PrimitiveH5PContent from "../../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningElementModal/SubComponents/PrimitiveH5PContent";
import React from "react";
import CoreDIContainer from "../../../../../../Core/DependencyInjection/CoreDIContainer";

const viewModel = new LearningElementModalViewModel();
viewModel.id.Value = 1;
viewModel.parentWorldID.Value = 1;

jest.mock("h5p-standalone");

describe("PrimitiveH5PContent", () => {
  beforeAll(() => {
    CoreDIContainer.snapshot();
  });

  afterAll(() => {
    CoreDIContainer.restore();
    jest.clearAllMocks();
  });

  test("should render", () => {
    viewModel.filePath.Value =
      "wwwroot\\courses\\2\\World_For_Evaluation\\h5p\\H5P-SchiebeSpiel";

    const { container } = render(<PrimitiveH5PContent viewModel={viewModel} />);

    expect(container).not.toBeEmptyDOMElement();
  });
});
