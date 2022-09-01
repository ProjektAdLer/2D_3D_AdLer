import ILearningRoomPort from "./ILearningRoomPort";
import IScorePanelPresenter from "../../Presentation/React/ScorePanel/IScorePanelPresenter";
import ILearningRoomPresenter from "../../Presentation/Babylon/LearningRoom/ILearningRoomPresenter";
import { injectable } from "inversify";
import { logger } from "src/Lib/Logger";

@injectable()
export default class LearningRoomPort implements ILearningRoomPort {
  private scorePanelPresenter: IScorePanelPresenter;
  private learningRoomPresenters: ILearningRoomPresenter[] = [];

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

  registerScorePanelPresenter(scorePanelPresenter: IScorePanelPresenter): void {
    if (scorePanelPresenter) {
      logger.warn("ScorePanelPresenter is already registered");
    }

    this.scorePanelPresenter = scorePanelPresenter;
  }
}
