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
  TransformNode,
} from "@babylonjs/core";
import { waitFor } from "@testing-library/react";

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
});
