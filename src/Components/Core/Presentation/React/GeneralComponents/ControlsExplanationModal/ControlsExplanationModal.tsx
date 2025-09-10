import ControlsExplanationModalViewModel from "./ControlsExplanationModalViewModel";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import StyledModal from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledModal";
import { useTranslation } from "react-i18next";
import { AdLerUIComponent } from "src/Components/Core/Types/ReactTypes";
import tailwindMerge from "../../../Utils/TailwindMerge";
import useObservable from "~ReactComponents/ReactRelated/CustomHooks/useObservable";
import ControlsExplanationContent from "./ControlsExplanationContent";
import i18next from "i18next";

export default function ControlsExplanationModal({
  className,
}: AdLerUIComponent<{}>) {
  const [viewModel] = useBuilder<ControlsExplanationModalViewModel, undefined>(
    BUILDER_TYPES.IControlsExplanationModalBuilder,
  );
  const { t: translate } = useTranslation("controls");

  const [isOpen, setIsOpen] = useObservable(viewModel?.isOpen);

  if (!viewModel) return null;
  if (!isOpen) return null;

  return (
    <StyledModal
      className={tailwindMerge(className, "")}
      title={translate("title")!}
      showModal={isOpen}
      onClose={() => {
        setIsOpen(false);
      }}
      closeButtonToolTip={i18next
        .t("closeToolTip", { ns: "helpMenu" })
        .toString()}
      data-testid="controls-close"
    >
      <ControlsExplanationContent className={tailwindMerge(className, "")} />
    </StyledModal>
  );
}
