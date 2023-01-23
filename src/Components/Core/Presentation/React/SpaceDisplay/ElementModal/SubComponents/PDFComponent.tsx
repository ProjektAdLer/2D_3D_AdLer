import { useEffect, useState } from "react";
import ElementModalViewModel from "../ElementModalViewModel";
import PDFObject from "pdfobject";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

export default function PDFComponent({
  viewModel,
}: {
  viewModel: ElementModalViewModel;
}) {
  return (
    <div className="w-[400px] lg:w-[800px] h-[80vh] text-black font-medium overflow-auto bg-adlerblue-100 p-3">
      {PDFObject.supportsPDFs ? (
        // comment in to test mobile version on desktop
        // {false ? (
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
  // options object can be used to set height and width of the PDF viewer, remove if not necessary
  const options: PDFObject.Options = { height: "100%", width: "100%" };

  useEffect(() => {
    PDFObject.embed(viewModel.filePath.Value, "#pdf", options);
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

  // TODO: add buttons to change page, let them call setPageNumber onClick
  return (
    <div className="h-full">
      <Document
        file={viewModel.filePath.Value}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} />
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
    </div>
  );
}
