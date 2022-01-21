import { Color3, Observable } from '@babylonjs/core';

export class SBWViewModel extends Observable<Color3> {
	private _correctColor = new Color3(0, 1, 0);
	private _wrongColor = new Color3(1, 0, 0);
	private _currentColor;

	constructor() {
		super();
		this._currentColor = this._wrongColor;
	}

	public setColor(correct: boolean): void {
		this._currentColor = correct ? this._correctColor : this._wrongColor;
		this.notifyObservers(this._currentColor);
	}
}
