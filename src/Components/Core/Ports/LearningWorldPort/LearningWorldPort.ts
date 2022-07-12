import { injectable } from "inversify";
import ILearningWorldPort, { LearningWorldTO } from "./ILearningWorldPort";
import BUILDER_TYPES from "../../DependencyInjection/Builders/BUILDER_TYPES";
import CoreDIContainer from "../../DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../DependencyInjection/CoreTypes";
import IPresentationBuilder from "../../Presentation/PresentationBuilder/IPresentationBuilder";
import IPresentationDirector from "../../Presentation/PresentationBuilder/IPresentationDirector";
import ILearningRoomPresenter from "../../Presentation/Babylon/LearningRoom/ILearningRoomPresenter";
import ILearningElementsDropdownPresenter from "../../Presentation/React/LearningElementsDropdown/ILearningElementsDropdownPresenter";
import INavigation from "../../Presentation/Babylon/Navigation/INavigation";
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

  public presentLearningWorld(learningWorldTO: LearningWorldTO): void {
    let director = CoreDIContainer.get<IPresentationDirector>(
      BUILDER_TYPES.IPresentationDirector
    );
    const builder = CoreDIContainer.get<IPresentationBuilder>(
      BUILDER_TYPES.ILearningRoomBuilder
    );

    director.build(builder);
    this.roomPresenter = builder.getPresenter();

    // TODO: use all the data from the learningWorldTO to create multiple rooms
    this.roomPresenter.presentLearningRoom(learningWorldTO.learningRooms[0]);

    this.learningWorldPanelPresenter.displayWorldName(
      learningWorldTO.worldName
    );

    CoreDIContainer.get<INavigation>(CORE_TYPES.INavigation).setupNavigation();

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
