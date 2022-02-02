import { Mesh, Scene } from '@babylonjs/core';

export default abstract class GameObject extends Mesh {
	constructor(name: string, public scene: Scene) {
		super(name, scene);
	}
}
