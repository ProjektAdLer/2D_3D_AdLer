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

@injectable()
export default class LearningWorldPort implements ILearningWorldPort {
  private roomPresenter: ILearningRoomPresenter;
  private learningElementDropdownPresenter: ILearningElementsDropdownPresenter;

  private learningWorldPanelPresenter: ILearningWorldNamePanelPresenter;

  public set LearningElementDropdownPresenter(
    value: ILearningElementsDropdownPresenter
  ) {
    this.learningElementDropdownPresenter = value;
  }

  constructor(
    @inject(CORE_TYPES.INavigation)
    private navigation: INavigation,
    @inject(BUILDER_TYPES.IPresentationDirector)
    private director: IPresentationDirector
  ) {}

  public presentLearningWorld(learningWorldTO: LearningWorldTO): void {
    const builder = CoreDIContainer.get<IPresentationBuilder>(
      BUILDER_TYPES.ILearningRoomBuilder
    );

    this.director.build(builder);
    this.roomPresenter = builder.getPresenter();

    // TODO: use all the data from the learningWorldTO to create multiple rooms
    this.roomPresenter.presentLearningRoom(learningWorldTO.learningRooms[0]);

    this.learningWorldPanelPresenter.displayWorldName(
      learningWorldTO.worldName
    );

    this.navigation.setupNavigation();

    this.learningElementDropdownPresenter.presentLearningElements(
      learningWorldTO.learningRooms[0].learningElements
    );
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
