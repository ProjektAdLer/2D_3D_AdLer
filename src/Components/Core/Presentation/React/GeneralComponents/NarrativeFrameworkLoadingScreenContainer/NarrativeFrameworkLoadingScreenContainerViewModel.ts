import { LearningSpaceThemeType } from "src/Components/Core/Domain/Types/LearningSpaceThemeTypes";
import Observable from "src/Lib/Observable";

export default class NarrativeFrameworkLoadingScreenContainerViewModel {
  isShowingContent: Observable<boolean> = new Observable<boolean>();
}
