import { ComponentID } from "src/Components/Core/Domain/Types/EntityTypes";
import Observable from "../../../../../../../Lib/Observable";

export interface ScoreInfo {
  currentScore: number;
  requiredScore: number;
  maxScore: number;
}

export default class LearningSpaceScorePanelViewModel {
  currentSpaceID: Observable<ComponentID> = new Observable();

  scoreInfo: Observable<ScoreInfo> = new Observable({
    currentScore: 0,
    requiredScore: 0,
    maxScore: 0,
  });
}
