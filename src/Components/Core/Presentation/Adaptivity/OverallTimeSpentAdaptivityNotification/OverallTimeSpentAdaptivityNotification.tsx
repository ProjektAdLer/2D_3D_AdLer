import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import IOveralTimeSpentAdaptivityNotificationController from "./IOverallTimeSpentAdaptivityNotificationController";
import OveralTimeSpentAdaptivityNotificationViewModel from "./OverallTimeSpentAdaptivityNotificationViewModel";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import useObservable from "~ReactComponents/ReactRelated/CustomHooks/useObservable";
import StyledModal from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledModal";

export default function OveralTimeSpentAdaptivityNotification() {
  const [viewModel, controller] = useBuilder<
    OveralTimeSpentAdaptivityNotificationViewModel,
    IOveralTimeSpentAdaptivityNotificationController
  >(BUILDER_TYPES.IOveralTimeSpentAdaptivityNotificationBuilder);

  if (!viewModel || !controller) return null;

  const [showModal] = useObservable(viewModel.showModal);

  return <StyledModal showModal={showModal}> </StyledModal>;
}
