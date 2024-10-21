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
      <StyledButton onClick={onClick} data-testid={notification.titleKey}>
        <img
          src={notification.images[0]}
          alt={translate(notification.titleKey) + "Thumbnail"}
        />
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
    <div className="">
      <h1 className="text-lg pt-2">{title}</h1>
      <div className="grid grid-cols-5 gap-5 pt-4 bg-whitetrans rounded-lg p-4">
        {notifications.map((notification) => (
          <BreakTimeNotificationThumbnail
            key={notification.titleKey}
            notification={notification}
            onClick={() => controller.selectNotification(notification)}
          />
        ))}
      </div>
    </div>
  );
}

export default function BreakTimeNotificationOverview() {
  const [viewModel, controller] = useBuilder<
    BreakTimeNotificationOverviewViewModel,
    IBreakTimeNotificationOverviewController
  >(BUILDER_TYPES.IBreakTimeNotificationOverviewBuilder);

  const [showModal] = useObservable(viewModel?.showModal);
  const [selectedNotification] = useObservable(viewModel?.selectedNotification);

  const { t: translate } = useTranslation("breakTime");

  if (!viewModel || !controller) return null;
  if (!showModal) return null;

  return (
    <StyledModal
      title={translate("Pausenhinweise")!}
      onClose={controller.closeModal}
      showModal={showModal}
    >
      {/* Selection */}
      {!selectedNotification && (
        <div className="text-md font-bold text-adlerdarkblue pl-1">
          <BreakTimeNotificationThumbnailSection
            title={translate("30 Minuten Pausenhinweise")}
            notifications={viewModel.shortBreakTimeNotifications}
            controller={controller}
          />
          <BreakTimeNotificationThumbnailSection
            title={translate("2 Stunden Pausenhinweise")}
            notifications={viewModel.mediumBreakTimeNotifications}
            controller={controller}
          />
          <BreakTimeNotificationThumbnailSection
            title={translate("4 Stunden Pausenhinweise")}
            notifications={viewModel.longBreakTimeNotifications}
            controller={controller}
          />
        </div>
      )}

      {/* Single Notification */}
      {selectedNotification && (
        <div className="flex flex-col items-end">
          <BreakTimeNotificationContent
            breakTimeNotification={selectedNotification!}
          />
          <StyledButton
            shape="freeFloatCenter"
            onClick={controller.returnToOverview}
          >
            {"Zurück zur Übersicht"}
          </StyledButton>
        </div>
      )}
    </StyledModal>
  );
}
