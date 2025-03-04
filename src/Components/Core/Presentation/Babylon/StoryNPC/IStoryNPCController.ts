import IAccessibilityControls from "../IAccessibilityControls";

export default interface IStoryNPCController extends IAccessibilityControls {
  picked(): void;
  pointerOver(): void;
  pointerOut(): void;
}
