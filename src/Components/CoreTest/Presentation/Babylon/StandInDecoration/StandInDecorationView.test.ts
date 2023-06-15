import StandInDecorationView from "../../../../Core/Presentation/Babylon/StandInDecoration/StandInDecorationView";
import StandInDecorationViewModel from "../../../../Core/Presentation/Babylon/StandInDecoration/StandInDecorationViewModel";
import { mock, mockDeep } from "jest-mock-extended";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import IScenePresenter from "../../../../Core/Presentation/Babylon/SceneManagement/IScenePresenter";
import SCENE_TYPES from "../../../../Core/DependencyInjection/Scenes/SCENE_TYPES";
import {
  AbstractMesh,
  NullEngine,
  Scene,
  Tools,
  Vector3,
} from "@babylonjs/core";
import ArrayItemRandomizer from "../../../../Core/Presentation/Utils/ArrayItemRandomizer/ArrayItemRandomizer";

// setup scene presenter mock
const scenePresenterMock = mockDeep<IScenePresenter>();
const modelRandomizerMock = mock<ArrayItemRandomizer<string>>();
const scenePresenterFactoryMock = () => scenePresenterMock;

function buildSystemUnderTest(): [
  StandInDecorationViewModel,
  StandInDecorationView
] {
  const viewModel = new StandInDecorationViewModel();
  viewModel.position.Value = new Vector3(1, 2, 3);
  viewModel.rotation.Value = 4;
  viewModel.spaceName.Value = "TestSpace";
  viewModel.slotNumber.Value = 42;
  viewModel.modelMeshes.Value = [
    new AbstractMesh("TestMesh", new Scene(new NullEngine())),
  ];
  const view = new StandInDecorationView(viewModel);
  return [viewModel, view];
}

describe("StandInDecorationView", () => {
  let systemUnderTest: StandInDecorationView;

  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind(SCENE_TYPES.ScenePresenterFactory).toConstantValue(
      scenePresenterFactoryMock
    );
  });

  afterAll(() => {
    CoreDIContainer.restore();
    jest.restoreAllMocks();
  });

  test("constructor sets up position observable callbacks", () => {
    scenePresenterMock.loadModel.mockResolvedValue([
      new AbstractMesh("TestMesh", new Scene(new NullEngine())),
    ]);

    const [viewModel, systemUnderTest] = buildSystemUnderTest();

    expect(viewModel.position["subscribers"]).toStrictEqual([
      systemUnderTest["positionModel"],
    ]);
  });

  test("constructor sets up rotation observable callbacks", () => {
    scenePresenterMock.loadModel.mockResolvedValue([
      new AbstractMesh("TestMesh", new Scene(new NullEngine())),
    ]);

    const [viewModel, systemUnderTest] = buildSystemUnderTest();

    expect(viewModel.rotation["subscribers"]).toStrictEqual([
      systemUnderTest["positionModel"],
    ]);
  });

  test.skip("async setup calls scene presenter to load model", async () => {
    scenePresenterMock.loadModel.mockResolvedValue([
      new AbstractMesh("TestMesh", new Scene(new NullEngine())),
    ]);
    modelRandomizerMock.getItem.mockReturnValue("TestModelPath/TestModel.glb");

    const [viewModel, systemUnderTest] = buildSystemUnderTest();
    await systemUnderTest.setupStandInDecoration();

    expect(scenePresenterMock.loadModel).toBeCalledTimes(2);
  });

  test("positionModel changes the model position when the position value in the viewModel is changed", async () => {
    // mock resolve value twice to circumvent returning the same mesh twice
    const mockedMesh = mockDeep<AbstractMesh>();
    scenePresenterMock.loadModel.mockResolvedValue([mockedMesh]);

    const [viewModel, systemUnderTest] = buildSystemUnderTest();

    await systemUnderTest.setupStandInDecoration();
    viewModel.position.Value = new Vector3(42, 42, 42);

    expect(viewModel.modelMeshes.Value[0].position).toEqual(
      new Vector3(42, 42, 42)
    );
  });

  test.skip("positionModel changes the model rotation when the rotation value in the viewModel is changed", async () => {
    const [viewModel, systemUnderTest] = buildSystemUnderTest();

    viewModel.rotation.Value = 40;
    await systemUnderTest.setupStandInDecoration();

    viewModel.rotation.Value = 42;
    expect(viewModel.modelMeshes.Value[0].rotate()).toBeCalledWith(
      Vector3.Up(),
      Tools.ToRadians(42)
    );
  });
});
