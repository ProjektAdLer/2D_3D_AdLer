import { useCallback, useEffect, useState } from "react";
import LearningElementModalViewModel from "../LearningElementModalViewModel";
import PDFObject from "pdfobject";
import { Document, Page, pdfjs } from "react-pdf";
import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";
import useObservable from "~ReactComponents/ReactRelated/CustomHooks/useObservable";
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

// set to true to always show the mobile version of the PDF component
const debug_alwaysShowMobile = false;

export default function PDFComponent({
  viewModel,
}: {
  viewModel: LearningElementModalViewModel;
}) {
  return (
    <div className="w-[90vw] h-[90vh] text-black font-medium overflow-auto bg-adlerblue-100 p-3">
      {PDFObject.supportsPDFs || debug_alwaysShowMobile ? (
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
  viewModel: LearningElementModalViewModel;
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
  viewModel: LearningElementModalViewModel;
}) {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState(1);
  const [filepath] = useObservable(viewModel.filePath);

  const onDocumentLoadSuccess = useCallback(
    ({ numPages }: { numPages: number }) => {
      setNumPages(numPages);
    },
    [setNumPages]
  );

  const previousPage = useCallback(() => {
    if (numPages) setPageNumber(Math.max(pageNumber - 1, 1));
  }, [pageNumber, numPages, setPageNumber]);

  const nextPage = useCallback(() => {
    if (numPages) setPageNumber(Math.min(pageNumber + 1, numPages));
  }, [pageNumber, numPages, setPageNumber]);

  return (
    <div className="flex-col h-full ">
      <div className="flex flex-row justify-center w-full h-6 mb-2">
        <StyledButton
          shape="freefloatcenter"
          className=""
          onClick={previousPage}
        >
          {"<"}
        </StyledButton>
        <p className="mx-8">
          Page {pageNumber} of {numPages}
        </p>
        <StyledButton shape="freefloatcenter" className="" onClick={nextPage}>
          {">"}
        </StyledButton>
      </div>

      <div className="">
        <Document file={filepath} onLoadSuccess={onDocumentLoadSuccess}>
          <Page
            width={window.innerWidth * 0.87}
            data-testid="pdfPage"
            pageNumber={pageNumber}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        </Document>
      </div>
    </div>
  );
}
