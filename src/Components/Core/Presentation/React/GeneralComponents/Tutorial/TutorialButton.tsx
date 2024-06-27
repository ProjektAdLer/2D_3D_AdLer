import { useCallback } from "react";
import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";
import manualIcon from "../../../../../../Assets/icons/37-manual/manual-icon-nobg.svg";
import tailwindMerge from "../../../Utils/TailwindMerge";
import { AdLerUIComponent } from "src/Components/Core/Types/ReactTypes";

export default function TutorialButton({
  className,
  url,
}: AdLerUIComponent<{ url: string }>) {
  const openInNewTab = useCallback((url: string) => {
    window.open(url, "_blank", "noreferrer");
  }, []);

  return (
    <StyledButton
      onClick={() => openInNewTab(url)}
      className={tailwindMerge(className)}
    >
      <img className="w-10 xl:w-12" src={manualIcon} alt="Help Icon" />
    </StyledButton>
  );
}
