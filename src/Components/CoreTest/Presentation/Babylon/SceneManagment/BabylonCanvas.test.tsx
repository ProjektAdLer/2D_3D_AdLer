import { mock } from "jest-mock-extended";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../../Core/DependencyInjection/CoreTypes";
import IEngineManager from "../../../../Core/Presentation/Babylon/EngineManager/IEngineManager";
import IScenePresenter from "../../../../Core/Presentation/Babylon/SceneManagement/IScenePresenter";
import BabylonCanvas from "../../../../Core/Presentation/Babylon/SceneManagement/BabylonCanvas";

const engineManagerMock = mock<IEngineManager>();
const scenePresenterMock = mock<IScenePresenter>();
describe("Babylon Canvas", () => {
  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind<IEngineManager>(
      CORE_TYPES.IEngineManager
    ).toConstantValue(engineManagerMock);
    CoreDIContainer.rebind<IScenePresenter>(
      CORE_TYPES.IScenePresenter
    ).toConstantValue(scenePresenterMock);
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });
  it("should render", () => {
    render(<BabylonCanvas />);
  });
});
