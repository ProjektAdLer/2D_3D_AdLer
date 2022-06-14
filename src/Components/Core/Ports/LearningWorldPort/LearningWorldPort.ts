import { inject, injectable } from "inversify";
import ILearningWorldPort, {
  LearningWorldTO,
} from "../../Application/LoadWorld/ILearningWorldPort";
import BUILDER_TYPES from "../../DependencyInjection/Builders/BUILDER_TYPES";
import CoreDIContainer from "../../DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../DependencyInjection/CoreTypes";
import IPresentationBuilder from "../../Presentation/PresentationBuilder/IPresentationBuilder";
import IPresentationDirector from "../../Presentation/PresentationBuilder/IPresentationDirector";
import type IViewModelControllerProvider from "../../Presentation/ViewModelProvider/IViewModelControllerProvider";
import LearningWorldViewModel from "./LearningWorldViewModel";
import ILearningRoomPresenter from "../../Presentation/Babylon/LearningRoom/ILearningRoomPresenter";
import ILearningElementsDropdownPresenter from "../../Presentation/React/LearningElementsDropdown/ILearningElementsDropdownPresenter";
import INavigation from "../../Presentation/Babylon/Navigation/INavigation";

@injectable()
export default class LearningWorldPort implements ILearningWorldPort {
  private viewModel: LearningWorldViewModel;
  private roomPresenter: ILearningRoomPresenter;
  private learningElementDropdownPresenter: ILearningElementsDropdownPresenter;

  public set LearningElementDropdownPresenter(
    value: ILearningElementsDropdownPresenter
  ) {
    this.learningElementDropdownPresenter = value;
  }

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

    // TODO: use all the data from the learningWorldTO to create multiple rooms
    this.roomPresenter.presentLearningRoom(learningWorldTO.learningRooms[0]);

    this.viewModel = new LearningWorldViewModel();
    this.viewModelProvider.registerViewModelOnly<LearningWorldViewModel>(
      this.viewModel,
      LearningWorldViewModel
    );
    this.viewModel.worldName.Value = learningWorldTO.worldName;
    this.viewModel.worldNameLoading.Value = false;

    CoreDIContainer.get<INavigation>(CORE_TYPES.INavigation).setupNavigation();

    this.learningElementDropdownPresenter.presentLearningElements(
      learningWorldTO.learningRooms[0].learningElements
    );
  }
}
