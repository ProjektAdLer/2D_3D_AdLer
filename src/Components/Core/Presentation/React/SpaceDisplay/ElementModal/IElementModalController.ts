import { ElementID } from "../../../../Domain/Types/EntityTypes";
export default interface IElementModalController {
  scoreElement(elementId: ElementID): Promise<void>;
}
