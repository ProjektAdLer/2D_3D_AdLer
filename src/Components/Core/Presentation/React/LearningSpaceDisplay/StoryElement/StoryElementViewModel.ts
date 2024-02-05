import { StoryElementType } from "src/Components/Core/Domain/Types/StoryElementType";
import Observable from "../../../../../../Lib/Observable";
import { LearningElementModel } from "src/Components/Core/Domain/LearningElementModels/LearningElementModelTypes";

export default class StoryElementViewModel {
  introTexts: Observable<string[] | null> = new Observable<string[] | null>(
    null
  );
  outroTexts: Observable<string[] | null> = new Observable<string[] | null>(
    null
  );
  isOpen: Observable<boolean> = new Observable<boolean>(false);
  pageId: Observable<number> = new Observable<number>(0);
  outroUnlocked: Observable<boolean> = new Observable<boolean>(false);
  outroJustNowUnlocked: Observable<boolean> = new Observable<boolean>(false);

  //MenuNavigation
  showOnlyIntro: Observable<boolean> = new Observable<boolean>(false);
  showOnlyOutro: Observable<boolean> = new Observable<boolean>(false);

  //Story Types
  type: Observable<StoryElementType[]> = new Observable<StoryElementType[]>();
  modelType: Observable<LearningElementModel[]> = new Observable<
    LearningElementModel[]
  >();
  numberOfStories: Observable<number> = new Observable<number>();
}
