import { mock, mockDeep } from "jest-mock-extended";
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
import { time } from "console";
import { TIMEOUT } from "dns";

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

  test("updateHairModels updates hair models if a new hairstyle is provided", async () => {
    const [viewModel, systemUnderTest] = buildSystemUnderTest();
    setupScenePresenterMockLoadingResults();
    viewModel.currentAvatarConfig.Value.hair = "hair-backhead";
    viewModel.avatarConfigDiff.Value.hair = "hair-backhead";

    const mesh = new AbstractMesh("TestMesh", new Scene(new NullEngine()));

    viewModel.hairMeshes = new Map([["hair-backhead", [mesh]]]);

    const avatarEditorUtilsSpy = jest.spyOn(
      AvatarEditorUtils,
      "setupAvatarAssetModel",
    );

    // avatarEditorUtilsMock.setupAvatarAssetModel.mockResolvedValue([mesh]);

    // const mockAEU = jest.fn();
    // AvatarEditorUtils.setupAvatarAssetModel = mockAEU;
    // mockAEU.mockResolvedValue([mesh]);

    await systemUnderTest["updateHairModels"]("diff");

    setTimeout(() => {
      expect(avatarEditorUtilsSpy).toHaveBeenCalled();
    }, 1000);

    // expect(avatarEditorUtilsSpy).toHaveBeenCalled();
  });
});
