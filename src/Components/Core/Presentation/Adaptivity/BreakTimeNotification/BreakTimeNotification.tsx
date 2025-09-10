import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import IBreakTimeNotificationController from "./IBreakTimeNotificationController";
import BreakTimeNotificationViewModel from "./BreakTimeNotificationViewModel";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import useObservable from "~ReactComponents/ReactRelated/CustomHooks/useObservable";
import StyledModal from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledModal";
import { AdLerUIComponent } from "../../../Types/ReactTypes";
import tailwindMerge from "../../Utils/TailwindMerge";
import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";
import pauseIcon from "../../../../../Assets/icons/pause.svg";
import closeIcon from "../../../../../../src/Assets/icons/close.svg";
import StyledContainer from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledContainer";
import { useTranslation } from "react-i18next";
import CloseButton from "~ReactComponents/ReactRelated/ReactBaseComponents/CloseButton";
import BreakTimeNotificationContent from "~ReactComponents/GeneralComponents/BreakTimeNotificationOverview/BreakTimeNotificationContent";

export default function BreakTimeNotification({ className }: AdLerUIComponent) {
  const [viewModel, controller] = useBuilder<
    BreakTimeNotificationViewModel,
    IBreakTimeNotificationController
  >(BUILDER_TYPES.IBreakTimeNotificationBuilder);

  const [showModal] = useObservable(viewModel?.showModal);
  const [showMinimizedModal] = useObservable(viewModel?.showMinimizedModal);

  const { t: translate } = useTranslation("breakTime");

  if (!viewModel || !controller || !showModal) return null;

  if (showMinimizedModal)
    return (
      <StyledContainer className="lg:x-2 fixed bottom-2 left-2 z-10 flex items-start justify-between rounded-lg bg-buttonbgblue p-1 lg:!w-96">
        <div className="pointer-events-none absolute -right-2 -top-2 z-50 h-5 w-5 animate-ping rounded-full bg-nodehandlecolor"></div>
        <div className="pointer-events-none absolute -right-2 -top-2 z-50 h-5 w-5 rounded-full bg-nodehandlecolor"></div>
        <StyledButton
          shape="square"
          onClick={() => controller.minimizeOrMaximizeBreakNotification()}
          title={translate("pauseNotificationToolTip").toString()}
          data-testid="breaktime-minmax"
        >
          <img src={pauseIcon} className="h-fit" alt="Pause Icon" />
        </StyledButton>
        <div className="hidden max-w-[60%] items-start text-adlerdarkblue lg:visible lg:flex lg:flex-col">
          <h1 className="text-xl font-bold">{translate("pauseInfo")}</h1>
          <p className="text-sm">{translate("pauseExplanation")}</p>
        </div>
        <CloseButton
          className="flex items-center justify-center place-self-start rounded-lg border-b-4 border-l-[1px] border-r-4 border-t-[1px] border-adlerdarkblue font-bold"
          onClick={() => controller.closeBreakNotification()}
        >
          <img
            src={closeIcon}
            className="sm:w-6 md:w-8 lg:w-10"
            alt="CloseIcon"
          ></img>
        </CloseButton>
      </StyledContainer>
    );

  return (
    <StyledModal
      className={tailwindMerge(className, "")}
      showModal={showModal}
      onClose={controller.closeBreakNotification}
      title={translate("pauseTitle").toString()}
    >
      <BreakTimeNotificationContent
        breakTimeNotification={viewModel.notificationToDisplay.Value}
      />
    </StyledModal>
  );
}
