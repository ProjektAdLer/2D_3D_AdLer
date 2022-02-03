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

<<<<<<< HEAD
// This gets a Scene by a Name. This serves as an excample and can be ignord for now -PG
export const getSceneModuleWithName = (
  name?: string
): Promise<CreateSceneClass> => {
  return import("./scenes/Scene1").then((module: CreateSceneModule) => {
    return module.default;
  });
=======
// This gets a Scene by a Name. This serves as an exsample and can be ignord for now -PG
export const getSceneModuleWithName = (
	name?: string
): Promise<CreateSceneClass> => {
	return import('./scenes/Scene1').then((module: CreateSceneModule) => {
		return module.default;
	});
>>>>>>> withTemplate
};

// Sollten wir in zukunft szenen dynamisch rein laden, kann man sie heir auch aus einem
// als .babylon file importieren
export const getSceneModule = (): Promise<CreateSceneClass> => {
<<<<<<< HEAD
  return import("./scenes/Scene1").then((module: CreateSceneModule) => {
    return module.default;
  });
=======
	return import(
		'./components/2D3DCore/Presentation/MainScene/MainSceneView'
	).then((module: CreateSceneModule) => {
		return module.default;
	});
>>>>>>> withTemplate
};
