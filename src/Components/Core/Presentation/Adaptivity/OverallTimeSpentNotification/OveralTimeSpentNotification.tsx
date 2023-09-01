import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import IOveralTimeSpentNotificationController from "./IOveralTimeSpentNotificationController";
import OveralTimeSpentNotificationViewModel from "./OveralTimeSpentNotificationViewModel";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import useObservable from "~ReactComponents/ReactRelated/CustomHooks/useObservable";
import StyledModal from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledModal";

export default function OveralTimeSpentNotification() {
  const [viewModel, controller] = useBuilder<
    OveralTimeSpentNotificationViewModel,
    IOveralTimeSpentNotificationController
  >(BUILDER_TYPES.IOveralTimeSpentNotificationBuilder);

  if (!viewModel || !controller) return null;

  const [showModal] = useObservable(viewModel.showModal);

  return <StyledModal showModal={showModal}> </StyledModal>;
}
