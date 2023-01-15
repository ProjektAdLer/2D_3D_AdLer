import { render } from "@testing-library/react";
import React from "react";
import ElementModalViewModel from "../../../../../../Core/Presentation/React/SpaceDisplay/ElementModal/ElementModalViewModel";
import PDFComponent from "../../../../../../Core/Presentation/React/SpaceDisplay/ElementModal/SubComponents/PDFComponent";

describe("PDFComponent", () => {
  test("should render its PDF", () => {
    const viewModel = new ElementModalViewModel();
    viewModel.filePath.Value =
      "https://www.africau.edu/images/default/sample.pdf";

    render(<PDFComponent viewModel={viewModel} />);

    // TODO: add expect
  });

  test.todo("differentiate between mobile and desktop in tests");
});
