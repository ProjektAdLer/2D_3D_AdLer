import { LearningSpaceThemeType } from "src/Components/Core/Domain/Types/LearningSpaceThemeTypes";
import Observable from "src/Lib/Observable";

export default class NarrativeFrameworkIntroViewModel {
  isOpenInLoadingscreen: Observable<boolean> = new Observable<boolean>();
  isOpenInModal: Observable<boolean> = new Observable<boolean>();
  isModal: Observable<boolean> = new Observable<boolean>();

  introText?: string;
  theme: LearningSpaceThemeType;
}
