import { LearningSpaceThemeType } from "src/Components/Core/Domain/Types/LearningSpaceThemeTypes";
import Observable from "src/Lib/Observable";

export default class LevelUpModalViewModel {
  isOpen: Observable<boolean> = new Observable<boolean>(false);
  level: number = 0;
  timeToClose: number = 2500;
  worldTheme: LearningSpaceThemeType = LearningSpaceThemeType.CampusKE;
}
