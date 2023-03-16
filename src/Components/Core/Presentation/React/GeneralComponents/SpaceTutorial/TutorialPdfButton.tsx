import React, { useCallback, useEffect, useState } from "react";
import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";
import helpIcon from "../../../../../../Assets/icons/26-help/help-icon.svg";
import { Document, Page, pdfjs } from "react-pdf";
import StyledModal from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledModal";
import PDFObject from "pdfobject";
export default function TutorialPdfButton({
  className,
  pdfFileUrl,
}: {
  className?: string;
  pdfFileUrl: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <React.Fragment>
      <StyledButton
        icon={helpIcon}
        onClick={() => setIsOpen(true)}
        className={className}
      />
      <StyledModal showModal={isOpen} onClose={() => setIsOpen(false)}>
        <div className="w-[90vw] h-[90vh] text-black font-medium overflow-auto bg-adlerblue-100 p-3">
          {PDFObject.supportsPDFs ? (
            <DesktopPDFComponent pdfFileUrl={pdfFileUrl} />
          ) : (
            <MobilePDFComponent pdfFileUrl={pdfFileUrl} />
          )}
        </div>
      </StyledModal>
    </React.Fragment>
  );
}

// Desktop component uses PDFObject to embed the PDF in an inlined version of the browsers PDF viewer
// See https://pdfobject.com for reference
function DesktopPDFComponent({ pdfFileUrl }: { pdfFileUrl: string }) {
  useEffect(() => {
    PDFObject.embed(pdfFileUrl, "#pdf");
  });

  return <div id="pdf" className="h-full" />;
}

function MobilePDFComponent({ pdfFileUrl }: { pdfFileUrl: string }) {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState(1);
  const [filepath] = pdfFileUrl;

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
      <div className="flex flex-row justify-center mb-2 w-full h-6">
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
