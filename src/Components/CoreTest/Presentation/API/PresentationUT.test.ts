import CoreDIContainer from "../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../Core/DependencyInjection/CoreTypes";
import Presentation from "../../../Core/Presentation/API/Presentation";
import EngineManager from "../../../Core/Presentation/Babylon/EngineManager/EngineManager";
import SceneController from "../../../Core/Presentation/Babylon/SceneManagment/SceneController";
import ReactEntry from "../../../Core/Presentation/React/ReactEntryPoint/ReactEntry";

const createEngineMock = jest.spyOn(EngineManager.prototype, "createEngine");
const setupReactMock = jest.spyOn(ReactEntry.prototype, "setupReact");
const createSceneMock = jest.spyOn(SceneController.prototype, "createScene");

const createRenderLoopMock = jest.spyOn(
  SceneController.prototype,
  "createRenderLoop"
);

describe("Presentation", () => {
  let presentation: Presentation;

  beforeAll(() => {
    presentation = CoreDIContainer.get<Presentation>(CORE_TYPES.IPresentation);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test("setupBabylon calls engineManager and sceneController", () => {
    return presentation
      .setupBabylon(document.createElement("canvas"))
      .then(() => {
        expect(createEngineMock).toHaveBeenCalledTimes(1);
        expect(createSceneMock).toHaveBeenCalledTimes(1);
        expect(createRenderLoopMock).toHaveBeenCalledTimes(1);
      });
  });

  test("setupReact calls the CoreRenderer", () => {
    presentation.setupReact();
    expect(setupReactMock).toHaveBeenCalledTimes(1);
  });
});
