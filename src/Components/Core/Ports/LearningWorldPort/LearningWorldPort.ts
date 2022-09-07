import { inject, injectable } from "inversify";
import ILearningWorldPort from "./ILearningWorldPort";
import BUILDER_TYPES from "../../DependencyInjection/Builders/BUILDER_TYPES";
import CORE_TYPES from "../../DependencyInjection/CoreTypes";
import type IPresentationBuilder from "../../Presentation/PresentationBuilder/IPresentationBuilder";
import type IPresentationDirector from "../../Presentation/PresentationBuilder/IPresentationDirector";
import ILearningRoomPresenter from "../../Presentation/Babylon/LearningRoom/ILearningRoomPresenter";
import ILearningElementsDropdownPresenter from "../../Presentation/React/LearningElementsDropdown/ILearningElementsDropdownPresenter";
import type INavigation from "../../Presentation/Babylon/Navigation/INavigation";
import ILearningWorldNamePanelPresenter from "../../Presentation/React/LearningWorldNamePanel/ILearningWorldNamePanelPresenter";
import ILearningWorldGoalPanelPresenter from "~ReactComponents/LearningWorldGoalPanel/ILearningWorldGoalPanelPresenter";
import { logger } from "src/Lib/Logger";
import LearningWorldTO from "../../Application/DataTransportObjects/LearningWorldTO";

@injectable()
export default class LearningWorldPort implements ILearningWorldPort {
  private roomPresenter: ILearningRoomPresenter;
  private learningElementDropdownPresenter: ILearningElementsDropdownPresenter;
  private learningWorldNamePanelPresenter: ILearningWorldNamePanelPresenter;
  private learningWorldGoalPanelPresenter: ILearningWorldGoalPanelPresenter;

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
    this.learningWorldNamePanelPresenter.displayWorldName(
      learningWorldTO.worldName
    );
    this.learningWorldGoalPanelPresenter.displayWorldGoal(
      learningWorldTO.worldGoal
    );
    console.log("world goaL", learningWorldTO.worldGoal);
    this.learningElementDropdownPresenter.presentLearningElements(
      learningWorldTO.learningRooms[0].learningElements
    );
  }

  public registerLearningElementDropdownPresenter(
    learningElementDropdownPresenter: ILearningElementsDropdownPresenter
  ): void {
    if (this.learningElementDropdownPresenter) {
      logger.warn("LearningElementDropdownPresenter is already registered");
    }
    this.learningElementDropdownPresenter = learningElementDropdownPresenter;
  }

  public registerLearningWorldNamePanelPresenter(
    learningWorldNamePanelPresenter: ILearningWorldNamePanelPresenter
  ): void {
    if (this.learningWorldNamePanelPresenter) {
      logger.warn("LearningWorldNamePanelPresenter is already registered");
    }
    this.learningWorldNamePanelPresenter = learningWorldNamePanelPresenter;
  }
  public registerLearningWorldGoalPanelPresenter(
    learningWorldGoalPanelPresenter: ILearningWorldGoalPanelPresenter
  ): void {
    if (this.learningWorldGoalPanelPresenter) {
      logger.warn("LearningWorldGoalPanelPresenter is already registered");
    }
    this.learningWorldGoalPanelPresenter = learningWorldGoalPanelPresenter;
  }
}
