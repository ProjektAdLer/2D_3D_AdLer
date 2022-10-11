import { injectable } from "inversify";
import IWorldPort from "./IWorldPort";
import IWorldNamePanelPresenter from "../../Presentation/React/SpaceDisplay/WorldNamePanel/IWorldNamePanelPresenter";
import { logger } from "src/Lib/Logger";
import WorldTO from "../../Application/DataTransferObjects/WorldTO";
import AbstractPort from "../AbstractPort/AbstractPort";
import IWorldAdapter from "./IWorldAdapter";

@injectable()
export default class WorldPort
  extends AbstractPort<IWorldAdapter>
  implements IWorldPort
{
  private worldNamePanelPresenter: IWorldNamePanelPresenter;

  public presentWorld(worldTO: WorldTO): void {
    this.adapters.forEach((adapter) => adapter.onWorldLoaded(worldTO));

    // call UI presenter to present new data
    this.worldNamePanelPresenter.displayWorldName(worldTO.worldName);
  }

  public registerWorldNamePanelPresenter(
    worldNamePanelPresenter: IWorldNamePanelPresenter
  ): void {
    if (this.worldNamePanelPresenter) {
      logger.warn("WorldNamePanelPresenter is already registered");
    }
    this.worldNamePanelPresenter = worldNamePanelPresenter;
  }
}
