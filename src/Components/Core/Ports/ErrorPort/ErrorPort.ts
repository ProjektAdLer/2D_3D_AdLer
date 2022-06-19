import { injectable } from "inversify";
import IErrorModalManagerPresenter from "../../Presentation/React/ErrorModalManager/IErrorModalManagerPresenter";
import IErrorPort from "./IErrorPort";

@injectable()
export default class ErrorPort implements IErrorPort {
  private errorModalManagerPresenter: IErrorModalManagerPresenter;
  registerErrorModalManager(presenter: IErrorModalManagerPresenter): void {
    this.errorModalManagerPresenter = presenter;
  }
  displayErrorModal(errorMessage: string): void {
    this.errorModalManagerPresenter.presentErrorMessage(errorMessage);
  }
}
