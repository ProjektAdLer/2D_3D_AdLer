import IModalManagerPresenter from "./IModalManagerPresenter";
import ModalManagerViewModel from "./ModalManagerViewModel";

export type NotificationType = "error" | "notification";
export type ErrorMessage = {
  message: string;
  type: NotificationType;
};

export default class ModalManagerPresenter implements IModalManagerPresenter {
  constructor(private viewModel: ModalManagerViewModel) {}
  presentErrorMessage(message: string, type: NotificationType): void {
    this.viewModel.errors.Value = [
      ...this.viewModel.errors.Value,
      { message: message, type: type },
    ];
  }
}
