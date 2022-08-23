import useObservable from "../CustomHooks/useObservable";
import useViewModelControllerProvider from "../CustomHooks/useViewModelControllerProvider";
import StyledModal from "../ReactBaseComponents/StyledModal";
import ModalManagerController from "./ModalManagerController";
import { ErrorMessage, NotificationType } from "./ModalManagerPresenter";
import ModalManagerViewModel from "./ModalManagerViewModel";

export default function ModalManager({ ...restProps }: { [x: string]: any }) {
  const [viewModels] = useViewModelControllerProvider<
    ModalManagerViewModel,
    ModalManagerController
  >(ModalManagerViewModel);

  const [notifications, setNotifications] = useObservable<ErrorMessage[]>(
    viewModels[0]?.errors
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
