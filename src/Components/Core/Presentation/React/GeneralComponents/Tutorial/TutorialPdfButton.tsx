import React, { useCallback, useEffect, useState } from "react";
import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";
import helpIcon from "../../../../../../Assets/icons/26-help/help-icon.svg";
import { Document, Page } from "react-pdf";
import StyledModal from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledModal";
import PDFObject from "pdfobject";
import tailwindMerge from "../../../Utils/TailwindMerge";
import { AdLerUIComponent } from "src/Components/Core/Types/ReactTypes";
export default function TutorialPdfButton({
  className,
  pdfFileUrl,
}: AdLerUIComponent<{ pdfFileUrl: string }>) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <React.Fragment>
      <StyledButton
        onClick={() => setIsOpen(true)}
        className={tailwindMerge(className)}
      >
        <img className="w-10 xl:w-12" src={helpIcon} alt="Help Icon" />
      </StyledButton>
      <StyledModal showModal={isOpen} onClose={() => setIsOpen(false)}>
        <div className="w-[90vw] h-[90vh] text-adlerdarkblue font-medium overflow-auto p-3">
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

      <div>
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