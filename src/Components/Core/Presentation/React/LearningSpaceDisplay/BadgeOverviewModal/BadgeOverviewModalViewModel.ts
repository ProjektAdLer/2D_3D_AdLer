import { ThemeType } from "src/Components/Core/Domain/Types/ThemeTypes";
import Observable from "src/Lib/Observable";

export default class BadgeOverviewModalViewModel {
  isOpen: Observable<boolean> = new Observable<boolean>(false);

  currentLevel: Observable<number> = new Observable<number>();

  worldTheme: ThemeType = ThemeType.CampusKE;
  language: string = "de";
}
