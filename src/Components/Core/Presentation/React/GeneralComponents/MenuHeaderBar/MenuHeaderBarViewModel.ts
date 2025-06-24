import Observable from "src/Lib/Observable";
import { GradingStyle } from "src/Components/Core/Domain/Types/GradingStyle";

export default class MenuHeaderBarViewModel {
  currentWorldName: Observable<string> = new Observable<string>("");
  gradingStyle: Observable<GradingStyle | undefined> = new Observable<
    GradingStyle | undefined
  >(undefined);
}
