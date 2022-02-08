import {
  Engine,
  FreeCamera,
  Scene,
  Vector3,
  HemisphericLight,
  GroundMesh,
  SceneLoader,
  MeshBuilder,
  AnimationGroup,
  Animation,
} from "@babylonjs/core";

// required imports
import "@babylonjs/inspector";
import "@babylonjs/loaders/glTF";
import { CreateSceneClass } from "../CreateScene";

// digital assets
import roomModel from "../../Assets/AdLerDesign01.glb";

export class PrototypeScene implements CreateSceneClass {
  // Mit Pretasks können wir dinge erledigen, welche asyncron ablaufen und vor
  // derm Rendern der Szene passieren sollen.
  // In diesem Fall wird das Moodle System initialisiert, es können
  // aber auch z.B. Modelle geladen werden
  preTasks = [];

  createScene = async (
    engine: Engine,
    canvas: HTMLCanvasElement
  ): Promise<Scene> => {
    // Wichtig: Hier keinen Code reinschreiben, der die Szene erstellt, sondern nur die jeweilige Klasse erstellen
    // und evtl positionieren oder anderweitig initialisieren / manipulieren - PG
    const scene = new Scene(engine);

    var camera = new FreeCamera("camera1", new Vector3(-28, 24, -85.5), scene);
    camera.setTarget(new Vector3(0, 0, -60));
    camera.rotation = new Vector3(
      (33 / 180) * Math.PI,
      (-667 / 180) * Math.PI,
      0
    );
    camera.fov = 0.358;
    //camera.attachControl(canvas, true);

    new HemisphericLight("light", new Vector3(0, 1, 0), scene);

    new GroundMesh("Ground", scene);

    const importResult = await SceneLoader.ImportMeshAsync(
      "",
      roomModel,
      "",
      scene,
      undefined,
      ".glb"
    );

    scene.debugLayer.show();

    return scene;
  };
}

export default new PrototypeScene();
