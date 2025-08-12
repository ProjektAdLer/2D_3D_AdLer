import { AbstractMesh, NullEngine, Scene } from "@babylonjs/core";
import { mockDeep } from "jest-mock-extended";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import SCENE_TYPES from "../../../../Core/DependencyInjection/Scenes/SCENE_TYPES";
import AmbienceView from "../../../../Core/Presentation/Babylon/Ambience/AmbienceView";
import AmbienceViewModel from "../../../../Core/Presentation/Babylon/Ambience/AmbienceViewModel";
import IScenePresenter from "../../../../Core/Presentation/Babylon/SceneManagement/IScenePresenter";
import { ThemeType } from "../../../../Core/Domain/Types/ThemeTypes";

// setup scene presenter mock
const scenePresenterMock = mockDeep<IScenePresenter>();
const scenePresenterFactoryMock = () => scenePresenterMock;

function buildSystemUnderTest(): [AmbienceViewModel, AmbienceView] {
  const viewModel = new AmbienceViewModel();
  const systemUnderTest = new AmbienceView(viewModel);
  return [viewModel, systemUnderTest];
}

describe("AmbienceView", () => {
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

  //ANF-ID: [ELG0021]
  test("asyncSetup calls scenePresenter.loadModel", async () => {
    scenePresenterMock.loadModel.mockResolvedValue([
      new AbstractMesh("TestMesh", new Scene(new NullEngine())),
    ]);

    const [viewModel, systemUnderTest] = buildSystemUnderTest();
    viewModel.theme = ThemeType.Arcade;

    await systemUnderTest.asyncSetup();

    expect(scenePresenterMock.loadModel).toHaveBeenCalledTimes(1);
  });
});
