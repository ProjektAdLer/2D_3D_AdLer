import { injectable } from "inversify";
import ObservablePrimitive from "../../Domain/EntityManager/Observables/ObservablePrimitive";

@injectable()
export default class LearningElementPanelViewModel {
  public text: ObservablePrimitive<string> = new ObservablePrimitive<string>(
    "LE Panel"
  );
}
