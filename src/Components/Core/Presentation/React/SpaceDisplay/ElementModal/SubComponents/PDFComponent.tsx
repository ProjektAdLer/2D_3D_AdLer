import { useEffect } from "react";
import ElementModalViewModel from "../ElementModalViewModel";
import PDFObject from "pdfobject";
import { Document } from "react-pdf";

export default function PDFComponent({
  viewModel,
}: {
  viewModel: ElementModalViewModel;
}) {
  // TODO: Check if mobile or desktop
  const isMobile = true;

  return (
    <div className="w-[400px] lg:w-[800px] h-[80vh] text-black font-medium overflow-auto bg-adlerblue-100 p-3">
      {isMobile ? (
        <MobilePDFComponent viewModel={viewModel} />
      ) : (
        <DesktopPDFComponent viewModel={viewModel} />
      )}
    </div>
  );
}

function DesktopPDFComponent({
  viewModel,
}: {
  viewModel: ElementModalViewModel;
}) {
  useEffect(() => {
    PDFObject.embed(viewModel.filePath.Value, "#pdf");
  });

  return <div id="pdf" />;
}

function MobilePDFComponent({
  viewModel,
}: {
  viewModel: ElementModalViewModel;
}) {
  return <Document file={viewModel.filePath.Value} />;
}
