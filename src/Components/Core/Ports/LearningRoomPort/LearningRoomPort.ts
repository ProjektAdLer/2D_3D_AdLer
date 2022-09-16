import ILearningRoomPort from "./ILearningRoomPort";
import IScorePanelPresenter from "../../Presentation/React/LearningRoomDisplay/ScorePanel/IScorePanelPresenter";
import ILearningRoomPresenter from "../../Presentation/Babylon/LearningRoom/ILearningRoomPresenter";
import { injectable } from "inversify";
import { logger } from "src/Lib/Logger";
import LearningRoomTO from "../../Application/DataTransportObjects/LearningRoomTO";
import AbstractPort from "../AbstractPort/AbstractPort";
import IRoomAdapter from "./IRoomAdapter";

@injectable()
export default class LearningRoomPort
  extends AbstractPort<IRoomAdapter>
  implements ILearningRoomPort
{
  private scorePanelPresenter: IScorePanelPresenter;
  private learningRoomPresenters: ILearningRoomPresenter[] = [];

  onRoomDataLoaded(learningRoomTO: LearningRoomTO): void {
    this.adapters.forEach((adapter) =>
      adapter.onRoomDataLoaded(learningRoomTO)
    );
  }

  presentNewScore(score: number, completed: boolean, roomId: number): void {
    if (!this.scorePanelPresenter) {
      throw new Error("ScorePanelPresenter is not registered");
    }
    if (this.learningRoomPresenters.length === 0) {
      throw new Error("No LearningRoomPresenter is registered");
    }

    this.scorePanelPresenter.presentScore(score);

    if (completed) {
      this.learningRoomPresenters
        .find((presenter) => presenter.LearningRoomId === roomId)
        ?.openDoor();
    }
  }

  registerLearningRoomPresenter(
    learningRoomPresenter: ILearningRoomPresenter
  ): void {
    if (learningRoomPresenter === undefined) {
      throw new Error("Passed learningRoomPresenter is undefined");
    }

    if (
      this.learningRoomPresenters.find(
        (lrp) => lrp === learningRoomPresenter
      ) === undefined
    ) {
      this.learningRoomPresenters.push(learningRoomPresenter);
    } else {
      logger.warn("LearningRoomPresenter is already registered");
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
