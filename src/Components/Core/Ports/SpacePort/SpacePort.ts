import ISpacePort from "./ISpacePort";
import IScorePanelPresenter from "../../Presentation/React/SpaceDisplay/ScorePanel/IScorePanelPresenter";
import ISpacePresenter from "../../Presentation/Babylon/Spaces/ISpacePresenter";
import { injectable } from "inversify";
import { logger } from "src/Lib/Logger";
import SpaceTO from "../../Application/DataTransportObjects/SpaceTO";
import AbstractPort from "../AbstractPort/AbstractPort";
import ISpaceAdapter from "./ISpaceAdapter";

@injectable()
export default class SpacePort
  extends AbstractPort<ISpaceAdapter>
  implements ISpacePort
{
  private scorePanelPresenter: IScorePanelPresenter;
  private spacePresenters: ISpacePresenter[] = [];

  onSpaceDataLoaded(spaceTO: SpaceTO): void {
    this.adapters.forEach((adapter) => adapter.onSpaceDataLoaded(spaceTO));
  }

  presentNewScore(score: number, completed: boolean, spaceId: number): void {
    if (!this.scorePanelPresenter) {
      throw new Error("ScorePanelPresenter is not registered");
    }
    if (this.spacePresenters.length === 0) {
      throw new Error("No SpacePresenter is registered");
    }

    this.scorePanelPresenter.presentScore(score);

    if (completed) {
      this.spacePresenters
        .find((presenter) => presenter.SpaceId === spaceId)
        ?.openDoor();
    }
  }

  registerSpacePresenter(spacePresenter: ISpacePresenter): void {
    if (spacePresenter === undefined) {
      throw new Error("Passed spacePresenter is undefined");
    }

    if (
      this.spacePresenters.find((lrp) => lrp === spacePresenter) === undefined
    ) {
      this.spacePresenters.push(spacePresenter);
    } else {
      logger.warn("SpacePresenter is already registered");
    }
  }

  registerScorePanelPresenter(
    newScorePanelPresenter: IScorePanelPresenter
  ): void {
    if (this.scorePanelPresenter) {
      logger.warn("ScorePanelPresenter is already registered");
    }

    this.scorePanelPresenter = newScorePanelPresenter;
  }
}
