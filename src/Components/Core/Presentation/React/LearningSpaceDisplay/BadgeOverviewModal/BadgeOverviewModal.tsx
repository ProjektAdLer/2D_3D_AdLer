import { AdLerUIComponent } from "src/Components/Core/Types/ReactTypes";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import BadgeOverviewModalViewModel from "./BadgeOverviewModalViewModel";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import StyledModal from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledModal";
import tailwindMerge from "../../../Utils/TailwindMerge";
import { useTranslation } from "react-i18next";
import useObservable from "~ReactComponents/ReactRelated/CustomHooks/useObservable";

export default function BadgeOverviewModal({ className }: AdLerUIComponent) {
  const [viewModel] = useBuilder<BadgeOverviewModalViewModel, undefined>(
    BUILDER_TYPES.IBadgeOverviewModalBuilder,
  );
  const [isOpen] = useObservable(viewModel.isOpen);

  const { t: translate } = useTranslation(["spaceMenu", "helpmenu"]);
  if (!viewModel) return null;
  return (
    <StyledModal
      className={tailwindMerge(
        className,
        "flex flex-col items-center justify-center",
      )}
      title={translate("badgeOverviewTitle").toString()}
      showModal={isOpen}
      onClose={() => {
        viewModel.isOpen.Value = false;
      }}
    >
      blabla
    </StyledModal>
  );
}
