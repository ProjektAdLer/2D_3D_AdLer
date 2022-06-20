import { NotificationType } from "./ModalManagerPresenter";
export default interface IModalManagerPresenter {
  presentErrorMessage(message: string, type: NotificationType): void;
}
