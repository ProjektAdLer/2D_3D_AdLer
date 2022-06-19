import IErrorModalManagerPresenter from "./IErrorModalManagerPresenter";
import ErrorModalManagerViewModel from "./ErrorModalManagerViewModel";

export default class ErrorModalManagerPresenter
  implements IErrorModalManagerPresenter
{
  constructor(private viewModel: ErrorModalManagerViewModel) {}
  presentErrorMessage(errorMessage: string): void {
    this.viewModel.errors.Value = [
      ...this.viewModel.errors.Value,
      errorMessage,
    ];
  }
}
