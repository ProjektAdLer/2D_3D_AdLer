import ObservablePrimitive from "../../../BusinessLogic/EntityManager/Observables/ObservablePrimitive";
import AbstractEntity from "../../API/AbstractEntity";

export default class EGenericLearningElement extends AbstractEntity {
  title = new ObservablePrimitive<string>("TestTitle aus Entity");
  /**
   * H5PLearningElement
   */
  concreteLearningElementId = new ObservablePrimitive<string>("");
}
