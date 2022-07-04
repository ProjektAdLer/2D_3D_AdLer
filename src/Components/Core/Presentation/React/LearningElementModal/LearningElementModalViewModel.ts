import { LearningComponentID } from "./../../../Types/EnitityTypes";
import Observable from "../../../../../Lib/Observable";
import { LearningElementType } from "../../Babylon/LearningElement/Types/LearningElementTypes";
import AbstractLearningElement from "../../../Domain/Entities/SpecificLearningElements/AbstractLearningElement";

export default class LearningElementModalViewModel<
  T extends AbstractLearningElement = AbstractLearningElement
> {
  id: Observable<number> = new Observable<LearningComponentID>();
  isOpen: Observable<boolean> = new Observable<boolean>(false);
  public learningElementData = new Observable<T>();
}
