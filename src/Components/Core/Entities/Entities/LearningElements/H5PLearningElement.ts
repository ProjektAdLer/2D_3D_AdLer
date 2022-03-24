import ObservablePrimitive from "../../../BusinessLogic/EntityManager/Observables/ObservablePrimitive";
import AbstractEntity from "../../API/AbstractEntity";

export default class EH5PLearningElement extends AbstractEntity {
  h5PcontextId = new ObservablePrimitive<number>();
  h5PFileName = new ObservablePrimitive<string>();
}
