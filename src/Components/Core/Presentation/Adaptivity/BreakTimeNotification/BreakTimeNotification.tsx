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
      <StyledContainer className="fixed z-10 flex justify-between items-start lg:x-2 p-1 rounded-lg bottom-2 left-2 bg-buttonbgblue lg:!w-96">
        <div className="absolute z-50 w-5 h-5 rounded-full pointer-events-none -top-2 -right-2 animate-ping bg-nodehandlecolor"></div>
        <div className="absolute z-50 w-5 h-5 rounded-full pointer-events-none -top-2 -right-2 bg-nodehandlecolor"></div>
        <StyledButton
          shape="square"
          onClick={() => controller.minimizeOrMaximizeBreakNotification()}
          title={translate("pauseNotificationToolTip").toString()}
        >
          <img src={pauseIcon} className="h-fit" alt="Pause Icon" />
        </StyledButton>
        <div className="hidden lg:visible lg:flex lg:flex-col items-start max-w-[60%] text-adlerdarkblue">
          <h1 className="text-xl font-bold">{translate("pauseInfo")}</h1>
          <p className="text-sm">{translate("pauseExplanation")}</p>
        </div>
        <CloseButton
          className="place-self-start flex items-center justify-center border-t-[1px] border-l-[1px] border-b-4 border-r-4 border-adlerdarkblue rounded-lg font-bold"
          onClick={() => controller.closeBreakNotification()}
        >
          <img
            src={closeIcon}
            className="lg:w-10 md:w-8 sm:w-6"
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
