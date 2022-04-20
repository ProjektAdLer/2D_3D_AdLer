import { injectable } from "inversify";
import ObservablePrimitive from "../../BusinessLogic/EntityManager/Observables/ObservablePrimitive";
import IViewModel from "../ViewModelProvider/IViewModel";

@injectable()
export default class LearningElementPanelViewModel implements IViewModel {
  public text: ObservablePrimitive<string> = new ObservablePrimitive<string>(
    "LE Panel"
  );
}
