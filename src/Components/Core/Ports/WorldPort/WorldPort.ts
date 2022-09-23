import { inject, injectable } from "inversify";
import IWorldPort from "./IWorldPort";
import BUILDER_TYPES from "../../DependencyInjection/Builders/BUILDER_TYPES";
import CORE_TYPES from "../../DependencyInjection/CoreTypes";
import type IPresentationBuilder from "../../Presentation/PresentationBuilder/IPresentationBuilder";
import type IPresentationDirector from "../../Presentation/PresentationBuilder/IPresentationDirector";
import ISpacePresenter from "../../Presentation/Babylon/Spaces/ISpacePresenter";
import IDropdownPresenter from "../../Presentation/React/SpaceDisplay/ElementsDropdown/IElementsDropdownPresenter";
import type INavigation from "../../Presentation/Babylon/Navigation/INavigation";
import IWorldNamePanelPresenter from "../../Presentation/React/SpaceDisplay/WorldNamePanel/IWorldNamePanelPresenter";
import IWorldGoalPanelPresenter from "~ReactComponents/SpaceDisplay/WorldGoalPanel/IWorldGoalPanelPresenter";
import { logger } from "src/Lib/Logger";
import WorldTO from "../../Application/DataTransferObjects/WorldTO";
import AbstractPort from "../AbstractPort/AbstractPort";
import IWorldAdapter from "./IWorldAdapter";

@injectable()
export default class WorldPort
  extends AbstractPort<IWorldAdapter>
  implements IWorldPort
{
  private spacePresenter: ISpacePresenter;
  private elementDropdownPresenter: IDropdownPresenter;
  private worldNamePanelPresenter: IWorldNamePanelPresenter;
  private worldGoalPanelPresenter: IWorldGoalPanelPresenter;

  constructor(
    @inject(CORE_TYPES.INavigation)
    private navigation: INavigation,
    @inject(BUILDER_TYPES.IPresentationDirector)
    private director: IPresentationDirector,
    @inject(BUILDER_TYPES.ISpaceBuilder)
    private spaceBuilder: IPresentationBuilder
  ) {
    super();
  }

  public presentWorld(worldTO: WorldTO): void {
    this.adapters.forEach((adapter) => adapter.onWorldLoaded(worldTO));

    this.director.build(this.spaceBuilder);
    this.spacePresenter = this.spaceBuilder.getPresenter();

    // TODO: use all the data from the learningWorldTO to create multiple rooms
    this.spacePresenter.presentSpace(worldTO.spaces[0]);

    // initialize navigation for the room
    // TODO: move this to a better location
    this.navigation.setupNavigation();

    // call UI presenter to present new data
    this.worldNamePanelPresenter.displayWorldName(worldTO.worldName);
    this.worldGoalPanelPresenter.displayWorldGoal(worldTO.worldGoal);
    this.elementDropdownPresenter.presentElements(worldTO.spaces[0].elements);
  }

  public registerElementDropdownPresenter(
    elementDropdownPresenter: IDropdownPresenter
  ): void {
    if (this.elementDropdownPresenter) {
      logger.warn("ElementDropdownPresenter is already registered");
    }
    this.elementDropdownPresenter = elementDropdownPresenter;
  }

  public registerWorldNamePanelPresenter(
    worldNamePanelPresenter: IWorldNamePanelPresenter
  ): void {
    if (this.worldNamePanelPresenter) {
      logger.warn("WorldNamePanelPresenter is already registered");
    }
    this.worldNamePanelPresenter = worldNamePanelPresenter;
  }
  public registerWorldGoalPanelPresenter(
    worldGoalPanelPresenter: IWorldGoalPanelPresenter
  ): void {
    if (this.worldGoalPanelPresenter) {
      logger.warn("WorldGoalPanelPresenter is already registered");
    }
    this.worldGoalPanelPresenter = worldGoalPanelPresenter;
  }
}
