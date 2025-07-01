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
import i18next from "i18next";

function BreakTimeNotificationThumbnail({
  notification,
  onClick,
}: {
  notification: IBreakTimeNotification;
  onClick: () => void;
}) {
  const { t: translate } = useTranslation("breakTime");

  return (
    <div className="flex flex-col">
      <StyledButton
        className="line-clamp-2 portrait:h-[15vh] h-[20vh] lg:w-[15vw]"
        shape="freeFloatCenter"
        onClick={onClick}
        data-testid={notification.titleKey}
      >
        <div className="flex flex-col">
          <img
            src={notification.images[0]}
            alt={translate(notification.titleKey) + "Thumbnail"}
          />
          <p onClick={onClick}>{translate(notification.titleKey)}</p>
        </div>
      </StyledButton>
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
      <h1 className="pt-2 pb-2 text-lg">{title}</h1>
      <div className="grid portrait:grid-cols-2 grid-cols-5 gap-5 pt-4 bg-whitetrans rounded-lg p-4 max-h-[30vh] overflow-y-auto">
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
      closeButtonToolTip={i18next
        .t("closeToolTip", { ns: "helpMenu" })
        .toString()}
    >
      {/* Selection */}
      {!selectedNotification && (
        <div className="text-md font-bold text-adlerdarkblue pl-1 overflow-y-auto max-h-[90vh] lg:max-h-[85vh]">
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
