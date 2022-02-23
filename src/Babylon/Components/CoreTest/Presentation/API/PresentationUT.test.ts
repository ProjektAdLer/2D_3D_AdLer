import BusinessLogic from "../../../Core/BusinessLogic/API/BusinessLogic";
import CoreDIContainer from "../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../Core/DependencyInjection/types";
import Presentation from "../../../Core/Presentation/API/Presentation";
import EngineManager from "../../../Core/Presentation/EngineManager/EngineManager";
import ScenePresenter from "../../../Core/Presentation/SceneManager/ScenePresenter";

const createEngineMock = jest
  .spyOn(EngineManager.prototype, "createEngine")
  .mockImplementation((canvas: HTMLCanvasElement) => {});

const createSceneMock = jest
  .spyOn(ScenePresenter.prototype, "createScene")
  .mockImplementation((): Promise<void> => {
    return new Promise<void>(() => {});
  });

const createRenderLoopMock = jest
  .spyOn(ScenePresenter.prototype, "createRenderLoop")
  .mockImplementation(() => {});

describe("Presentation", () => {
  let presentation: Presentation;

  beforeAll(() => {
    presentation = CoreDIContainer.get<Presentation>(CORE_TYPES.IPresentation);
  });

  test("setupBabylon calls engineManager and scenePresenter", () => {
    return presentation
      .setupBabylon(document.createElement("canvas"))
      .then(() => {
        expect(createEngineMock).toHaveBeenCalledTimes(1);
        expect(createSceneMock).toHaveBeenCalledTimes(1);
        expect(createRenderLoopMock).toHaveBeenCalledTimes(1);
      });
  });

  test("BusinessLogic getter returns an object of type Businesslogic", () => {
    // expect(presentation.BusinessLogic).toBeDefined();
    expect(presentation.BusinessLogic).toBeInstanceOf(BusinessLogic);
  });
});
