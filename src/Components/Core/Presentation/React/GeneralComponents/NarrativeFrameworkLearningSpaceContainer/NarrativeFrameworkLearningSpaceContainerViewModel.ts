import { LearningSpaceThemeType } from "src/Components/Core/Domain/Types/LearningSpaceThemeTypes";
import Observable from "src/Lib/Observable";

export default class NarrativeFrameworkLearningSpaceContainerViewModel {
  isOpen: Observable<boolean> = new Observable<boolean>();
}
