import { mock } from "jest-mock-extended";
import { HighlightLayer, NullEngine, Scene } from "@babylonjs/core";
import { config } from "../../../../../../config";
import AbstractSceneDefinition from "../../../../../Core/Presentation/Babylon/SceneManagement/Scenes/AbstractSceneDefinition";
import { Inspector } from "@babylonjs/inspector";
import { HTMLTwinRenderer } from "@babylonjs/accessibility";

const mockAsyncPreTask = jest.fn(async () => Promise.resolve());
const mockPreTask = jest.fn(() => {});
jest.spyOn(HTMLTwinRenderer, "Render").mockImplementation((scene: Scene) => {});

class ConcreteSceneDefinition extends AbstractSceneDefinition {
  protected preTasks = [mockPreTask, mockAsyncPreTask];

  protected initializeScene(): Promise<void> {
    return Promise.resolve();
  }
}

describe("AbstractSceneDefinition", () => {
  let systemUnderTest: AbstractSceneDefinition;
  let oldIsDebugConfig: any;

  beforeAll(() => {
    oldIsDebugConfig = config.isDebug;
    config.isDebug = false;
  });

  beforeEach(() => {
    systemUnderTest = new ConcreteSceneDefinition();
  });

  afterAll(() => {
    config.isDebug = oldIsDebugConfig;
    jest.restoreAllMocks();
  });

  test("Scene getter returns private scene member", () => {
    const mockedScene = new Scene(new NullEngine());
    systemUnderTest["scene"] = mockedScene;

    expect(systemUnderTest.Scene).toBe(mockedScene);
  });

  test("HighlightLayer getter returns private highlightLayer member", () => {
    const mockedHighlightLayer = new HighlightLayer(
      "test",
      new Scene(new NullEngine()),
    );
    systemUnderTest["highlightLayer"] = mockedHighlightLayer;

    expect(systemUnderTest.HighlightLayer).toBe(mockedHighlightLayer);
  });

  test("createScene instantiates a scene object", async () => {
    await systemUnderTest.createScene(new NullEngine());

    expect(systemUnderTest.Scene).toBeDefined();
  });

  test("createScene calls all preTasks", async () => {
    await systemUnderTest.createScene(new NullEngine());

    expect(mockPreTask).toHaveBeenCalledTimes(1);
    expect(mockAsyncPreTask).toHaveBeenCalledTimes(1);
  });

  test("createScene calls show() on the scenes debugLayer if config.isDebug is set true", async () => {
    config.isDebug = true;
    const showMock = jest.fn();
    Inspector.Show = showMock;

    await systemUnderTest.createScene(new NullEngine());

    expect(showMock).toHaveBeenCalledTimes(1);
  });

  test("disposeScene disposes scene", () => {
    const mockedScene = mock<Scene>();
    systemUnderTest["scene"] = mockedScene;
    const mockedHighlightLayer = mock<HighlightLayer>();
    systemUnderTest["highlightLayer"] = mockedHighlightLayer;

    systemUnderTest.disposeScene();
    expect(mockedScene.dispose).toHaveBeenCalled();
  });

  test("disposeScene disposes scene", () => {
    const mockedScene = mock<Scene>();
    systemUnderTest["scene"] = mockedScene;
    const mockedHighlightLayer = mock<HighlightLayer>();
    systemUnderTest["highlightLayer"] = mockedHighlightLayer;

    systemUnderTest.disposeScene();
    expect(mockedHighlightLayer.dispose).toHaveBeenCalled();
  });
});
