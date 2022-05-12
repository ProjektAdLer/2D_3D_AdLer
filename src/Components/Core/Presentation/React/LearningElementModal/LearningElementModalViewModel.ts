import { LearningComponentID } from "./../../../Types/EnitityTypes";
import Observable from "../../../../../Lib/Observable";
import { LearningElementType } from "../../Babylon/LearningElement/Types/LearningElementTypes";

export default class LearningElementModalViewModel {
  id: Observable<number> = new Observable<LearningComponentID>();
  isOpen: Observable<boolean> = new Observable<boolean>(false);
  type: Observable<LearningElementType> = new Observable<LearningElementType>();
}
