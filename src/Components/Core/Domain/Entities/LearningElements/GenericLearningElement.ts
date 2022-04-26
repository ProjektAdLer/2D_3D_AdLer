import { LearningElementTypeSymbols } from "./../../../Presentation/LearningElement/Types/LearningElementTypes";
import ObservablePrimitive from "../../EntityManager/Observables/ObservablePrimitive";
import AbstractEntity from "../AbstractEntity";

export default class EGenericLearningElement extends AbstractEntity {
  learningElementType = new ObservablePrimitive<Symbol>(
    LearningElementTypeSymbols.h5p
  );
  /**
   * H5PLearningElement
   */
  concreteLearningElementId = new ObservablePrimitive<string>("");
  learningElementTitle = new ObservablePrimitive<string>(
    "TestTitle aus Entity"
  );
}
