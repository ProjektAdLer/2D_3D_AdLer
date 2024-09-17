import { ComponentID } from "src/Components/Core/Domain/Types/EntityTypes";
import ILearningWorldAdapter from "src/Components/Core/Application/Ports/LearningWorldPort/ILearningWorldAdapter";
import IAvatarFokusable from "../Avatar/AvatarFocusSelection/IAvatarFocusable";

export default interface ILearningElementPresenter
  extends ILearningWorldAdapter,
    IAvatarFokusable {
  onLearningElementScored(hasScored: boolean, elementID: ComponentID): void;
}
