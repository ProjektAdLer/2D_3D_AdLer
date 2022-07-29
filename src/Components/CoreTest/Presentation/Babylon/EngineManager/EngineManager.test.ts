import { Engine } from "@babylonjs/core";
import EngineManager from "../../../../Core/Presentation/Babylon/EngineManager/EngineManager";
import { fireEvent } from "@testing-library/dom";

jest.mock("@babylonjs/core");

describe("EngineManager", () => {
  let systemUnderTest: EngineManager;

  beforeEach(() => {
    systemUnderTest = new EngineManager();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test("Engine getter returns an object of type Engine after engine is created", () => {
    systemUnderTest.createEngine(document.createElement("canvas"));
    expect(systemUnderTest.Engine).toBeInstanceOf(Engine);
  });

  test("window.resize calls the engine resize callback", () => {
    systemUnderTest.createEngine(document.createElement("canvas"));
    fireEvent.resize(window);

    expect(systemUnderTest.Engine.resize).toHaveBeenCalledTimes(1);
  });

  test("Engine getter throws error when engine wasn't created", () => {
    expect(() => {
      systemUnderTest.Engine;
    }).toThrowError();
  });
});
