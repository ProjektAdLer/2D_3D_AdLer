import { ComponentID } from "../../../../Domain/Types/EntityTypes";
export default interface IElementModalController {
  scoreElement(elementID: ComponentID, courseID: ComponentID): Promise<void>;
  h5pEventCalled(event: any): Promise<void>;
}
