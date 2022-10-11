import ISpacePort from "./ISpacePort";
import IScorePanelPresenter from "../../Presentation/React/SpaceDisplay/ScorePanel/IScorePanelPresenter";
import ISpacePresenter from "../../Presentation/Babylon/Spaces/ISpacePresenter";
import { injectable } from "inversify";
import { logger } from "src/Lib/Logger";
import SpaceTO from "../../Application/DataTransferObjects/SpaceTO";
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
    this.adapters.forEach((adapter) => {
      adapter.onSpaceDataLoaded(spaceTO);
    });
  }

  onScoreChanged(
    score: number,
    requiredScore: number,
    maxScore: number,
    spaceId: number
  ): void {
    this.adapters.forEach((adapter) => {
      adapter.onScoreChanged(score, requiredScore, maxScore, spaceId);
    });
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
}
