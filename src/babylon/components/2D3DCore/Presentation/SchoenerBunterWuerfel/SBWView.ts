import { Color3, Scene, StandardMaterial, VertexData, ActionManager, ExecuteCodeAction } from '@babylonjs/core';
import GameObject from '../../../abstract/GameObject';

export class SBWView extends GameObject {
  constructor(name: string, scene: Scene) {
    super(name, scene);

    VertexData.CreateBox({ height: 3, width: 3, depth: 3 }).applyToMesh(this);

    const SBWMaterial = new StandardMaterial('SBWMaterial', scene);

    SBWMaterial.diffuseColor = new Color3(1, 0, 0);

    this.material = SBWMaterial;

    this.actionManager = new ActionManager(scene);

    this.actionManager.registerAction(
      new ExecuteCodeAction(ActionManager.OnPickTrigger, () => {
        console.log('bla');
      })
    );
  }
}
