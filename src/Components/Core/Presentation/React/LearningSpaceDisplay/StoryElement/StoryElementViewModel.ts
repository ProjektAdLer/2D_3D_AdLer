import { StoryElementType } from "src/Components/Core/Domain/Types/StoryElementType";
import Observable from "../../../../../../Lib/Observable";
import { LearningElementModel } from "src/Components/Core/Domain/LearningElementModels/LearningElementModelTypes";

export default class StoryElementViewModel {
  isOpen: Observable<boolean> = new Observable<boolean>(false);

  //Story Data
  introTexts: Observable<string[]> = new Observable<string[]>();
  outroTexts: Observable<string[]> = new Observable<string[]>();
  introModelType: Observable<LearningElementModel> =
    new Observable<LearningElementModel>();
  outroModelType: Observable<LearningElementModel> =
    new Observable<LearningElementModel>();

  storyTypeToDisplay: Observable<StoryElementType> =
    new Observable<StoryElementType>(StoryElementType.None);

  isOutroUnlocked: Observable<boolean> = new Observable<boolean>(false);
  isOutroCutsceneRunning: Observable<boolean> = new Observable<boolean>(false);
  isIntroCutsceneRunning: Observable<boolean> = new Observable<boolean>(false);
}
