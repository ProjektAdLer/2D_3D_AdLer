import IAccessibilityControls from "../IAccessibilityControls";

export default interface IDoorController extends IAccessibilityControls {
  picked(): void;
  pointerOver(): void;
  pointerOut(): void;
}
