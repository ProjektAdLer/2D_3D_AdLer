import { injectable } from "inversify";
import ObservablePrimitive from "../../Domain/EntityManager/Observables/ObservablePrimitive";

@injectable()
export default class LearningWorldViewModel {
  public id: string;

  public worldName = new ObservablePrimitive<string>("");
  public worldNameLoading = new ObservablePrimitive<boolean>(false);
}
