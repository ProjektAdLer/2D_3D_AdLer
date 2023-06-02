import {
  AbstractMesh,
  NullEngine,
  Quaternion,
  Scene,
  Tools,
  Vector3,
} from "@babylonjs/core";
import { mock, mockDeep } from "jest-mock-extended";
import { setTimeout } from "timers/promises";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import SCENE_TYPES from "../../../../Core/DependencyInjection/Scenes/SCENE_TYPES";
import DecorationView from "../../../../Core/Presentation/Babylon/Decoration/DecorationView";
import DecorationViewModel from "../../../../Core/Presentation/Babylon/Decoration/DecorationViewModel";
import IScenePresenter from "../../../../Core/Presentation/Babylon/SceneManagement/IScenePresenter";
import { LearningSpaceTemplateType } from "../../../../Core/Domain/Types/LearningSpaceTemplateType";

// setup scene presenter mock
const scenePresenterMock = mockDeep<IScenePresenter>();
const scenePresenterFactoryMock = () => scenePresenterMock;

function buildSystemUnderTest(): [DecorationViewModel, DecorationView] {
  const viewModel = new DecorationViewModel();
  const systemUnderTest = new DecorationView(viewModel);
  return [viewModel, systemUnderTest];
}

describe("DecorationView", () => {
  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind(SCENE_TYPES.ScenePresenterFactory).toConstantValue(
      scenePresenterFactoryMock
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

    const [viewModel, systemUnderTest] = buildSystemUnderTest();
    expect(systemUnderTest["scenePresenter"]).toBeDefined();
  });

  test("constructor subscribes to viewModel.learningSpaceTemplateType", () => {
    scenePresenterMock.loadModel.mockResolvedValue([
      new AbstractMesh("TestMesh", new Scene(new NullEngine())),
    ]);

    const [viewModel, systemUnderTest] = buildSystemUnderTest();
    expect(viewModel.learningSpaceTemplateType["subscribers"]).toStrictEqual([
      systemUnderTest["asyncDecorationSetup"],
    ]);
  });

  test("asyncSetup/loadMeshAsync calls scenePresenter.loadModel with L room", async () => {
    scenePresenterMock.loadModel.mockResolvedValue([
      new AbstractMesh("TestMesh", new Scene(new NullEngine())),
    ]);

    const [viewModel, systemUnderTest] = buildSystemUnderTest();
    viewModel.learningSpaceTemplateType.Value = LearningSpaceTemplateType.L;

    expect(scenePresenterMock.loadModel).toHaveBeenCalledTimes(1);
  });

  test("asyncSetup/loadMeshAsync calls scenePresenter.loadModel with R6 room", async () => {
    scenePresenterMock.loadModel.mockResolvedValue([
      new AbstractMesh("TestMesh", new Scene(new NullEngine())),
    ]);

    const [viewModel, systemUnderTest] = buildSystemUnderTest();
    viewModel.learningSpaceTemplateType.Value = LearningSpaceTemplateType.R6;

    expect(scenePresenterMock.loadModel).toHaveBeenCalledTimes(1);
  });

  test("asyncSetup/loadMeshAsync calls scenePresenter.loadModel with R8 room", async () => {
    scenePresenterMock.loadModel.mockResolvedValue([
      new AbstractMesh("TestMesh", new Scene(new NullEngine())),
    ]);

    const [viewModel, systemUnderTest] = buildSystemUnderTest();
    viewModel.learningSpaceTemplateType.Value = LearningSpaceTemplateType.R8;

    expect(scenePresenterMock.loadModel).toHaveBeenCalledTimes(1);
  });
});
