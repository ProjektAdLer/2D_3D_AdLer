import {
  Engine,
  FreeCamera,
  Scene,
  Vector3,
  HemisphericLight,
  StandardMaterial,
  Texture,
  GroundMesh,
  SceneLoader,
  MeshBuilder,
  ActionManager,
  ExecuteCodeAction,
  RecastJSPlugin,
  ActionEvent,
} from "@babylonjs/core";

// // required imports
// import "@babylonjs/inspector";
// import "@babylonjs/loaders/glTF";
// import ICreateSceneClass from "../Components/Core/Presentation/Babylon/SceneManagement/ICreateSceneClass";

// // digital assets
// import link_h5p from "../Assets/3DLink_H5P.glb";

import { injectable } from "inversify";

@injectable()
export default class PrototypeScene implements ICreateSceneClass {
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
    /* let navigationPlugin = new RecastJSPlugin(); */

    var camera = new FreeCamera("camera1", new Vector3(20, 20, 20), scene);
    camera.setTarget(new Vector3(0, 0, 0));
    /*     camera.rotation = new Vector3(
      (0 / 180) * Math.PI,
      (0 / 180) * Math.PI,
      0
    ); */
    camera.fov = 0.8;
    camera.attachControl(canvas, true);

    new HemisphericLight("light", new Vector3(0, 1, 0), scene);

    new GroundMesh("Ground", scene);

    const importResult = await SceneLoader.ImportMeshAsync(
      "",
      link_h5p,
      "",
      scene,
      undefined,
      ".glb"
    );

    let env = importResult.meshes[7];

    var plane = MeshBuilder.CreatePlane(
      "plane",
      { width: 15, height: 10 },
      scene
    );
    plane.rotation = new Vector3((90 / 180) * Math.PI, 0, 0);
    var sphere = MeshBuilder.CreateSphere(
      "sphere",
      { diameter: 2, segments: 32 },
      scene
    );

    var flurMaterial = new StandardMaterial("flurMaterial", scene);
    /* flurMaterial.ambientTexture = new Texture("../../Assets/Textur_Holzflur.jpg", scene); */
    plane.material = flurMaterial;

    sphere.actionManager = new ActionManager(scene);
    sphere.actionManager.registerAction(
      new ExecuteCodeAction(ActionManager.OnPickTrigger, function (evt) {})
    );

    scene.debugLayer.show();

    return scene;
  };
}
