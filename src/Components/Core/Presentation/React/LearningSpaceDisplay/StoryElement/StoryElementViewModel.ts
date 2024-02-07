import { StoryElementType } from "src/Components/Core/Domain/Types/StoryElementType";
import Observable from "../../../../../../Lib/Observable";
import { LearningElementModel } from "src/Components/Core/Domain/LearningElementModels/LearningElementModelTypes";

export default class StoryElementViewModel {
  introTexts: Observable<string[]> = new Observable<string[]>();
  outroTexts: Observable<string[]> = new Observable<string[]>();
  isOpen: Observable<boolean> = new Observable<boolean>(false);
  pageId: Observable<number> = new Observable<number>(0);
  outroUnlocked: Observable<boolean> = new Observable<boolean>(false);
  outroJustNowUnlocked: Observable<boolean> = new Observable<boolean>(false);

  //MenuNavigation
  showOnlyIntro: Observable<boolean> = new Observable<boolean>(false);
  showOnlyOutro: Observable<boolean> = new Observable<boolean>(false);

  //Story Types
  type: Observable<StoryElementType[]> = new Observable<StoryElementType[]>([]);
  modelType: Observable<LearningElementModel[]> = new Observable<
    LearningElementModel[]
  >([]);

  isSplitStory: Observable<boolean> = new Observable<boolean>(false);
  pickedStory: Observable<StoryElementType> =
    new Observable<StoryElementType>();
}
