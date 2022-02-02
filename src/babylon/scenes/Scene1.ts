import {
  MeshBuilder,
  HemisphericLight,
  Vector3,
  Scene,
  Engine,
  FreeCamera,
} from "@babylonjs/core";
import { CreateSceneClass } from "../createScene";

// required imports
import "@babylonjs/inspector";
import "@babylonjs/loaders";

export class LukasScene implements CreateSceneClass {
  // Mit Pretasks können wir dinge leredigen, welche asyncron ablaufen und vor
  // derm Rendern der Szene pasieren sollen
  // in diesem Fall wird das Moodle System initialisiert, es können
  // aber auch z.B. Modelle geladen werden
  preTasks = [];

  createScene = async (
    engine: Engine,
    canvas: HTMLCanvasElement
  ): Promise<Scene> => {
    // Wichtig: Hier keinen Code reinschreiben, der die Szene erstellt, sondern nur die jeweilige Klasse erstellen
    // und evtl positionieren oder anderweitig initialisieren / manipulieren - PG
    const scene = new Scene(engine);

    var camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);

    camera.setTarget(Vector3.Zero());

    camera.attachControl(canvas, true);

    new HemisphericLight("light", new Vector3(0, 1, 0), scene);

    const box = MeshBuilder.CreateBox("box", { size: 2 }, scene);

    box.position.y = 1;

    MeshBuilder.CreateGround("ground", { width: 6, height: 6 }, scene);

    return scene;
  };
}

export default new LukasScene();
