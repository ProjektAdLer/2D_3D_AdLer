export interface ISBWView {
	addOnPickTriggerObserver(callback: () => void): void;
	updateColor(): void;
}
