import ObservablePrimitive from "../../EntityManager/Observables/ObservablePrimitive";
import AbstractEntity from "../AbstractEntity";

export default class EImageLearningElement extends AbstractEntity {
  imageContextId = new ObservablePrimitive<number>();
  imageFileName = new ObservablePrimitive<string>();
}
