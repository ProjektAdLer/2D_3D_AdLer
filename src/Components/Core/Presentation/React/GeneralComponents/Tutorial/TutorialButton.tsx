import { useCallback } from "react";
import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";
import manualIcon from "../../../../../../Assets/icons/manual.svg";
import tailwindMerge from "../../../Utils/TailwindMerge";
import { AdLerUIComponent } from "src/Components/Core/Types/ReactTypes";
import { useTranslation } from "react-i18next";

export default function TutorialButton({
  className,
  url,
}: AdLerUIComponent<{ url: string }>) {
  const openInNewTab = useCallback((url: string) => {
    window.open(url, "_blank", "noreferrer");
  }, []);

  const { t: translate } = useTranslation("helpMenu");

  return (
    <StyledButton
      onClick={() => openInNewTab(url)}
      className={tailwindMerge(className)}
      title={translate("manualToolTip").toString()}
      data-testid="tutorial"
    >
      <img className="w-10 xl:w-12" src={manualIcon} alt="Help Icon" />
    </StyledButton>
  );
}
