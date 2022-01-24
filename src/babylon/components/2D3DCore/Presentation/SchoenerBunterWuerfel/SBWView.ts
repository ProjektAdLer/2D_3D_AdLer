import {
	Color3,
	Scene,
	StandardMaterial,
	VertexData,
	ActionManager,
	ExecuteCodeAction,
} from '@babylonjs/core';
import { inject } from 'inversify';
import GameObject from '../../../abstract/GameObject';
import { BusinessLogic } from '../../BusinessLogic/API/BusinessLogic';
import CoreDIContainer from '../../DependencyInjection/CoreDIContainer';
import { PresentationLogic } from '../API/PresentationLogic';
import { SBWPresenter } from './SBWPresenter';

export class SBWView extends GameObject {
	private _presenter: SBWPresenter;

	constructor(name: string, scene: Scene) {
		super(name, scene);

		console.log('SBW constructor');

		this._presenter = CoreDIContainer.resolve<SBWPresenter>(SBWPresenter);

		VertexData.CreateBox({ height: 3, width: 3, depth: 3 }).applyToMesh(this);

		const SBWMaterial = new StandardMaterial('SBWMaterial', scene);
		SBWMaterial.diffuseColor = new Color3(1, 0, 0);
		this.material = SBWMaterial;

		this.actionManager = new ActionManager(scene);
		this.actionManager.registerAction(
			new ExecuteCodeAction(ActionManager.OnPickTrigger, () => {
				this._presenter.checkInput(true);
			})
		);

		this._presenter.getViewModel().add(this.changeColor);
	}

	private changeColor = (newColor: Color3): void => {
		(this.material as StandardMaterial).diffuseColor = newColor;
	};
}
