import ObservablePrimitive from "../../../BusinessLogic/EntityManager/Observables/ObservablePrimitive";
import AbstractEntity from "../../API/AbstractEntity";

export default class LearningElement extends AbstractEntity {
  name = new ObservablePrimitive<string>("");
  type = new ObservablePrimitive<string>("");
  concreteLearningElementId = new ObservablePrimitive<string>("");
}
