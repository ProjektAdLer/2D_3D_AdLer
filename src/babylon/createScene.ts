type Engine = import("@babylonjs/core/Engines/engine").Engine;
type Scene = import("@babylonjs/core/scene").Scene;

export interface CreateSceneClass {
	createScene: (engine: Engine, canvas: HTMLCanvasElement) => Promise<Scene>;
	preTasks?: Promise<unknown>[];
}

export interface CreateSceneModule {
	// "default" ist ein reserved Keyword in Typescript, damit greifen wir
	// auf den default export der klasse zu diese ist dann unsere Szene
	default: CreateSceneClass;
}

// This gets a Scene by a path. This serves as an example and can be ignord for now -PG
export const getSceneModuleWithName = async (
	scenePath: string
): Promise<CreateSceneClass> => {
		return import(scenePath).catch(e => Promise.reject("Scene at path " + scenePath + " not found!") ).then((module: CreateSceneModule) => {
			return module.default;
		});
};

// Sollten wir in zukunft szenen dynamisch rein laden, kann man sie heir auch aus einem
// als .babylon file importieren
export const getSceneModule = (): Promise<CreateSceneClass> => {
	return import(
		'./components/2D3DCore/Presentation/MainScene/MainSceneView'
	).then((module: CreateSceneModule) => {
		return module.default;
	});
};
