import { Engine, Scene } from "@babylonjs/core";
import MainScene from "../../../../Core/Presentation/Babylon/SceneManagement/MainScene";

jest.mock("@babylonjs/core");

describe("MainScene", () => {
  let systemUnderTest: MainScene;

  beforeEach(() => {
    systemUnderTest = new MainScene();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test("createScene returns an object of type Scene", () => {
    let canvas = document.createElement("canvas");
    let engine = new Engine(canvas);

    // this will break when the debugLayer is called in createScene
    systemUnderTest.createScene(engine, canvas).then((data) => {
      expect(data).toBeInstanceOf(Scene);
    });
  });
});
