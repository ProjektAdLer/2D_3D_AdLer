import {
	ActionManager,
	ExecuteCodeAction,
	Observable,
	Scene,
	StandardMaterial,
	VertexData,
} from '@babylonjs/core';
import GameObject from '../../../Abstract/GameObject';
import { SBWViewModel } from './SBWViewModel';
import { ISBWView } from './ISBWView';

export class SBWView extends GameObject implements ISBWView {
	private onPickTrigger: Observable<void>;
	private viewModel: SBWViewModel;

	constructor(viewModel: SBWViewModel, name: string, scene: Scene) {
		super(name, scene);

		this.onPickTrigger = new Observable<void>();
		this.viewModel = viewModel;

		this.setupGameObject();

		this.setupActions();
	}

	public addOnPickTriggerObserver(callback: () => void): void {
		this.onPickTrigger.add(callback);
	}

	public updateColor = (): void => {
		(this.material as StandardMaterial).diffuseColor =
			this.viewModel.getCurrentColor();
	};

	private setupGameObject = (): void => {
		VertexData.CreateBox({ height: 3, width: 3, depth: 3 }).applyToMesh(this);

		const SBWMaterial = new StandardMaterial('SBWMaterial', this.scene);
		SBWMaterial.diffuseColor = this.viewModel.getCurrentColor();
		this.material = SBWMaterial;
	};

	private setupActions = (): void => {
		this.actionManager = new ActionManager(this.scene);
		this.actionManager.registerAction(
			new ExecuteCodeAction(ActionManager.OnPickTrigger, () => {
				this.onPickTrigger.notifyObservers();
			})
		);
	};
}
