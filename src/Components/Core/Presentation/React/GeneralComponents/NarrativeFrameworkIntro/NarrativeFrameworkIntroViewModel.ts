import { LearningSpaceThemeType } from "src/Components/Core/Domain/Types/LearningSpaceThemeTypes";
import Observable from "src/Lib/Observable";

export default class NarrativeFrameworkIntroViewModel {
  isOpen: Observable<boolean> = new Observable<boolean>(true);

  introText?: string;
  outroText?: string;
  theme: LearningSpaceThemeType;
}
