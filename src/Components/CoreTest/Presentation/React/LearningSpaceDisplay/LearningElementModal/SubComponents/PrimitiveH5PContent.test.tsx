import "@testing-library/jest-dom";
import { render, waitFor } from "@testing-library/react";
import LearningElementModalViewModel from "../../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningElementModal/LearningElementModalViewModel";
import PrimitiveH5PContent from "../../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningElementModal/SubComponents/PrimitiveH5PContent";
import React, { RefObject } from "react";
import CoreDIContainer from "../../../../../../Core/DependencyInjection/CoreDIContainer";
import { Provider } from "inversify-react";
import * as H5PUtils from "../../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningElementModal/SubComponents/H5pUtils";

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

  //ANF-ID: [ELG0030, EWE0037]
  test("should render", () => {
    viewModel.filePath.Value =
      "wwwroot\\courses\\2\\World_For_Evaluation\\h5p\\H5P-SchiebeSpiel";

    const { container } = render(<PrimitiveH5PContent viewModel={viewModel} />);

    expect(container).not.toBeEmptyDOMElement();
  });

  test("should be invisible if isVisible is false", () => {
    viewModel.isVisible.Value = false;

    const container = render(
      <Provider container={CoreDIContainer}>
        <PrimitiveH5PContent viewModel={viewModel} />
      </Provider>,
    );

    const ref = container.getByTestId("primitiveH5pContent-testid");
    expect(ref.style.visibility).toEqual("hidden");
  });

  test("H5PContent calls getH5PContentSizeDecision", () => {
    viewModel.filePath.Value =
      "wwwroot\\courses\\2\\World_For_Evaluation\\h5p\\H5P-SchiebeSpiel";

    //mock getH5PDivs
    const element = document.createElement("div");
    element.style.width = "90vw";
    const reference = { current: element } as RefObject<HTMLDivElement>;

    jest
      .spyOn(H5PUtils, "getH5PDivs")
      .mockReturnValue({ ref: reference.current!, div: element });
    jest
      .spyOn(H5PUtils, "getH5PContentSizeDecision")
      .mockReturnValue({ resetContent: true, shrinkContent: false });

    const { container } = render(
      <Provider container={CoreDIContainer}>
        <PrimitiveH5PContent viewModel={viewModel} />
      </Provider>,
    );

    waitFor(() => {
      expect(H5PUtils.getH5PContentSizeDecision).toHaveBeenCalled();
    });
  });
});
