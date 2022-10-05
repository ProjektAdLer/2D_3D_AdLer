import { NullEngine, Scene } from "@babylonjs/core";
import { config } from "../../../../../config";
import SpaceScene from "../../../../Core/Presentation/Babylon/SceneManagement/SpaceScene";

jest.mock("@babylonjs/core");

describe("SpaceScene", () => {
  let systemUnderTest: SpaceScene;

  beforeEach(() => {
    systemUnderTest = new SpaceScene();
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
