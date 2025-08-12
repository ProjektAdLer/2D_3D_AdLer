import StandInDecorationView from "../../../../Core/Presentation/Babylon/StandInDecoration/StandInDecorationView";
import StandInDecorationViewModel from "../../../../Core/Presentation/Babylon/StandInDecoration/StandInDecorationViewModel";
import { mock, mockDeep } from "jest-mock-extended";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import IScenePresenter from "../../../../Core/Presentation/Babylon/SceneManagement/IScenePresenter";
import SCENE_TYPES from "../../../../Core/DependencyInjection/Scenes/SCENE_TYPES";
import { AbstractMesh, NullEngine, Scene, Vector3 } from "@babylonjs/core";
import ArrayItemRandomizer from "../../../../Core/Presentation/Utils/ArrayItemRandomizer/ArrayItemRandomizer";
import { ThemeType } from "../../../../Core/Domain/Types/ThemeTypes";

// setup scene presenter mock
const scenePresenterMock = mockDeep<IScenePresenter>();

const scenePresenterFactoryMock = () => scenePresenterMock;

function buildSystemUnderTest(): [
  StandInDecorationViewModel,
  StandInDecorationView,
] {
  const viewModel = new StandInDecorationViewModel();
  viewModel.position = new Vector3(1, 2, 3);
  viewModel.rotation = 4;
  viewModel.spaceName = "TestSpace";
  viewModel.slotNumber = 42;

  const view = new StandInDecorationView(viewModel);
  return [viewModel, view];
}

describe("StandInDecorationView", () => {
  let systemUnderTest: StandInDecorationView;

  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind(SCENE_TYPES.ScenePresenterFactory).toConstantValue(
      scenePresenterFactoryMock,
    );
  });

  afterAll(() => {
    CoreDIContainer.restore();
    jest.restoreAllMocks();
  });

  test("constructor injects scenePresenter", () => {
    scenePresenterMock.loadModel.mockResolvedValue([
      new AbstractMesh("TestMesh", new Scene(new NullEngine())),
    ]);

    const [, systemUnderTest] = buildSystemUnderTest();
    expect(systemUnderTest["scenePresenter"]).toBeDefined();
  });

  //ANF-ID: [ELG0026]
  test("async setup calls scene presenter to load model", async () => {
    scenePresenterMock.loadModel.mockResolvedValue([
      new AbstractMesh("TestMesh", new Scene(new NullEngine())),
    ]);

    jest
      .spyOn(ArrayItemRandomizer.prototype, "getItem")
      .mockReturnValue(["123"]);

    const [viewModel, systemUnderTest] = buildSystemUnderTest();
    viewModel.rotation = 0;
    viewModel.position = new Vector3(0, 0, 0);
    viewModel.slotNumber = 0;
    viewModel.spaceName = "TestSpace";
    viewModel.theme = ThemeType.Campus;

    await systemUnderTest.asyncSetup();

    expect(scenePresenterMock.loadModel).toBeCalledTimes(1);
  });
});
