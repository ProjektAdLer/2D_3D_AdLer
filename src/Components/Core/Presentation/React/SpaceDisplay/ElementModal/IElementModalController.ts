import { ElementID } from "../../../../Domain/Types/EntityTypes";
export default interface IElementModalController {
  scoreElement(elementId: ElementID, courseId: ElementID): Promise<void>;
  h5pEventCalled(event: any): Promise<void>;
}
