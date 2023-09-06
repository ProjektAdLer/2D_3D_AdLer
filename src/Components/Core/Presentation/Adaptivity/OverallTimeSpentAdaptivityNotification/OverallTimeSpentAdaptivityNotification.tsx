import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import IOverallTimeSpentAdaptivityNotificationController from "./IOverallTimeSpentAdaptivityNotificationController";
import OverallTimeSpentAdaptivityNotificationViewModel from "./OverallTimeSpentAdaptivityNotificationViewModel";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import useObservable from "~ReactComponents/ReactRelated/CustomHooks/useObservable";
import StyledModal from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledModal";
import { OverallTimeSpentAdaptivityNotificationBreakType } from "../../../Application/Ports/NotificationPort/INotificationAdapter";
import { AdLerUIComponent } from "../../../Types/ReactTypes";
import tailwindMerge from "../../Utils/TailwindMerge";

export default function OverallTimeSpentAdaptivityNotification({
  className,
}: AdLerUIComponent) {
  const [viewModel, controller] = useBuilder<
    OverallTimeSpentAdaptivityNotificationViewModel,
    IOverallTimeSpentAdaptivityNotificationController
  >(BUILDER_TYPES.IOverallTimeSpentAdaptivityNotificationBuilder);

  if (!viewModel || !controller) return null;

  const [showModal] = useObservable(viewModel?.showModal);
  const [breakType] = useObservable(viewModel?.breakType);

  if (!showModal || !breakType) return null;

  return (
    <StyledModal
      className={tailwindMerge(className, "")}
      showModal={showModal}
      onClose={() => OnCloseCallback(controller, breakType)}
    >
      {GetNotificationModalContents(breakType)}
    </StyledModal>
  );
}

function OnCloseCallback(
  controller: IOverallTimeSpentAdaptivityNotificationController,
  breakType: OverallTimeSpentAdaptivityNotificationBreakType
) {
  switch (breakType) {
    case OverallTimeSpentAdaptivityNotificationBreakType.Short:
      controller.closedShortBreakNotification();
      break;
    case OverallTimeSpentAdaptivityNotificationBreakType.Medium:
      controller.closedMediumBreakNotification();
      break;
  }
}

function GetNotificationModalContents(
  breakType: OverallTimeSpentAdaptivityNotificationBreakType
) {
  switch (breakType) {
    case OverallTimeSpentAdaptivityNotificationBreakType.Short:
      return ShortBreakContent();
    case OverallTimeSpentAdaptivityNotificationBreakType.Medium:
      return MediumBreakContent();
    case OverallTimeSpentAdaptivityNotificationBreakType.Long:
      return LongBreakContent();
    case OverallTimeSpentAdaptivityNotificationBreakType.None:
    default:
      return "";
  }
}

function ShortBreakContent() {
  return (
    <div data-testid="short-break">
      <p>Du bist seit 30min am arbeiten.</p>
      <p>Streck doch mal deine Beine aus!</p>
    </div>
  );
}

function MediumBreakContent() {
  return (
    <div data-testid="medium-break">
      <p>Du bist seit 90min am arbeiten.</p>
      <p>Mach doch mal 15min Kaffepause!</p>
    </div>
  );
}

function LongBreakContent() {
  return (
    <div data-testid="long-break">
      <p>Du bist seit 2 Stunden am arbeiten.</p>
      <p>Mach doch erstmal etwas komplett anderes!</p>
    </div>
  );
}
