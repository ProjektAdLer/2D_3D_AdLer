import IErrorModalManagerPresenter from "../../Presentation/React/ErrorModalManager/IErrorModalManagerPresenter";

export default interface IErrorPort {
  registerErrorModalManager(presenter: IErrorModalManagerPresenter): void;
  displayErrorModal(errorMessage: string): void;
}
