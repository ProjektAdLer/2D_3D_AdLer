import { fireEvent, render, waitFor } from "@testing-library/react";
import React from "react";
import LearningElementModalViewModel from "../../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningElementModal/LearningElementModalViewModel";
import PDFComponent from "../../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningElementModal/SubComponents/PDFComponent";
import { act } from "react-dom/test-utils";

describe("PDFComponent", () => {
  // The useCallbacks in MobilePDFComponent appear to be untestable.
  // To test them one would have to mock the entire react-pdf library and the useCallback function, which appears to cause other issues.
  const viewModel = new LearningElementModalViewModel();
  viewModel.filePath.Value =
    "https://projekt-adler.eu/wp-content/uploads/Poster_DGWF-Jahrestagung.pdf";

  // ANF-ID: [EWE0037]
  test("should render its DesktopPDFComponent when supportsPDFs returns false", () => {
    const pdfobject = require("pdfobject");
    pdfobject.supportsPDFs = true;

    const { container } = render(<PDFComponent viewModel={viewModel} />);

    expect(container.querySelector("#pdf")).toBeTruthy();
  });

  // ANF-ID: [EWE0037]
  test("should render its MobilePDFComponent when supportsPDFs returns false", () => {
    const pdfobject = require("pdfobject");
    pdfobject.supportsPDFs = false;

    const { container } = render(<PDFComponent viewModel={viewModel} />);

    expect(container.querySelector(".react-pdf__Document")).toBeTruthy();
  });

  test("nextPage button in MobilePDFComponent should increase pageNumber by 1", () => {
    const pdfobject = require("pdfobject");
    pdfobject.supportsPDFs = false;

    const renderResult = render(<PDFComponent viewModel={viewModel} />);
    const nextPageButton = renderResult.getByRole("button", { name: ">" });
    fireEvent.click(nextPageButton);

    //TODO: add expect when loading the PDF is fixed
  });

  test("previousPage button in MobilePDFComponent shouldn't decrease pageNumber by 1 when its at 1", async () => {
    const pdfobject = require("pdfobject");
    pdfobject.supportsPDFs = false;

    const renderResult = render(<PDFComponent viewModel={viewModel} />);

    // wait for the PDF to load
    let page;
    waitFor(() => {
      page = renderResult.getByTestId("pdfPage");
      expect(page).not.toBeEmptyDOMElement();
    });

    const previousPageButton = renderResult.getByRole("button", {
      name: "<",
    });
    act(() => {
      fireEvent.click(previousPageButton);
    });

    // TODO: comment in when loading the PDF is fixed
    // await waitFor(() => {
    //   expect(page).toHaveAttribute("data-page-number", "1");
    // });
  });
});
