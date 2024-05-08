import { fireEvent, render, waitFor } from "@testing-library/react";
import React from "react";
import LearningElementModalViewModel from "../../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningElementModal/LearningElementModalViewModel";
import PDFComponent from "../../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningElementModal/SubComponents/PDFComponent";

describe("PDFComponent", () => {
  const viewModel = new LearningElementModalViewModel();
  viewModel.filePath.Value =
    "https://www.africau.edu/images/default/sample.pdf";

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

  test.todo(
    "nextPage button in MobilePDFComponent shouldn't increase pageNumber by 1 when its at the last page"
  );

  test("previousPage button in MobilePDFComponent shouldn't decrease pageNumber by 1 when its at 1", async () => {
    const pdfobject = require("pdfobject");
    pdfobject.supportsPDFs = false;

    const renderResult = render(<PDFComponent viewModel={viewModel} />);

    const previousPageButton = renderResult.getByRole("button", { name: "<" });
    fireEvent.click(previousPageButton);

    // TODO: comment in when loading the PDF is fixed
    // await waitFor(() => {
    //   const page = renderResult.getByTestId("pdfPage");
    //   expect(page).toHaveAttribute("data-page-number", "1");
    // });
  });

  test.todo(
    "previousPage button in MobilePDFComponent should decrease pageNumber by 1 when its not at 1"
  );
});
