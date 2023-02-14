import { ComponentID } from "../../../../Domain/Types/EntityTypes";
export default interface IElementModalController {
  scoreElement(elementId: ComponentID, courseId: ComponentID): Promise<void>;
  h5pEventCalled(event: any): Promise<void>;
}
