import { mock } from "jest-mock-extended";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../../Core/DependencyInjection/CoreTypes";
import IScenePresenter from "../../../../Core/Presentation/Babylon/SceneManagement/IScenePresenter";
import BabylonCanvas from "../../../../Core/Presentation/Babylon/SceneManagement/BabylonCanvas";
import ICreateSceneClass from "src/Components/Core/Presentation/Babylon/SceneManagement/ICreateSceneClass";

const scenePresenterMock = mock<IScenePresenter>();

describe("Babylon Canvas", () => {
  beforeAll(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind<IScenePresenter>(
      CORE_TYPES.IScenePresenter
    ).toConstantValue(scenePresenterMock);
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  it("should render", () => {
    render(
      <BabylonCanvas
        createSceneClass={CoreDIContainer.get<ICreateSceneClass>(
          CORE_TYPES.ICreateSceneClass
        )}
      />
    );
  });
});
