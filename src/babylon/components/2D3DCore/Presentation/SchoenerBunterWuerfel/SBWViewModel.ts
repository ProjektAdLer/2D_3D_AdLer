import { Color3, Observable } from '@babylonjs/core';
import { injectable } from 'inversify';

@injectable()
export class SBWViewModel {
	private correctColor = new Color3(0, 1, 0);
	private wrongColor = new Color3(1, 0, 0);
	private currentColor;
	private colorChangeObservable: Observable<Color3>;

	constructor() {
		this.currentColor = this.wrongColor;
		this.colorChangeObservable = new Observable<Color3>();
	}

	public addColorChangeObserver(callback: (eventData: Color3) => void): void {
		this.colorChangeObservable.add(callback);
	}

	public setColor(correct: boolean): void {
		this.currentColor = correct ? this.correctColor : this.wrongColor;
		this.colorChangeObservable.notifyObservers(this.currentColor);
	}
}
