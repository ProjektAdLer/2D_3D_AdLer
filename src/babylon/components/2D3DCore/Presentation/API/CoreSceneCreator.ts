import { Engine, FreeCamera, Scene, Vector3, HemisphericLight, MeshBuilder, ActionManager } from '@babylonjs/core';
import { CreateSceneClass } from '../../../../createScene';

class CoreSceneScreator implements CreateSceneClass {
  preTasks?: Promise<unknown>[] | undefined;

  createScene = async (engine: Engine, canvas: HTMLCanvasElement): Promise<Scene> => {
    // Wichtig: Hier keinen Code reinschreiben, der die Szene erstellt, sondern nur die jeweilige Klasse erstellen
    // und evtl positionieren oder anderweitig initialisieren / manipulieren - PG
    const scene = new Scene(engine);

    var camera = new FreeCamera('camera1', new Vector3(0, 5, -10), scene);

    camera.setTarget(Vector3.Zero());

    camera.attachControl(canvas, true);

    new HemisphericLight('light', new Vector3(0, 1, 0), scene);

    const box = MeshBuilder.CreateBox('box', { size: 2 }, scene);

    box.position.y = 1;

    const test = MeshBuilder.CreateGround('ground', { width: 6, height: 6 }, scene);

    // test.actionManager = new ActionManager(scene);

    // test.actionManager.registerAction(new ActionManager.OnPickTrigger());

    document.addEventListener('click', (evt) => {
      test.scaling.x = 10;
    });

    return scene;
  };
}

export default new CoreSceneScreator();
