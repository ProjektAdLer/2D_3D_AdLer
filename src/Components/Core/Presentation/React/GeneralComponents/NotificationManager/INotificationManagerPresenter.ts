import { NotificationType } from "src/Components/Core/Ports/UIPort/IUIAdapter";

export default interface INotificationManagerPresenter {
  presentErrorMessage(message: string, type: NotificationType): void;
}
