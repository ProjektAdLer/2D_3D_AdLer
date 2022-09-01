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

  presentNewScore(score: number, completed: boolean, roomId: number): void {
    // create score panel the first time a score is displayed
    if (!this.scorePanelPresenter) {
      let director = CoreDIContainer.get<IPresentationDirector>(
        BUILDER_TYPES.IPresentationDirector
      );
      const builder = CoreDIContainer.get<IPresentationBuilder>(
        BUILDER_TYPES.IScorePanelBuilder
      );
      director.build(builder);
      this.scorePanelPresenter = builder.getPresenter();
    }

    this.scorePanelPresenter.presentScore(score);

    if (completed) {
      this.learningRoomPresenters
        .find((presenter) => presenter.LearningRoomId === roomId)
        ?.openDoor();
    }
  }
}
