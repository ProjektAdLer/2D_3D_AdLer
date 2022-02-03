import { Color3 } from '@babylonjs/core';
import { injectable } from 'inversify';

@injectable()
export class SBWViewModel {
	private correctColor = new Color3(0, 1, 0);
	private wrongColor = new Color3(1, 0, 0);
	private state: boolean = false;

	// constructor() {}

	public getCurrentColor = (): Color3 => {
		return this.state ? this.correctColor : this.wrongColor;
	};

	public getCorrectColor = (): Color3 => {
		return this.correctColor;
	};

	public getWrongColor = (): Color3 => {
		return this.wrongColor;
	};

	public setState = (newState: boolean): void => {
		this.state = newState;
	};
}
