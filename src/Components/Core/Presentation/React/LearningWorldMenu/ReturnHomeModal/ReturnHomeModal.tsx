import { AdLerUIComponent } from "src/Components/Core/Types/ReactTypes";
import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";
import StyledModal from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledModal";
import history from "history/browser";
import homeIcon from "../../../../../../Assets/icons/22-home-icon/home-icon-nobg.svg";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import ReturnHomeModalViewModel from "./ReturnHomeModalViewModel";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import useObservable from "~ReactComponents/ReactRelated/CustomHooks/useObservable";
import { Trans, useTranslation } from "react-i18next";

export default function ReturnHomeModal({ className }: AdLerUIComponent) {
  const [viewModel] = useBuilder<ReturnHomeModalViewModel, undefined>(
    BUILDER_TYPES.IReturnHomeModalBuilder
  );

  const { t: translate } = useTranslation("worldMenu");
  const [isNoWorldAvailable] = useObservable<boolean>(
    viewModel?.isNoWorldAvailable
  );

  if (!viewModel) return null;

  return (
    <StyledModal
      title={translate("NoAvailableCoursesReturnHomeTitle").toString()}
      canClose={false}
      showModal={isNoWorldAvailable}
    >
      <div className="flex flex-col items-center">
        <Trans i18nKey="NoAvailableCoursesReturnHomeText" ns="worldMenu" />
        <StyledButton onClick={() => history.push("/")} className="mr-4 m-1">
          <img className="w-10 xl:w-12" src={homeIcon} alt="Home Icon" />
        </StyledButton>
      </div>
    </StyledModal>
  );
}
