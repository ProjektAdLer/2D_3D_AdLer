import { useCallback } from "react";
import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";
import helpIcon from "../../../../../../Assets/icons/26-help/help-icon.svg";
import tailwindMerge from "../../../Utils/TailwindMerge";
import { AdLerUIComponent } from "src/Components/Core/Types/ReactTypes";

export default function TutorialPdfButton({
  className,
  pdfFileUrl,
}: AdLerUIComponent<{ pdfFileUrl: string }>) {
  const openInNewTab = useCallback((url: string) => {
    window.open(url, "_blank", "noreferrer");
  }, []);

  return (
    <StyledButton
      onClick={() => openInNewTab(pdfFileUrl)}
      className={tailwindMerge(className)}
    >
      <img className="w-10 xl:w-12" src={helpIcon} alt="Help Icon" />
    </StyledButton>
  );
}
