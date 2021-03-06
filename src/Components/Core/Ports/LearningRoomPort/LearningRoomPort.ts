import ILearningRoomPort from "./ILearningRoomPort";
import IScorePanelPresenter from "../../Presentation/React/ScorePanel/IScorePanelPresenter";
import ILearningRoomPresenter from "../../Presentation/Babylon/LearningRoom/ILearningRoomPresenter";
import CoreDIContainer from "../../DependencyInjection/CoreDIContainer";
import IPresentationDirector from "../../Presentation/PresentationBuilder/IPresentationDirector";
import BUILDER_TYPES from "../../DependencyInjection/Builders/BUILDER_TYPES";
import IPresentationBuilder from "../../Presentation/PresentationBuilder/IPresentationBuilder";
import { injectable } from "inversify";

@injectable()
export default class LearningRoomPort implements ILearningRoomPort {
  private scorePanelPresenter: IScorePanelPresenter;
  private learningRoomPresenters: ILearningRoomPresenter[] = [];

  addLearningRoomPresenter(
    learningRoomPresenter: ILearningRoomPresenter
  ): void {
    if (!learningRoomPresenter) {
      throw new Error("LearningRoomPresenter is not defined");
    }

    if (
      this.learningRoomPresenters.find(
        (lrp) => lrp === learningRoomPresenter
      ) === undefined
    ) {
      this.learningRoomPresenters.push(learningRoomPresenter);
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
