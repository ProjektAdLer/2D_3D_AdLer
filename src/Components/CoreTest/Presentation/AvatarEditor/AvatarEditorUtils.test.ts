import { mock } from "jest-mock-extended";
import AvatarEditorUtils from "../../../Core/Presentation/AvatarEditor/AvatarEditorUtils";
import ScenePresenter from "../../../Core/Presentation/Babylon/SceneManagement/ScenePresenter";
import {
  AbstractMesh,
  ISceneLoaderAsyncResult,
  Mesh,
  NullEngine,
  Scene,
  Skeleton,
  StandardMaterial,
  Texture,
  TransformNode,
} from "@babylonjs/core";
import { waitFor } from "@testing-library/react";
import { AvatarColor } from "../../../Core/Domain/AvatarModels/AvatarColorPalette";

const scenePresenterMock = mock<ScenePresenter>();
const skeletonMock = mock<Skeleton>();
const transformNodeMock = mock<TransformNode>();

describe("AvatarEditorUtils", () => {
  let systemUnderTest: AvatarEditorUtils;

  beforeEach(() => {
    jest.restoreAllMocks();
  });

  test("setupAvatarAssetModel returns if no model exists", async () => {
    const result = await AvatarEditorUtils.setupAvatarAssetModel(
      scenePresenterMock,
      skeletonMock,
      "none",
      "",
      transformNodeMock,
    );

    expect(result).toBe(undefined);
  });

  test("setupAvatarAssetModel returns if no model exists", async () => {
    const mesh: Mesh = new Mesh("mockMesh", new Scene(new NullEngine()));
    const transforNode = new TransformNode("node", new Scene(new NullEngine()));
    const sceneLoaderResult: ISceneLoaderAsyncResult = {
      meshes: [mesh],
      particleSystems: [],
      skeletons: [],
      animationGroups: [],
      transformNodes: [new TransformNode("node", new Scene(new NullEngine()))],
      lights: [],
      geometries: [],
      spriteManagers: [],
    };
    scenePresenterMock.loadGLTFModel.mockResolvedValue(sceneLoaderResult);

    const result = await AvatarEditorUtils.setupAvatarAssetModel(
      scenePresenterMock,
      skeletonMock,
      "hair-long",
      "hair/hairstyle",
      transforNode,
    );

    waitFor(() => {
      expect(result).toEqual({
        meshes: [],
        particleSystems: [],
        skeletons: [],
        animationGroups: [],
        transformNodes: [],
        lights: [],
        geometries: [],
        spriteManagers: [],
      });
    });
  });

  test("getAvatarAnchorNodes returns the nodes correctly", () => {
    const initialNodes = [
      new TransformNode("anchor_hair"),
      new TransformNode("anchor_beard"),
      new TransformNode("anchor_top"),
      new TransformNode("anchor_pants"),
      new TransformNode("anchor_shoes"),
      new TransformNode("anchor_hat"),
      new TransformNode("anchor_glasses"),
      new TransformNode("Spine"),
    ];
    systemUnderTest = AvatarEditorUtils;
    const functionSpy = jest.spyOn(
      systemUnderTest as any,
      "getAvatarAnchorNodes",
    );

    const result = systemUnderTest["getAvatarAnchorNodes"](initialNodes);

    expect(result.hairNode.name).toBe("anchor_hair");
    expect(result.beardNode.name).toBe("anchor_beard");
    expect(result.shirtNode.name).toBe("anchor_top");
    expect(result.pantsNode.name).toBe("anchor_pants");
    expect(result.shoesNode.name).toBe("anchor_shoes");
    expect(result.headgearNode.name).toBe("anchor_hat");
    expect(result.glassesNode.name).toBe("anchor_glasses");
    expect(result.backpackNode.name).toBe("Spine");
    expect(result.otherNode.name).toBe("Spine");
  });

  test("setupAvatarTextures returns if textureIndex is not defined", () => {
    systemUnderTest = AvatarEditorUtils;

    const functionSpy = jest.spyOn(
      systemUnderTest as any,
      "setupAvatarTextures",
    );
    systemUnderTest["setupAvatarTextures"](undefined);

    expect(functionSpy).toHaveReturned();
  });

  test("setupAvatarTextures returns if textureIndex is null", () => {
    systemUnderTest = AvatarEditorUtils;

    const functionSpy = jest.spyOn(
      systemUnderTest as any,
      "setupAvatarTextures",
    );
    systemUnderTest["setupAvatarTextures"](null);

    expect(functionSpy).toHaveReturned();
  });

  test("setupAvatarTextures displaces textures correctly", async () => {
    systemUnderTest = AvatarEditorUtils;

    const mockMeshArray = [new Mesh("mockMesh")];
    const mockMaterial = new StandardMaterial(
      "mat_Skin",
      new Scene(new NullEngine()),
    );
    const mockTexture = new Texture("testTexture", new Scene(new NullEngine()));
    mockMeshArray[0].material = mockMaterial;
    mockMaterial.diffuseTexture = mockTexture;

    await systemUnderTest["setupAvatarTextures"](0, mockMeshArray, "mat_Skin", [
      { id: 0, name: "test", uOffset: 0.5, vOffset: 0 },
    ]);
    const testedTexture =
      mockMeshArray[0].material.getActiveTextures()[0] as Texture;
    expect(testedTexture.uOffset).toBe(0.5);
    expect(testedTexture.vOffset).toBe(0);
  });

  test("setupAvatarColor returns if meshColor is not defined", () => {
    systemUnderTest = AvatarEditorUtils;

    const functionSpy = jest.spyOn(systemUnderTest as any, "setupAvatarColor");
    systemUnderTest["setupAvatarColor"](undefined, undefined);

    expect(functionSpy).toHaveReturned();
  });
  test("setupAvatarColor returns if meshColor is null", () => {
    systemUnderTest = AvatarEditorUtils;

    const functionSpy = jest.spyOn(systemUnderTest as any, "setupAvatarColor");
    systemUnderTest["setupAvatarColor"](undefined, null);

    expect(functionSpy).toHaveReturned();
  });

  test("setupAvatarColor displaces textures correctly", async () => {
    const color = {
      id: 0,
      nameKey: "Dark 1",
      hexColor: "#4f2a1a",
      uOffset: 1,
      vOffset: 2,
    } as AvatarColor;
    systemUnderTest = AvatarEditorUtils;

    const mockMeshArray = [new Mesh("mockMesh")];
    const mockMaterial = new StandardMaterial(
      "mat_Skin",
      new Scene(new NullEngine()),
    );
    const mockTexture = new Texture("testTexture", new Scene(new NullEngine()));
    mockMeshArray[0].material = mockMaterial;
    mockMaterial.diffuseTexture = mockTexture;

    await systemUnderTest["setupAvatarColor"](mockMeshArray[0], color, 2, 4);
    const testedTexture =
      mockMeshArray[0].material.getActiveTextures()[0] as Texture;
    expect(testedTexture.uOffset).toBe(-1);
    expect(testedTexture.vOffset).toBe(-2);
  });

  test("setupSkinColor returns if skinMeshes are not defined", () => {
    const color = {
      id: 0,
      nameKey: "Dark 1",
      hexColor: "#4f2a1a",
      uOffset: 0,
      vOffset: 0,
    } as AvatarColor;
    systemUnderTest = AvatarEditorUtils;

    const functionSpy = jest.spyOn(systemUnderTest as any, "setupSkinColor");
    systemUnderTest["setupSkinColor"](undefined, color);

    expect(functionSpy).toHaveReturned();
  });

  test("setupSkinColor returns if skinMeshes are null", () => {
    const color = {
      id: 0,
      nameKey: "Dark 1",
      hexColor: "#4f2a1a",
      uOffset: 0,
      vOffset: 0,
    } as AvatarColor;
    systemUnderTest = AvatarEditorUtils;

    const functionSpy = jest.spyOn(systemUnderTest as any, "setupSkinColor");
    systemUnderTest["setupSkinColor"](null!, color);

    expect(functionSpy).toHaveReturned();
  });
  test("setupSkinColor returns if material on skinMeshes are undefined", () => {
    const color = {
      id: 0,
      nameKey: "Dark 1",
      hexColor: "#4f2a1a",
      uOffset: 1,
      vOffset: 2,
    } as AvatarColor;
    systemUnderTest = AvatarEditorUtils;

    const mockMeshArray = [new Mesh("mockMesh")];
    mockMeshArray[0].material = undefined!;

    const functionSpy = jest.spyOn(systemUnderTest as any, "setupSkinColor");

    systemUnderTest["setupSkinColor"](mockMeshArray, color);
    expect(functionSpy).toHaveReturned();
  });

  test("setupSkinColor displaces textures correctly", async () => {
    const color = {
      id: 0,
      nameKey: "Dark 1",
      hexColor: "#4f2a1a",
      uOffset: 1,
      vOffset: 2,
    } as AvatarColor;
    systemUnderTest = AvatarEditorUtils;

    const mockMeshArray = [new Mesh("mockMesh")];
    const mockMaterial = new StandardMaterial(
      "mat_Skin",
      new Scene(new NullEngine()),
    );
    const mockTexture = new Texture("testTexture", new Scene(new NullEngine()));
    mockMeshArray[0].material = mockMaterial;
    mockMaterial.diffuseTexture = mockTexture;

    await systemUnderTest["setupSkinColor"](mockMeshArray, color);
    const testedTexture =
      mockMeshArray[0].material.getActiveTextures()[0] as Texture;
    expect(testedTexture.uOffset).toBe(0.375);
    expect(testedTexture.vOffset).toBe(2);
  });
});
