import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";
import helpIcon from "../../../../../../Assets/icons/help.svg";
import tailwindMerge from "../../../Utils/TailwindMerge";
import { AdLerUIComponent } from "src/Components/Core/Types/ReactTypes";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import HelpDeskButtonViewModel from "./HelpDeskButtonViewModel";
import IHelpDeskButtonController from "./IHelpDeskButtonController";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import { useTranslation } from "react-i18next";

export default function HelpDeskButton({ className }: AdLerUIComponent<{}>) {
  const [viewModel, controller] = useBuilder<
    HelpDeskButtonViewModel,
    IHelpDeskButtonController
  >(BUILDER_TYPES.IHelpDeskButtonBuilder);

  const { t: translate } = useTranslation("learningSpace");

  return (
    <div className={tailwindMerge(className, "")}>
      <StyledButton
        onClick={() => controller.onHelpDeskButtonClicked()}
        title={translate("sidebar_helpToolTip").toString()}
      >
        {viewModel?.buttonTitle}
        <img
          className="w-10 xl:w-12 mobile-landscape:w-6"
          src={helpIcon}
          alt="Help Icon"
          title={translate("HelpButtonToolTip").toString()}
        />
      </StyledButton>
    </div>
  );
}
