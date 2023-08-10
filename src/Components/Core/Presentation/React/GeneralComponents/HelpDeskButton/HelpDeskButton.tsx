import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";
import helpIcon from "../../../../../../Assets/icons/26-help/help-icon.svg";
import tailwindMerge from "../../../Utils/TailwindMerge";
import { AdLerUIComponent } from "src/Components/Core/Types/ReactTypes";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import HelpDeskButtonViewModel from "./HelpDeskButtonViewModel";
import IHelpDeskButtonController from "./IHelpDeskButtonController";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";

export default function HelpDeskButton({ className }: AdLerUIComponent<{}>) {
  const [viewModel, controller] = useBuilder<
    HelpDeskButtonViewModel,
    IHelpDeskButtonController
  >(BUILDER_TYPES.IHelpDeskButtonBuilder);
  return (
    <>
      <StyledButton
        onClick={() => controller.onHelpDeskButtonClicked()}
        className={tailwindMerge(
          className,
          "fixed z-20 right-2 top-2 max-h-3/4"
        )}
      >
        {viewModel.buttonTitle}
        <img className="w-10 xl:w-12" src={helpIcon} alt="Help Icon" />
      </StyledButton>
    </>
  );
}
