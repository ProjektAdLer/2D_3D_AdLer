import { injectable } from "inversify";
import PrivacyViewModel from "./PrivacyViewModel";
import PrivacyController from "./PrivacyController";
import IPrivacyController from "./IPrivacyController";
import PrivacyPresenter from "./PrivacyPresenter";
import IPrivacyPresenter from "./IPrivacyPresenter";
import PresentationBuilder from "src/Components/Core/Presentation/PresentationBuilder/PresentationBuilder";

@injectable()
export default class PrivacyBuilder extends PresentationBuilder<
  PrivacyViewModel,
  IPrivacyController,
  undefined,
  IPrivacyPresenter
> {
  constructor() {
    super(PrivacyViewModel, PrivacyController, undefined, PrivacyPresenter);
  }

  override buildViewModel(): void {
    this.viewModel = new PrivacyViewModel();
  }

  override buildController(): void {
    this.controller = new PrivacyController(this.viewModel!);
  }

  override buildPresenter(): void {
    this.presenter = new PrivacyPresenter(this.viewModel!);
  }
}
