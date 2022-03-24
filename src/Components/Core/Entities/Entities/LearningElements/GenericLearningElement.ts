import ObservablePrimitive from "../../../BusinessLogic/EntityManager/Observables/ObservablePrimitive";
import AbstractEntity from "../../API/AbstractEntity";

export default class EGenericLearningElement extends AbstractEntity {
  learningElementType = new ObservablePrimitive<string>();
  /**
   * H5PLearningElement
   */
  concreteLearningElementId = new ObservablePrimitive<string>("");
  learningElementTitle = new ObservablePrimitive<string>(
    "TestTitle aus Entity"
  );
}
