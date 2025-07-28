import IAccessibilityControls from "../IAccessibilityControls";
import { StoryElementType } from "src/Components/Core/Domain/Types/StoryElementType";

export default interface IStoryNPCController extends IAccessibilityControls {
  picked(): void;
  pointerOver(): void;
  pointerOut(): void;
  handleNPCExit(storyType: StoryElementType): Promise<void>;
}
