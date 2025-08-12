import {
  AbstractMesh,
  NullEngine,
  Quaternion,
  Scene,
  Tools,
  Vector3,
} from "@babylonjs/core";
import { mock, mockDeep } from "jest-mock-extended";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import SCENE_TYPES from "../../../../Core/DependencyInjection/Scenes/SCENE_TYPES";
import WindowView from "../../../../Core/Presentation/Babylon/Window/WindowView";
import WindowViewModel from "../../../../Core/Presentation/Babylon/Window/WindowViewModel";
import IScenePresenter from "../../../../Core/Presentation/Babylon/SceneManagement/IScenePresenter";
import LearningSpace from "../../../../Core/Presentation/React/ReactRelated/ReactEntryPoint/LearningSpace";
import { ThemeType } from "../../../../Core/Domain/Types/ThemeTypes";

// setup scene presenter mock
const scenePresenterMock = mockDeep<IScenePresenter>();
const scenePresenterFactoryMock = () => scenePresenterMock;

function buildSystemUnderTest(): [WindowViewModel, WindowView] {
  const viewModel = new WindowViewModel();
  const systemUnderTest = new WindowView(viewModel);
  return [viewModel, systemUnderTest];
}

describe("WindowView", () => {
  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind(SCENE_TYPES.ScenePresenterFactory).toConstantValue(
      scenePresenterFactoryMock,
    );
  });

  afterAll(() => {
    CoreDIContainer.restore();
    jest.clearAllMocks();
  });

  test("constructor injects scenePresenter", () => {
    scenePresenterMock.loadModel.mockResolvedValue([
      new AbstractMesh("TestMesh", new Scene(new NullEngine())),
    ]);

    const [, systemUnderTest] = buildSystemUnderTest();
    expect(systemUnderTest["scenePresenter"]).toBeDefined();
  });

  test("asyncSetup/loadMeshAsync calls scenePresenter.loadModel", async () => {
    scenePresenterMock.loadModel.mockResolvedValue([
      new AbstractMesh("TestMesh", new Scene(new NullEngine())),
    ]);

    const [viewModel, systemUnderTest] = buildSystemUnderTest();
    viewModel.theme = ThemeType.Campus;

    await systemUnderTest.asyncSetup();
    expect(scenePresenterMock.loadModel).toHaveBeenCalledTimes(1);
  });

  test("asyncSetup/loadMeshAsync sets rotationQuaternion of each loaded mesh to null", async () => {
    const mesh1 = new AbstractMesh("TestMesh1", new Scene(new NullEngine()));
    mesh1.rotationQuaternion = new Quaternion();
    const mesh2 = new AbstractMesh("TestMesh2", new Scene(new NullEngine()));
    mesh2.rotationQuaternion = new Quaternion();
    scenePresenterMock.loadModel.mockResolvedValue([mesh1, mesh2]);

    const [viewModel, systemUnderTest] = buildSystemUnderTest();
    viewModel.theme = ThemeType.Campus;

    await systemUnderTest.asyncSetup();
    expect(mesh1.rotationQuaternion).toBeNull();
    expect(mesh2.rotationQuaternion).toBeNull();
  });
});
