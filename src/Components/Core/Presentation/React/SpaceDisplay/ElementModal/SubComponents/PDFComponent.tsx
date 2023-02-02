import { useCallback, useEffect, useState } from "react";
import ElementModalViewModel from "../ElementModalViewModel";
import PDFObject from "pdfobject";
import { Document, Page, pdfjs } from "react-pdf";
import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

// set to true to always show the mobile version of the PDF component
const debug_allwaysShowMobile = true;

export default function PDFComponent({
  viewModel,
}: {
  viewModel: ElementModalViewModel;
}) {
  return (
    <div className="w-[90vw] h-[90vh] text-black font-medium overflow-auto bg-adlerblue-100 p-3">
      {PDFObject.supportsPDFs || debug_allwaysShowMobile ? (
        <DesktopPDFComponent viewModel={viewModel} />
      ) : (
        <MobilePDFComponent viewModel={viewModel} />
      )}
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

  const onDocumentLoadSuccess = useCallback(
    ({ numPages }: { numPages: number }) => {
      setNumPages(numPages);
    },
    [numPages]
  );

  const previousPage = useCallback(() => {
    if (numPages) setPageNumber(Math.max(pageNumber - 1, 1));
  }, [pageNumber, numPages]);

  const nextPage = useCallback(() => {
    if (numPages) setPageNumber(Math.min(pageNumber + 1, numPages));
  }, [pageNumber, numPages]);

  return (
    <div className="h-full">
      <Document
        file={viewModel.filePath.Value}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page
          data-testid="pdfPage"
          pageNumber={pageNumber}
          renderTextLayer={false}
          renderAnnotationLayer={false}
        />
      </Document>
      <StyledButton onClick={previousPage}>{"<"}</StyledButton>
      <p>
        Page {pageNumber} of {numPages}
      </p>
      <StyledButton onClick={nextPage}>{">"}</StyledButton>
    </div>
  );
}
