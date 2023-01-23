import { useEffect, useState } from "react";
import ElementModalViewModel from "../ElementModalViewModel";
import PDFObject from "pdfobject";
import { Document, Page, pdfjs } from "react-pdf";
import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";
import axios from "axios";
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

export default function PDFComponent({
  viewModel,
}: {
  viewModel: ElementModalViewModel;
}) {
  return (
    <div className="w-[400px] lg:w-[800px] h-[80vh] text-black font-medium overflow-auto bg-adlerblue-100 p-3">
      {
        // comment in "false ? (" and comment out "PDFObject.supportsPDFs ? (" to test mobile version on desktop, reverse before pushing!!!
        PDFObject.supportsPDFs ? (
          // false ? (
          <DesktopPDFComponent viewModel={viewModel} />
        ) : (
          <MobilePDFComponent viewModel={viewModel} />
        )
      }
    </div>
  );
}

// Desktop component uses PDFObject to embed the PDF in an inlined version of the browsers PDF viewer
// See https://pdfobject.com for reference
function DesktopPDFComponent({
  viewModel,
}: {
  viewModel: ElementModalViewModel;
}) {
  useEffect(() => {
    PDFObject.embed(viewModel.filePath.Value, "#pdf");
  });

  return <div id="pdf" className="h-full" />;
}

// Mobile component uses react-pdf to display the PDF, because most mobile-browsers don't support inline PDFs
// UI needs to be built from scratch
// See https://github.com/wojtekmaj/react-pdf for reference
function MobilePDFComponent({
  viewModel,
}: {
  viewModel: ElementModalViewModel;
}) {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  return (
    <div className="h-full">
      <Document
        file={viewModel.filePath.Value}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page
          pageNumber={pageNumber}
          renderTextLayer={false}
          renderAnnotationLayer={false}
        />
      </Document>
      <StyledButton
        onClick={() => {
          setPageNumber(Math.max(pageNumber - 1, 1));
        }}
      >
        {"<"}
      </StyledButton>
      <p>
        Page {pageNumber} of {numPages}
      </p>
      <StyledButton
        onClick={() => {
          setPageNumber(Math.min(pageNumber + 1, numPages!));
        }}
      >
        {">"}
      </StyledButton>
    </div>
  );
}
