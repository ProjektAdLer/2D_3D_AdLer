import { injectable } from "inversify";
import LearningRoomDetailPresenter from "./LearningRoomDetailPresenter";
import ILearningRoomDetailPresenter from "./ILearningRoomDetailPresenter";
import LearningRoomDetailViewModel from "./LearningRoomDetailViewModel";
import PresentationBuilder from "../../../PresentationBuilder/PresentationBuilder";

@injectable()
export default class LearningRoomDetailBuilder extends PresentationBuilder<
  LearningRoomDetailViewModel,
  undefined,
  undefined,
  ILearningRoomDetailPresenter
> {
  constructor() {
    super(
      LearningRoomDetailViewModel,
      undefined,
      undefined,
      LearningRoomDetailPresenter
    );
  }
}
