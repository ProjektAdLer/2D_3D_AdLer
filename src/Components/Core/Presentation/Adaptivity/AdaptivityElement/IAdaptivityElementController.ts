import { ComponentID } from "src/Components/Core/Domain/Types/EntityTypes";
import {
  AdaptivityHint,
  AdaptivityQuestion,
  AdaptivityTask,
} from "./AdaptivityElementViewModel";

export default interface IAdaptivityElementController {
  closeModal(): void;
  selectTask(selectedTask: AdaptivityTask): void;
  selectQuestion(selectedQuestion: AdaptivityQuestion): void;
  selectHint(
    selectedHint: AdaptivityHint,
    associatedQuestion: AdaptivityQuestion,
  ): void;
  submitSelection(): void;
  closeFeedback(): void;
  closeAnswerSelection(): void;
  closeHint(): void;
  back(): void;
  showFooterTooltip(): void;
  hideFooterTooltip(): void;
  loadExternalContentReference(
    elementID: ComponentID,
    associatedQuestion: AdaptivityQuestion,
  ): void;
  reset(): void;
  setModalVisibility(isOpen: boolean): void;
}
