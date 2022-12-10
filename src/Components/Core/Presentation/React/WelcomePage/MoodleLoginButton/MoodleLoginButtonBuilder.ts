import { injectable } from "inversify";
import PresentationBuilder from "../../../PresentationBuilder/PresentationBuilder";
import MoodleLoginButtonController from "./MoodleLoginButtonController";
import MoodleLoginButtonPresenter from "./MoodleLoginButtonPresenter";
import MoodleLoginButtonViewModel from "./MoodleLoginButtonViewModel";
import CoreDIContainer from "../../../../DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../../DependencyInjection/CoreTypes";
import ViewModelControllerProvider from "../../../ViewModelProvider/ViewModelControllerProvider";
import ILMSPort from "../../../../Ports/LMSPort/ILMSPort";
import PORT_TYPES from "../../../../DependencyInjection/Ports/PORT_TYPES";

@injectable()
export default class MoodleLoginButtonBuilder extends PresentationBuilder<
  MoodleLoginButtonViewModel,
  MoodleLoginButtonController,
  undefined,
  MoodleLoginButtonPresenter
> {
  constructor() {
    super(
      MoodleLoginButtonViewModel,
      MoodleLoginButtonController,
      undefined,
      MoodleLoginButtonPresenter
    );
  }

  override buildController(): void {
    super.buildController();
    CoreDIContainer.get<ViewModelControllerProvider>(
      CORE_TYPES.IViewModelControllerProvider
    ).registerTupel(
      this.viewModel,
      this.controller,
      MoodleLoginButtonViewModel
    );
  }

  override buildPresenter(): void {
    super.buildPresenter();
    CoreDIContainer.get<ILMSPort>(
      PORT_TYPES.IMoodlePort
    ).registerMoodleLoginButtonPresenter(this.presenter!);
  }
}
