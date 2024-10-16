import IBreakTimeNotificationOverviewController from "./IBreakTimeNotificationOverviewController";
import BreakTimeNotificationOverviewViewModel from "./BreakTimeNotificationOverviewViewModel";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import StyledModal from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledModal";
import { useTranslation } from "react-i18next";
import useObservable from "~ReactComponents/ReactRelated/CustomHooks/useObservable";
import IBreakTimeNotification from "src/Components/Core/Domain/BreakTimeNotifications/IBreakTimeNotification";
import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";
import BreakTimeNotificationContent from "./BreakTimeNotificationContent";

function BreakTimeNotificationThumbnail({
  notification,
  onClick,
}: {
  notification: IBreakTimeNotification;
  onClick: () => void;
}) {
  const { t: translate } = useTranslation("breakTime");

  return (
    <div>
      <StyledButton onClick={onClick}>
        <img src={notification.images[0]} />
      </StyledButton>
      <div onClick={onClick}>{translate(notification.titleKey)}</div>
    </div>
  );
}

function BreakTimeNotificationThumbnailSection({
  title,
  notifications,
  controller,
}: {
  title: string;
  notifications: IBreakTimeNotification[];
  controller: IBreakTimeNotificationOverviewController;
}) {
  return (
    <div>
      <h1>{title}</h1>
      {/* TODO: change this to whatever is needed for styling  */}
      <ul>
        {notifications.map((notification) => (
          <BreakTimeNotificationThumbnail
            key={notification.titleKey}
            notification={notification}
            onClick={() => controller.selectNotification(notification)}
          />
        ))}
      </ul>
    </div>
  );
}

export default function BreakTimeNotificationOverview() {
  const [viewModel, controller] = useBuilder<
    BreakTimeNotificationOverviewViewModel,
    IBreakTimeNotificationOverviewController
  >(BUILDER_TYPES.IBreakTimeNotificationOverviewBuilder);

  const [showModal, setShowModal] = useObservable(viewModel.showModal);
  const [selectedNotification] = useObservable(viewModel.selectedNotification);

  const { t: translate } = useTranslation("breakTime");

  if (!viewModel || !controller) return null;
  if (!showModal) return null;

  return (
    <StyledModal
      title={translate("overviewTitle")!}
      onClose={() => setShowModal(false)}
    >
      {/* Selection */}
      {!selectedNotification && (
        <div>
          <BreakTimeNotificationThumbnailSection
            title={translate("shortBreaks")}
            notifications={viewModel.shortBreakTimeNotifications}
            controller={controller}
          />
          <BreakTimeNotificationThumbnailSection
            title={translate("mediumBreaks")}
            notifications={viewModel.mediumBreakTimeNotifications}
            controller={controller}
          />
          <BreakTimeNotificationThumbnailSection
            title={translate("longBreaks")}
            notifications={viewModel.longBreakTimeNotifications}
            controller={controller}
          />
        </div>
      )}

      {/* Single Notification */}
      <BreakTimeNotificationContent
        breakTimeNotification={selectedNotification!}
      />
    </StyledModal>
  );
}
