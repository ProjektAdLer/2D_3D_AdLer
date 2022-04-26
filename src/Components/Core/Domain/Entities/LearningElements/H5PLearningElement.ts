import ObservablePrimitive from "../../EntityManager/Observables/ObservablePrimitive";
import AbstractEntity from "../AbstractEntity";

export default class EH5PLearningElement extends AbstractEntity {
  h5PcontextId = new ObservablePrimitive<number>();
  h5PFileName = new ObservablePrimitive<string>();
}
