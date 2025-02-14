import { mockDeep } from "jest-mock-extended";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import SCENE_TYPES from "../../../../../Core/DependencyInjection/Scenes/SCENE_TYPES";
import AvatarEditorPreviewModelView from "../../../../../Core/Presentation/AvatarEditor/AvatarEditorPreview/AvatarEditorPreviewModel/AvatarEditorPreviewModelView";
import AvatarEditorPreviewModelViewModel from "../../../../../Core/Presentation/AvatarEditor/AvatarEditorPreview/AvatarEditorPreviewModel/AvatarEditorPreviewModelViewModel";
import IScenePresenter from "../../../../../Core/Presentation/Babylon/SceneManagement/IScenePresenter";
import {
  AbstractMesh,
  AnimationGroup,
  Mesh,
  NullEngine,
  Scene,
} from "@babylonjs/core";
import AvatarEditorUtils from "../../../../../Core/Presentation/AvatarEditor/AvatarEditorUtils";
import AvatarConfigTO from "../../../../../Core/Application/DataTransferObjects/AvatarConfigTO";

const scenePresenterMock = mockDeep<IScenePresenter>();
const scenePresenterFactoryMock = () => scenePresenterMock;
// const avatarEditorUtilsMock = mock<AvatarEditorUtils>();
function buildSystemUnderTest(): [
  AvatarEditorPreviewModelViewModel,
  AvatarEditorPreviewModelView,
] {
  const viewModel = new AvatarEditorPreviewModelViewModel();
  viewModel.currentAvatarConfig.Value = new AvatarConfigTO();
  viewModel.avatarConfigDiff.Value = {};
  const systemUnderTest = new AvatarEditorPreviewModelView(viewModel);
  return [viewModel, systemUnderTest];
}

function setupScenePresenterMockLoadingResults(): {
  modelMesh: Mesh;
  iconMesh: Mesh;
  animationGroup: AnimationGroup;
} {
  const mockModelMesh = mockDeep<Mesh>();
  const mockIconMesh = mockDeep<Mesh>();
  const mockAnimationGroup = mockDeep<AnimationGroup>();

  scenePresenterMock.loadModel.mockResolvedValue([mockModelMesh]);
  scenePresenterMock.loadGLTFModel.mockResolvedValue({
    meshes: [mockIconMesh],
    animationGroups: [mockAnimationGroup],
    geometries: [],
    lights: [],
    particleSystems: [],
    skeletons: [],
    transformNodes: [],
    spriteManagers: [],
  });

  return {
    modelMesh: mockModelMesh,
    iconMesh: mockIconMesh,
    animationGroup: mockAnimationGroup,
  };
}

describe("AvatarEditorPreviewModelView", () => {
  let systemUnderTest: AvatarEditorPreviewModelView;

  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind(SCENE_TYPES.ScenePresenterFactory).toConstantValue(
      scenePresenterFactoryMock,
    );
  });
  beforeEach(() => {
    buildSystemUnderTest();
    scenePresenterMock.loadModel.mockResolvedValue([
      new AbstractMesh("TestMesh", new Scene(new NullEngine())),
    ]);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("constructor injects scenePresenter", async () => {
    const [, systemUnderTest] = buildSystemUnderTest();
    expect(systemUnderTest["scenePresenter"]).toBeDefined();
  });

  test("constructor subscribes to viewModel.isOpen", () => {
    const [viewModel, systemUnderTest] = buildSystemUnderTest();

    expect(viewModel.avatarConfigDiff["subscribers"]).toStrictEqual([
      systemUnderTest["onAvatarConfigChanged"],
    ]);
  });

  test("updateAllModels calls all the update functions", async () => {
    const [viewModel, systemUnderTest] = buildSystemUnderTest();
    setupScenePresenterMockLoadingResults();

    systemUnderTest["updateHairModels"] = jest.fn();
    systemUnderTest["updateFaceModels"] = jest.fn();
    systemUnderTest["updateClothingModels"] = jest.fn();
    systemUnderTest["updateAccessoireModels"] = jest.fn();
    systemUnderTest["updateBodyModels"] = jest.fn();

    await systemUnderTest["updateAllModels"]("diff");

    expect(systemUnderTest["updateHairModels"]).toHaveBeenCalled();
    expect(systemUnderTest["updateFaceModels"]).toHaveBeenCalled();
    expect(systemUnderTest["updateClothingModels"]).toHaveBeenCalled();
    expect(systemUnderTest["updateAccessoireModels"]).toHaveBeenCalled();
    expect(systemUnderTest["updateBodyModels"]).toHaveBeenCalled();
  });

  test("updateHairModels updates hair models if a new hairstyle is provided", async () => {
    const [viewModel, systemUnderTest] = buildSystemUnderTest();
    setupScenePresenterMockLoadingResults();
    viewModel.currentAvatarConfig.Value.hair = "hair-backhead";
    viewModel.avatarConfigDiff.Value.hair = "hair-backhead";

    const mesh = new AbstractMesh("TestMesh", new Scene(new NullEngine()));

    viewModel.hairMeshes = new Map([["hair-backhead", [mesh]]]);

    // set visibility of all meshes in the map to false
    viewModel.hairMeshes.forEach((meshes, type) => {
      meshes.forEach((mesh) => {
        mesh.isVisible = false;
      });
    });

    // check visibility of first mesh
    expect(viewModel.hairMeshes.get("hair-backhead")![0].isVisible).toBe(false);
    await systemUnderTest["updateHairModels"]("diff");
    expect(viewModel.hairMeshes.get("hair-backhead")![0].isVisible).toBe(true);
  });

  test("updateHairModels updates beard models if a new beardstyle is provided", async () => {
    const [viewModel, systemUnderTest] = buildSystemUnderTest();
    setupScenePresenterMockLoadingResults();
    viewModel.currentAvatarConfig.Value.beard =
      "beard-full-friendly-muttonchops";
    viewModel.avatarConfigDiff.Value.beard = "beard-full-friendly-muttonchops";

    const mesh = new AbstractMesh("TestMesh", new Scene(new NullEngine()));

    viewModel.beardMeshes = new Map([
      ["beard-full-friendly-muttonchops", [mesh]],
    ]);

    // set visibility of all meshes in the map to false
    viewModel.beardMeshes.forEach((meshes, type) => {
      meshes.forEach((mesh) => {
        mesh.isVisible = false;
      });
    });

    // check visibility of first mesh
    expect(
      viewModel.beardMeshes.get("beard-full-friendly-muttonchops")![0]
        .isVisible,
    ).toBe(false);
    await systemUnderTest["updateHairModels"]("diff");
    expect(
      viewModel.beardMeshes.get("beard-full-friendly-muttonchops")![0]
        .isVisible,
    ).toBe(true);
  });

  test("updateHairModels updates hair color if a new haircolor is provided", async () => {
    const [viewModel, systemUnderTest] = buildSystemUnderTest();
    setupScenePresenterMockLoadingResults();
    viewModel.currentAvatarConfig.Value.hairColor = {
      id: 0,
      nameKey: "Black 1",
      hexColor: "#000000",
      uOffset: 0,
      vOffset: 0,
    };
    viewModel.avatarConfigDiff.Value.hairColor = {
      id: 0,
      nameKey: "Black 1",
      hexColor: "#000000",
      uOffset: 0,
      vOffset: 0,
    };
    systemUnderTest["updateHairColor"] = jest.fn();

    await systemUnderTest["updateHairModels"]("diff");

    expect(systemUnderTest["updateHairColor"]).toHaveBeenCalled();
  });
});
