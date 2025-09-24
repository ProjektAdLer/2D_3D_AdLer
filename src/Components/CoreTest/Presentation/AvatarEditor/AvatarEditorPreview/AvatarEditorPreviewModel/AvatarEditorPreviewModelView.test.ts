import { mockDeep, mock } from "jest-mock-extended";
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
  StandardMaterial,
  Texture,
  TransformNode,
} from "@babylonjs/core";
import AvatarEditorUtils from "../../../../../Core/Presentation/AvatarEditor/AvatarEditorUtils";
import AvatarConfigTO from "../../../../../Core/Application/DataTransferObjects/AvatarConfigTO";
import { AvatarColor } from "../../../../../Core/Domain/AvatarModels/AvatarColorPalette";
import USECASE_TYPES from "../../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import ILoadAvatarConfigUseCase from "../../../../../Core/Application/UseCases/LoadAvatarConfig/ILoadAvatarConfigUseCase";
import {
  AvatarEyeBrowTexture,
  AvatarEyeTexture,
  AvatarMouthTexture,
  AvatarNoseTexture,
} from "../../../../../Core/Domain/AvatarModels/AvatarFaceUVTexture";
import AvatarModelTransforms from "../../../../../Core/Domain/AvatarModels/AvatarModelTransforms";
import { AvatarNoneModel } from "../../../../../Core/Domain/AvatarModels/AvatarModelTypes";

const loadAvatarConfigMock = mock<ILoadAvatarConfigUseCase>();
const scenePresenterMock = mockDeep<IScenePresenter>();
const scenePresenterFactoryMock = () => scenePresenterMock;

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

jest
  .spyOn(AvatarEditorUtils, "setupAvatarColor")
  .mockImplementation(
    async (
      mesh: AbstractMesh,
      meshColor: AvatarColor,
      displacementU: number = 0,
      displacementV: number = 0,
    ) => {},
  );

describe("AvatarEditorPreviewModelView", () => {
  let systemUnderTest: AvatarEditorPreviewModelView;

  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind(SCENE_TYPES.ScenePresenterFactory).toConstantValue(
      scenePresenterFactoryMock,
    );
    CoreDIContainer.rebind(
      USECASE_TYPES.ILoadAvatarConfigUseCase,
    ).toConstantValue(loadAvatarConfigMock);
  });
  beforeEach(() => {
    buildSystemUnderTest();
    scenePresenterMock.loadModel.mockResolvedValue([
      new Mesh("TestMesh", new Scene(new NullEngine())),
    ]);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    CoreDIContainer.restore();
    jest.restoreAllMocks();
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

  test("onAvatarConfigChanged calls updateAllModels", async () => {
    const [viewModel, systemUnderTest] = buildSystemUnderTest();
    systemUnderTest["updateAllModels"] = jest.fn();

    viewModel.avatarConfigDiff.Value = { hair: "hair-backhead" };

    await systemUnderTest["onAvatarConfigChanged"]();

    expect(systemUnderTest["updateAllModels"]).toHaveBeenCalled();
  });

  test("asyncSetup calls updateAllModels", async () => {
    const [viewModel, systemUnderTest] = buildSystemUnderTest();
    setupScenePresenterMockLoadingResults();
    const avatarEditorUtilsMock = jest.fn().mockReturnValue({
      hairNode: new TransformNode("hairNode"),
      beardNode: new TransformNode("beardNode"),
      shirtNode: new TransformNode("shirtNode"),
      pantsNode: new TransformNode("pantsNode"),
      shoesNode: new TransformNode("shoesNode"),
      headgearNode: new TransformNode("headgearNode"),
      glassesNode: new TransformNode("glassesNode"),
      backpackNode: new TransformNode("backpackNode"),
      otherNode: new TransformNode("otherNode"),
    });
    AvatarEditorUtils.getAvatarAnchorNodes = avatarEditorUtilsMock;
    systemUnderTest["updateAllModels"] = jest.fn();

    await systemUnderTest["asyncSetup"]();

    expect(systemUnderTest["updateAllModels"]).toHaveBeenCalled();
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

  test("updateHairModels calls updateModel if a new hairstyle is provided", async () => {
    const [viewModel, systemUnderTest] = buildSystemUnderTest();
    setupScenePresenterMockLoadingResults();
    viewModel.currentAvatarConfig.Value.hair = "hair-backhead";
    viewModel.avatarConfigDiff.Value.hair = "hair-backhead";
    viewModel.hairMeshes = new Map([
      ["hair-backhead", [new Mesh("mockMesh"), new Mesh("mockMesh")]],
    ]);
    systemUnderTest["updateModel"] = jest.fn();

    await systemUnderTest["updateHairModels"]({
      hair: "hair-backhead",
    } as Partial<AvatarConfigTO>);

    expect(systemUnderTest["updateModel"]).toHaveBeenCalledWith(
      "hair-backhead",
      "hair/hairstyle",
      viewModel.hairMeshes,
      viewModel.hairAnchorNode,
    );
  });
  test("updateHairModels calls updateModel if a new beardtyle is provided", async () => {
    const [viewModel, systemUnderTest] = buildSystemUnderTest();
    setupScenePresenterMockLoadingResults();
    viewModel.currentAvatarConfig.Value.beard =
      "beard-full-friendly-muttonchops";
    viewModel.avatarConfigDiff.Value.beard = "beard-full-friendly-muttonchops";
    viewModel.beardMeshes = new Map([
      [
        "beard-full-friendly-muttonchops",
        [new Mesh("mockMesh"), new Mesh("mockMesh")],
      ],
    ]);
    systemUnderTest["updateModel"] = jest.fn();

    await systemUnderTest["updateHairModels"]({
      beard: "beard-full-friendly-muttonchops",
    } as Partial<AvatarConfigTO>);

    expect(systemUnderTest["updateModel"]).toHaveBeenCalledWith(
      "beard-full-friendly-muttonchops",
      "hair/beards",
      viewModel.beardMeshes,
      viewModel.beardAnchorNode,
    );
  });

  test("updateHairModels calls updateHairColor and updateBeardColor if a new haircolor is provided", async () => {
    const [viewModel, systemUnderTest] = buildSystemUnderTest();
    setupScenePresenterMockLoadingResults();
    const color = {
      id: 0,
      nameKey: "Black 1",
      hexColor: "#000000",
      uOffset: 0,
      vOffset: 0,
    } as AvatarColor;
    viewModel.currentAvatarConfig.Value.hairColor = color;
    viewModel.currentAvatarConfig.Value.hair = "hair-backhead";
    viewModel.currentAvatarConfig.Value.beard =
      "beard-full-friendly-muttonchops";
    viewModel.avatarConfigDiff.Value.hairColor = color;
    const meshMock = new Mesh("mockMesh");
    viewModel.hairMeshes = new Map([
      ["hair-backhead", [new Mesh("mockMesh"), meshMock]],
    ]);
    viewModel.beardMeshes = new Map([
      ["beard-full-friendly-muttonchops", [new Mesh("mockMesh"), meshMock]],
    ]);

    systemUnderTest["updateHairColor"] = jest.fn();
    systemUnderTest["updateBeardColor"] = jest.fn();

    await systemUnderTest["updateHairModels"]({
      hairColor: color,
    } as Partial<AvatarConfigTO>);

    expect(AvatarEditorUtils.setupAvatarColor).toHaveBeenCalledWith(
      meshMock,
      color,
      0.125,
      0.5,
    );
    expect(AvatarEditorUtils.setupAvatarColor).toHaveBeenCalledWith(
      meshMock,
      color,
      0.125,
      0.5,
    );
  });

  test("updateFaceModels calls setupAvatartextures if new eyebrows are provided", async () => {
    const [viewModel, systemUnderTest] = buildSystemUnderTest();
    setupScenePresenterMockLoadingResults();
    viewModel.currentAvatarConfig.Value.eyebrows = 0;
    viewModel.avatarConfigDiff.Value.eyebrows = 0;

    AvatarEditorUtils.setupAvatarTextures = jest.fn();

    await systemUnderTest["updateFaceModels"]({
      eyebrows: 1,
    } as Partial<AvatarConfigTO>);

    expect(AvatarEditorUtils.setupAvatarTextures).toHaveBeenCalledWith(
      1,
      undefined,
      "mat_Eyebrows",
      AvatarEyeBrowTexture,
    );
  });

  test("updateFaceModels calls setupAvatartextures if new eyes are provided", async () => {
    const [viewModel, systemUnderTest] = buildSystemUnderTest();
    setupScenePresenterMockLoadingResults();
    viewModel.currentAvatarConfig.Value.eyes = 0;
    viewModel.avatarConfigDiff.Value.eyes = 0;

    AvatarEditorUtils.setupAvatarTextures = jest.fn();

    await systemUnderTest["updateFaceModels"]({
      eyes: 1,
    } as Partial<AvatarConfigTO>);

    expect(AvatarEditorUtils.setupAvatarTextures).toHaveBeenCalledWith(
      1,
      undefined,
      "mat_Eyes",
      AvatarEyeTexture,
    );
  });
  test("updateFaceModels calls setupAvatartextures if a new nose is provided", async () => {
    const [viewModel, systemUnderTest] = buildSystemUnderTest();
    setupScenePresenterMockLoadingResults();
    viewModel.currentAvatarConfig.Value.nose = 0;
    viewModel.avatarConfigDiff.Value.nose = 0;

    AvatarEditorUtils.setupAvatarTextures = jest.fn();

    await systemUnderTest["updateFaceModels"]({
      nose: 1,
    } as Partial<AvatarConfigTO>);

    expect(AvatarEditorUtils.setupAvatarTextures).toHaveBeenCalledWith(
      1,
      undefined,
      "mat_Nose",
      AvatarNoseTexture,
    );
  });
  test("updateFaceModels calls setupAvatartextures if a new mouth is provided", async () => {
    const [viewModel, systemUnderTest] = buildSystemUnderTest();
    setupScenePresenterMockLoadingResults();
    viewModel.currentAvatarConfig.Value.mouth = 0;
    viewModel.avatarConfigDiff.Value.mouth = 0;

    AvatarEditorUtils.setupAvatarTextures = jest.fn();

    await systemUnderTest["updateFaceModels"]({
      mouth: 1,
    } as Partial<AvatarConfigTO>);

    expect(AvatarEditorUtils.setupAvatarTextures).toHaveBeenCalledWith(
      1,
      undefined,
      "mat_Mouth",
      AvatarMouthTexture,
    );
  });

  test("updateClothingModels calls updateModel if a new shirt is provided", async () => {
    const [viewModel, systemUnderTest] = buildSystemUnderTest();
    setupScenePresenterMockLoadingResults();
    viewModel.currentAvatarConfig.Value.shirt = "shirts-dress";
    viewModel.shirtMeshes = new Map([
      ["shirts-dress", [new Mesh("mockMesh"), new Mesh("mockMesh")]],
    ]);
    systemUnderTest["updateModel"] = jest.fn();

    await systemUnderTest["updateClothingModels"]({
      shirt: "shirts-hoodie",
    } as Partial<AvatarConfigTO>);

    expect(systemUnderTest["updateModel"]).toHaveBeenCalledWith(
      "shirts-hoodie",
      "clothing/shirts",
      viewModel.shirtMeshes,
      viewModel.shirtAnchorNode,
    );
  });
  test("updateClothingModels calls updateModel if new pants are provided", async () => {
    const [viewModel, systemUnderTest] = buildSystemUnderTest();
    setupScenePresenterMockLoadingResults();
    viewModel.currentAvatarConfig.Value.pants = "pants-cargo";
    viewModel.pantsMeshes = new Map([
      ["pants-cargo", [new Mesh("mockMesh"), new Mesh("mockMesh")]],
    ]);
    systemUnderTest["updateModel"] = jest.fn();

    await systemUnderTest["updateClothingModels"]({
      pants: "pants-cargo",
    } as Partial<AvatarConfigTO>);

    expect(systemUnderTest["updateModel"]).toHaveBeenCalledWith(
      "pants-cargo",
      "clothing/pants",
      viewModel.pantsMeshes,
      viewModel.pantsAnchorNode,
    );
  });
  test("updateClothingModels calls updateModel if new shoes are provided", async () => {
    const [viewModel, systemUnderTest] = buildSystemUnderTest();
    setupScenePresenterMockLoadingResults();
    viewModel.currentAvatarConfig.Value.shoes = "shoes-boots";
    viewModel.shoesMeshes = new Map([
      ["shoes-boots", [new Mesh("mockMesh"), new Mesh("mockMesh")]],
    ]);
    systemUnderTest["updateModel"] = jest.fn();

    await systemUnderTest["updateClothingModels"]({
      shoes: "shoes-boots",
    } as Partial<AvatarConfigTO>);

    expect(systemUnderTest["updateModel"]).toHaveBeenCalledWith(
      "shoes-boots",
      "clothing/shoes",
      viewModel.shoesMeshes,
      viewModel.shoesAnchorNode,
    );
  });
  test("updateClothingModels calls setupAvatarColor if a new shirtColor is provided", async () => {
    const [viewModel, systemUnderTest] = buildSystemUnderTest();
    setupScenePresenterMockLoadingResults();
    viewModel.currentAvatarConfig.Value.shirt = "shirts-dress";
    viewModel.shirtMeshes = new Map([
      ["shirts-dress", [new Mesh("mockMesh"), new Mesh("mockMesh")]],
    ]);
    const color = {
      id: 0,
      nameKey: "Black 1",
      hexColor: "#000000",
      uOffset: 0,
      vOffset: 0,
    } as AvatarColor;
    viewModel.currentAvatarConfig.Value.shirtColor = color;

    await systemUnderTest["updateClothingModels"]({
      shirtColor: color,
    } as Partial<AvatarConfigTO>);

    expect(AvatarEditorUtils.setupAvatarColor).toHaveBeenCalledWith(
      viewModel.shirtMeshes.get("shirts-dress")![1],
      color,
    );
  });
  test("updateClothingModels calls setupAvatarColor if a new pantsColor is provided", async () => {
    const [viewModel, systemUnderTest] = buildSystemUnderTest();
    setupScenePresenterMockLoadingResults();
    viewModel.currentAvatarConfig.Value.pants = "pants-cargo";
    viewModel.pantsMeshes = new Map([
      ["pants-cargo", [new Mesh("mockMesh"), new Mesh("mockMesh")]],
    ]);
    const color = {
      id: 0,
      nameKey: "Black 1",
      hexColor: "#000000",
      uOffset: 0,
      vOffset: 0,
    } as AvatarColor;
    viewModel.currentAvatarConfig.Value.pantsColor = color;

    await systemUnderTest["updateClothingModels"]({
      pantsColor: color,
    } as Partial<AvatarConfigTO>);

    expect(AvatarEditorUtils.setupAvatarColor).toHaveBeenCalledWith(
      viewModel.pantsMeshes.get("pants-cargo")![1],
      color,
    );
  });
  test("updateClothingModels calls setupAvatarColor if a new shoesColor is provided", async () => {
    const [viewModel, systemUnderTest] = buildSystemUnderTest();
    setupScenePresenterMockLoadingResults();
    viewModel.currentAvatarConfig.Value.shoes = "shoes-boots";
    viewModel.shoesMeshes = new Map([
      ["shoes-boots", [new Mesh("mockMesh"), new Mesh("mockMesh")]],
    ]);
    const color = {
      id: 0,
      nameKey: "Black 1",
      hexColor: "#000000",
      uOffset: 0,
      vOffset: 0,
    } as AvatarColor;
    viewModel.currentAvatarConfig.Value.shoesColor = color;

    await systemUnderTest["updateClothingModels"]({
      shoesColor: color,
    } as Partial<AvatarConfigTO>);

    expect(AvatarEditorUtils.setupAvatarColor).toHaveBeenCalledWith(
      viewModel.shoesMeshes.get("shoes-boots")![1],
      color,
    );
  });
  test("updateAccessoireModels calls updateModel if a new headgear is provided", async () => {
    const [viewModel, systemUnderTest] = buildSystemUnderTest();
    setupScenePresenterMockLoadingResults();
    viewModel.headgearMeshes = new Map([
      ["hats-cowboy", [new Mesh("mockMesh"), new Mesh("mockMesh")]],
    ]);
    systemUnderTest["updateModel"] = jest.fn();

    await systemUnderTest["updateAccessoireModels"]({
      headgear: "hats-cowboy",
    } as Partial<AvatarConfigTO>);

    expect(systemUnderTest["updateModel"]).toHaveBeenCalledWith(
      "hats-cowboy",
      "accessoires/headgear",
      viewModel.headgearMeshes,
      viewModel.headgearAnchorNode,
    );
  });
  test("updateAccessoireModels calls updateModel if new glasses are provided", async () => {
    const [viewModel, systemUnderTest] = buildSystemUnderTest();
    setupScenePresenterMockLoadingResults();
    viewModel.glassesMeshes = new Map([
      ["glasses-browline", [new Mesh("mockMesh"), new Mesh("mockMesh")]],
    ]);
    systemUnderTest["updateModel"] = jest.fn();

    await systemUnderTest["updateAccessoireModels"]({
      glasses: "glasses-browline",
    } as Partial<AvatarConfigTO>);

    expect(systemUnderTest["updateModel"]).toHaveBeenCalledWith(
      "glasses-browline",
      "accessoires/glasses",
      viewModel.glassesMeshes,
      viewModel.glassesAnchorNode,
    );
  });
  test("updateAccessoireModels calls updateModel if a new backpack is provided", async () => {
    const [viewModel, systemUnderTest] = buildSystemUnderTest();
    setupScenePresenterMockLoadingResults();
    viewModel.backpackMeshes = new Map([
      ["backpack-santapack", [new Mesh("mockMesh"), new Mesh("mockMesh")]],
    ]);
    systemUnderTest["updateModel"] = jest.fn();

    await systemUnderTest["updateAccessoireModels"]({
      backpack: "backpack-santapack",
    } as Partial<AvatarConfigTO>);

    expect(systemUnderTest["updateModel"]).toHaveBeenCalledWith(
      "backpack-santapack",
      "accessoires/backpack",
      viewModel.backpackMeshes,
      viewModel.backpackAnchorNode,
      AvatarModelTransforms.backpack,
    );
  });
  test("updateAccessoireModels calls updateModel if a new 'other' is provided", async () => {
    const [viewModel, systemUnderTest] = buildSystemUnderTest();
    setupScenePresenterMockLoadingResults();
    viewModel.otherMeshes = new Map([
      ["other-sheriff-star", [new Mesh("mockMesh"), new Mesh("mockMesh")]],
    ]);
    systemUnderTest["updateModel"] = jest.fn();

    await systemUnderTest["updateAccessoireModels"]({
      other: "other-sheriff-star",
    } as Partial<AvatarConfigTO>);

    expect(systemUnderTest["updateModel"]).toHaveBeenCalledWith(
      "other-sheriff-star",
      "accessoires/other",
      viewModel.otherMeshes,
      viewModel.otherAnchorNode,
      AvatarModelTransforms.sheriffStar,
    );
  });
  test("updateBodyModels calls setUpSkinColor if a new skinColor is provided", async () => {
    const [viewModel, systemUnderTest] = buildSystemUnderTest();
    setupScenePresenterMockLoadingResults();
    const color = {
      id: 0,
      nameKey: "Dark 1",
      hexColor: "#4f2a1a",
      uOffset: 0,
      vOffset: 0,
    } as AvatarColor;
    viewModel.currentAvatarConfig.Value.skinColor = color;
    viewModel.baseModelMeshes = [new Mesh("mockMesh")];

    AvatarEditorUtils.setupSkinColor = jest.fn();

    await systemUnderTest["updateBodyModels"]({
      skinColor: color,
    } as Partial<AvatarConfigTO>);

    expect(AvatarEditorUtils.setupSkinColor).toHaveBeenCalledTimes(4);
  });

  test("updateModel updates the visibility of updated meshes", async () => {
    const [viewModel, systemUnderTest] = buildSystemUnderTest();
    setupScenePresenterMockLoadingResults();
    const mesh = new Mesh("TestMesh", new Scene(new NullEngine()));

    viewModel.hairMeshes = new Map([["hair-backhead", [mesh]]]);

    // set visibility of all meshes in the map to false
    viewModel.hairMeshes.forEach((meshes, type) => {
      meshes.forEach((mesh) => {
        mesh.isVisible = false;
      });
    });

    // check visibility of first mesh
    expect(viewModel.hairMeshes.get("hair-backhead")![0].isVisible).toBe(false);
    await systemUnderTest["updateModel"](
      "hair-backhead",
      "hair/hairstyle",
      viewModel.hairMeshes,
      viewModel.hairAnchorNode,
    );
    expect(viewModel.hairMeshes.get("hair-backhead")![0].isVisible).toBe(true);
  });

  test("updateModel resolves if model is undefined", async () => {
    const [viewModel, systemUnderTest] = buildSystemUnderTest();
    setupScenePresenterMockLoadingResults();
    const result = systemUnderTest["updateModel"](
      null,
      "hair/hairstyle",
      new Map([
        ["hair-backhead", [new Mesh("TestMesh", new Scene(new NullEngine()))]],
      ]),
      viewModel.hairAnchorNode,
    );
    await expect(result).resolves.toBe(undefined);
  });

  test("updateModel sets visibility of models to false if model is of type none", async () => {
    const [viewModel, systemUnderTest] = buildSystemUnderTest();
    setupScenePresenterMockLoadingResults();
    const mesh = new Mesh("TestMesh", new Scene(new NullEngine()));
    mesh.isVisible = true;
    const modelMap = new Map([["hair-backhead", [mesh]]]);
    await systemUnderTest["updateModel"](
      AvatarNoneModel.None,
      "hair/hairstyle",
      modelMap,
      viewModel.hairAnchorNode,
    );
    expect(mesh.isVisible).toBe(false);
  });
});
