import { Engine } from "@babylonjs/core";
import EngineManager from "../../../../Core/Presentation/Babylon/EngineManager/EngineManager";

jest.mock("@babylonjs/core");

describe("EngineManager", () => {
  let systemUnderTest: EngineManager;

  beforeEach(() => {
    systemUnderTest = new EngineManager();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test.todo("test createEngine");

  test("Engine getter returns an object of type Engine after engine is created", () => {
    systemUnderTest.createEngine(document.createElement("canvas"));
    expect(systemUnderTest.Engine).toBeInstanceOf(Engine);
  });

  test("Engine getter throws error when engine wasn't created", () => {
    expect(() => {
      systemUnderTest.Engine;
    }).toThrowError();
  });
});
