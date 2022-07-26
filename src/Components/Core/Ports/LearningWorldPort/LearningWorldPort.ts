import { inject, injectable } from "inversify";
import ILearningWorldPort, { LearningWorldTO } from "./ILearningWorldPort";
import BUILDER_TYPES from "../../DependencyInjection/Builders/BUILDER_TYPES";
import CoreDIContainer from "../../DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../DependencyInjection/CoreTypes";
import type IPresentationBuilder from "../../Presentation/PresentationBuilder/IPresentationBuilder";
import type IPresentationDirector from "../../Presentation/PresentationBuilder/IPresentationDirector";
import ILearningRoomPresenter from "../../Presentation/Babylon/LearningRoom/ILearningRoomPresenter";
import ILearningElementsDropdownPresenter from "../../Presentation/React/LearningElementsDropdown/ILearningElementsDropdownPresenter";
import type INavigation from "../../Presentation/Babylon/Navigation/INavigation";
import ILearningWorldNamePanelPresenter from "../../Presentation/React/LearningWorldNamePanel/ILearningWorldNamePanelPresenter";
import LearningRoomBuilder from "../../Presentation/Babylon/LearningRoom/LearningRoomBuilder";

@injectable()
export default class LearningWorldPort implements ILearningWorldPort {
  private roomPresenter: ILearningRoomPresenter;
  private learningElementDropdownPresenter: ILearningElementsDropdownPresenter;
  private learningWorldPanelPresenter: ILearningWorldNamePanelPresenter;

  constructor(
    @inject(CORE_TYPES.INavigation)
    private navigation: INavigation,
    @inject(BUILDER_TYPES.IPresentationDirector)
    private director: IPresentationDirector,
    @inject(BUILDER_TYPES.ILearningRoomBuilder)
    private learningRoomBuilder: IPresentationBuilder
  ) {}

  public presentLearningWorld(learningWorldTO: LearningWorldTO): void {
    this.director.build(this.learningRoomBuilder);
    this.roomPresenter = this.learningRoomBuilder.getPresenter();

    // TODO: use all the data from the learningWorldTO to create multiple rooms
    this.roomPresenter.presentLearningRoom(learningWorldTO.learningRooms[0]);

    // initialize navigation for the room
    // TODO: move this to a better location
    this.navigation.setupNavigation();

    // call UI presenter to present new data
    this.learningWorldPanelPresenter.displayWorldName(
      learningWorldTO.worldName
    );
    this.learningElementDropdownPresenter.presentLearningElements(
      learningWorldTO.learningRooms[0].learningElements
    );
  }

  public registerLearningElementDropdownPresenter(
    learningElementDropdownPresenter: ILearningElementsDropdownPresenter
  ): void {
    if (this.learningElementDropdownPresenter) {
      throw new Error("LearningElementDropdownPresenter is already registered");
    }
    this.learningElementDropdownPresenter = learningElementDropdownPresenter;
  }

  public registerLearningWorldPanelPresenter(
    learningWorldPanelPresenter: ILearningWorldNamePanelPresenter
  ): void {
    if (this.learningWorldPanelPresenter) {
      throw new Error("LearningWorldPanelPresenter is already registered");
    }
    this.learningWorldPanelPresenter = learningWorldPanelPresenter;
  }
}
