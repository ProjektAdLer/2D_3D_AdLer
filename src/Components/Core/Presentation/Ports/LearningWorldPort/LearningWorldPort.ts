import { inject, injectable } from "inversify";
import ILearningWorldPort, {
  LearningWorldTO,
} from "../../../Application/LoadWorld/ILearningWorldPort";
import BUILDER_TYPES from "../../../DependencyInjection/Builders/BUILDER_TYPES";
import CoreDIContainer from "../../../DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../DependencyInjection/CoreTypes";
import ILearningRoomPort from "../../Babylon/LearningRoom/ILearningRoomPort";
import IPresentationBuilder from "../../PresentationBuilder/IPresentationBuilder";
import IPresentationDirector from "../../PresentationBuilder/IPresentationDirector";
import IViewModelControllerProvider from "../../ViewModelProvider/IViewModelControllerProvider";
import LearningWorldViewModel from "./LearningWorldViewModel";

@injectable()
export default class LearningWorldPort implements ILearningWorldPort {
  private viewModel: LearningWorldViewModel;
  private roomPresenter: ILearningRoomPort;

  constructor(
    @inject(CORE_TYPES.IViewModelControllerProvider)
    private viewModelProvider: IViewModelControllerProvider
  ) {}

  public presentLearningWorld(learningWorldTO: LearningWorldTO): void {
    let director = CoreDIContainer.get<IPresentationDirector>(
      BUILDER_TYPES.IPresentationDirector
    );
    let builder = CoreDIContainer.get<IPresentationBuilder>(
      BUILDER_TYPES.ILearningRoomBuilder
    );
    director.Builder = builder;

    director.build();
    this.roomPresenter = builder.getPresenter();
    this.roomPresenter.presentLearningRoom(learningWorldTO.learningRooms[0]);

    this.viewModel = new LearningWorldViewModel();
    this.viewModelProvider.registerViewModelOnly<LearningWorldViewModel>(
      this.viewModel,
      LearningWorldViewModel
    );
    this.viewModel.worldName.Value = learningWorldTO.worldName;
    this.viewModel.worldNameLoading.Value = false;
  }
}
