import { injectable } from "inversify";
import ObservablePrimitive from "../../Domain/EntityManager/Observables/ObservablePrimitive";

@injectable()
export default class LearningWorldViewModel {
  public id: string;
  public worldName: string;

  public test = new ObservablePrimitive<string>("");
}
