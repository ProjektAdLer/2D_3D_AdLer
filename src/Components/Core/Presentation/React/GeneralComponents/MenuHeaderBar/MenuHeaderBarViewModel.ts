import Observable from "src/Lib/Observable";
import { GradingStyle } from "src/Components/Core/Domain/Types/GradingStyle";

export default class MenuHeaderBarViewModel {
  public currentWorldName: Observable<string> = new Observable<string>();
  public gradingStyle: Observable<GradingStyle> =
    new Observable<GradingStyle>();
}
