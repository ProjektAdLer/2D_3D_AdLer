import { inject, injectable } from "inversify";
import ILearningWorldPort, {
  LearningWorldTO,
} from "../../Application/LoadWorld/ILearningWorldPort";
import CoreDIContainer from "../../DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../DependencyInjection/CoreTypes";
import ILearningRoomPort from "../LearningRoom/ILearningRoomPort";
import LearningRoomPresenter from "../LearningRoom/LearningRoomPresenter";
import IPresentationBuilder from "../PresentationBuilder/IPresentationBuilder";
import IPresentationDirector from "../PresentationBuilder/IPresentationDirector";
import LearningRoomBuilder from "../PresentationBuilder/LearningRoomBuilder";
import IViewModelProvider from "../ViewModelProvider/IViewModelProvider";
import LearningWorldViewModel from "./LearningWorldViewModel";

@injectable()
export default class LearningWorldPresenter implements ILearningWorldPort {
  private viewModel: LearningWorldViewModel;
  private roomPresenter: ILearningRoomPort;

  constructor(
    @inject(CORE_TYPES.IViewModelProvider)
    private viewModelProvider: IViewModelProvider
  ) {}

  public presentLearningWorld(learningWorldTO: LearningWorldTO): void {
    let director = CoreDIContainer.get<IPresentationDirector>(
      CORE_TYPES.IPresentationDirector
    );
    let builder = CoreDIContainer.get<IPresentationBuilder>(
      CORE_TYPES.ILearningRoomBuilder
    );
    director.Builder = builder;

    director.build();
    this.roomPresenter = builder.getPresenter();
    this.roomPresenter.presentLearningRoom(learningWorldTO.learningRooms[0]);

    this.viewModel = new LearningWorldViewModel();
    this.viewModelProvider.registerViewModel<LearningWorldViewModel>(
      this.viewModel,
      LearningWorldViewModel
    );
    this.viewModel.worldName.setValue(learningWorldTO.worldName);
    this.viewModel.worldNameLoading.setValue(false);
  }
}
