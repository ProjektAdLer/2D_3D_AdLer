export default interface IAvatarEditorPreviewController {
  onTurnLeftUp(): void;
  onTurnLeftDown(): void;

  onTurnRightDown(): void;
  onTurnRightUp(): void;

  onZoomInDown(): void;
  onZoomInUp(): void;

  onZoomOutDown(): void;
  onZoomOutUp(): void;
}
