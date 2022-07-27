import { NullEngine, Scene } from "@babylonjs/core";
import { config } from "../../../../../config";
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

  // basic smoke test
  test("createScene returns an object of type Scene", () => {
    // set environment variable to prevent a call to the babylon debug layer
    config.isDebug = false;

    systemUnderTest.createScene(new NullEngine()).then((data) => {
      expect(data).toBeInstanceOf(Scene);
    });
  });
});
