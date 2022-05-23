import ILearningRoomPort from "../../../Application/CalculateTotalRoomScore/ILearningRoomPort";
import IScorePanelPresenter from "../../React/ScorePanel/IScorePanelPresenter";
import IDoorPresenter from "../../Babylon/Door/IDoorPresenter";
import ILearningRoomPresenter from "../../Babylon/LearningRoom/ILearningRoomPresenter";
import CoreDIContainer from "../../../DependencyInjection/CoreDIContainer";
import IPresentationDirector from "../../PresentationBuilder/IPresentationDirector";
import BUILDER_TYPES from "../../../DependencyInjection/Builders/BUILDER_TYPES";
import IPresentationBuilder from "../../PresentationBuilder/IPresentationBuilder";
import { injectable } from "inversify";

@injectable()
export default class LearningRoomPort implements ILearningRoomPort {
  private scorePanelPresenter: IScorePanelPresenter;
  private learningRoomPresenters: ILearningRoomPresenter[] = [];
  private doorPresenter: IDoorPresenter;

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
      let builder = CoreDIContainer.get<IPresentationBuilder>(
        BUILDER_TYPES.IScorePanelBuilder
      );
      director.Builder = builder;
      director.build();
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
