import { Engine } from "@babylonjs/core";
import EngineManager from "../../../../Core/Presentation/Babylon/EngineManager/EngineManager";

jest.mock("@babylonjs/core");

describe("EngineManager", () => {
  let engineManager: EngineManager;

  beforeEach(() => {
    engineManager = new EngineManager();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test.todo("test createEngine");

  test("Engine getter returns an object of type Engine after Engine is created", () => {
    engineManager.createEngine(document.createElement("canvas"));
    expect(engineManager.Engine).toBeInstanceOf(Engine);
  });

  test("Engine getter throws error when Engine wasn't created", () => {
    expect(() => {
      engineManager.Engine;
    }).toThrowError();
  });
});
