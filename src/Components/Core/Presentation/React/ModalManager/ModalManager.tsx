import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import useBuilder from "~ReactComponents/CustomHooks/useBuilder";
import useObservable from "../CustomHooks/useObservable";
import StyledModal from "../ReactBaseComponents/StyledModal";
import ModalManagerController from "./ModalManagerController";
import { ErrorMessage, NotificationType } from "./ModalManagerPresenter";
import ModalManagerViewModel from "./ModalManagerViewModel";

export default function ModalManager({ ...restProps }: { [x: string]: any }) {
  const [viewModel] = useBuilder<ModalManagerViewModel, ModalManagerController>(
    BUILDER_TYPES.IModalManagerBuilder
  );

  const [notifications, setNotifications] = useObservable<ErrorMessage[]>(
    viewModel?.errors
  );

  if (notifications == null || notifications.length === 0) return null;

  const getTypeString = (type: NotificationType) => {
    switch (type) {
      case "error":
        return "Error";
      case "notification":
        return "Notification";
    }
  };

  return (
    <StyledModal
      showModal={notifications?.length > 0}
      title={getTypeString(notifications.last().type)}
      onClose={() => {
        const remainingNotifications = [...notifications];
        remainingNotifications.pop();
        setNotifications(remainingNotifications);
      }}
      {...restProps}
    >
      {notifications.last().message}
    </StyledModal>
  );
}
