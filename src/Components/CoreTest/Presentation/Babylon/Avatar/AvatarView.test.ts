import {
  AnimationGroup,
  ISceneLoaderAsyncResult,
  Material,
  Mesh,
  NullEngine,
  Scene,
  Texture,
  TransformNode,
  Vector3,
} from "@babylonjs/core";
import { mock, mockDeep } from "jest-mock-extended";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import SCENE_TYPES from "../../../../Core/DependencyInjection/Scenes/SCENE_TYPES";
import AvatarView from "../../../../Core/Presentation/Babylon/Avatar/AvatarView";
import AvatarViewModel from "../../../../Core/Presentation/Babylon/Avatar/AvatarViewModel";
import IAvatarController from "../../../../Core/Presentation/Babylon/Avatar/IAvatarController";
import IScenePresenter from "../../../../Core/Presentation/Babylon/SceneManagement/IScenePresenter";
import IMovementIndicator from "../../../../Core/Presentation/Babylon/MovementIndicator/IMovementIndicator";
import PRESENTATION_TYPES from "../../../../Core/DependencyInjection/Presentation/PRESENTATION_TYPES";
import { LearningSpaceTemplateType } from "../../../../Core/Domain/Types/LearningSpaceTemplateType";
import ICharacterAnimator from "../../../../Core/Presentation/Babylon/CharacterAnimator/ICharacterAnimator";
import ICharacterNavigator from "../../../../Core/Presentation/Babylon/CharacterNavigator/ICharacterNavigator";
import { IReadyable } from "../../../../../Lib/Readyable";

const movementIndicatorMock = mock<IMovementIndicator>();
const characterAnimatorMock = mock<ICharacterAnimator>();
const characterNavigatorMock = mock<ICharacterNavigator>();
// @ts-ignore
(characterNavigatorMock as IReadyable).IsReady = Promise.resolve();

// setup scene presenter mock
const scenePresenterMock = mockDeep<IScenePresenter>();
const scenePresenterFactoryMock = () => scenePresenterMock;

// util function to create system under test
function createAvatarView(): [AvatarView, AvatarViewModel] {
  const viewModel = new AvatarViewModel();
  viewModel.learningSpaceTemplateType = LearningSpaceTemplateType.L;
  const controller = mock<IAvatarController>();
  const avatarView = new AvatarView(viewModel, controller);
  return [avatarView, viewModel];
}

function setupScenePresenterLoadGTLFModelMock(): Mesh {
  const mockMesh = mockDeep<Mesh>();
  mockMesh.material = mockDeep<Material>();
  mockMesh.material.name = "Eyes_mat";
  mockMesh.material.getActiveTextures.mockReturnValue([]);
  const mockLoadingResult = mockDeep<ISceneLoaderAsyncResult>();
  // @ts-ignore
  mockLoadingResult.meshes = [mockMesh];

  scenePresenterMock.loadGLTFModel.mockResolvedValue(mockLoadingResult);

  return mockMesh;
}

describe("AvatarView", () => {
  let systemUnderTest: AvatarView;
  let viewModel: AvatarViewModel;

  beforeAll(() => {
    // setup dependency injection
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind(SCENE_TYPES.ScenePresenterFactory).toConstantValue(
      scenePresenterFactoryMock
    );
    CoreDIContainer.rebind<IMovementIndicator>(
      PRESENTATION_TYPES.IMovementIndicator
    ).toConstantValue(movementIndicatorMock);
    CoreDIContainer.rebind<ICharacterAnimator>(
      PRESENTATION_TYPES.ICharacterAnimator
    ).toConstantValue(characterAnimatorMock);
    CoreDIContainer.rebind<ICharacterNavigator>(
      PRESENTATION_TYPES.ICharacterNavigator
    ).toConstantValue(characterNavigatorMock);
  });

  beforeEach(() => {
    [systemUnderTest, viewModel] = createAvatarView();
  });

  afterAll(() => {
    jest.restoreAllMocks();
    jest.useRealTimers();
    CoreDIContainer.restore();
  });

  describe("setup", () => {
    test("asyncSetup creates character animator", async () => {
      scenePresenterMock.Scene.getTransformNodeByName.mockReturnValue(
        new TransformNode("AvatarParentNode", new Scene(new NullEngine()))
      );
      setupScenePresenterLoadGTLFModelMock();

      await systemUnderTest.asyncSetup();

      expect(viewModel.characterAnimator).toBe(characterAnimatorMock);
    });

    test("asyncSetup creates character navigator", async () => {
      scenePresenterMock.Scene.getTransformNodeByName.mockReturnValue(
        new TransformNode("AvatarParentNode", new Scene(new NullEngine()))
      );
      setupScenePresenterLoadGTLFModelMock();

      await systemUnderTest.asyncSetup();

      expect(viewModel.characterNavigator).toBe(characterNavigatorMock);
    });
  });

  describe("blink animation", () => {
    test("setupBlinkAnimation gets the eye texture from the loaded meshes", () => {
      const mockEyeMaterial = mockDeep<Material>();
      mockEyeMaterial.name = "Eyes_mat";
      const mockMesh = new Mesh("mockMesh", new Scene(new NullEngine()));
      mockMesh.material = mockEyeMaterial;
      const mockEyeTexture = mock<Texture>();
      mockEyeMaterial.getActiveTextures.mockReturnValue([mockEyeTexture]);
      viewModel.meshes = [mockMesh];

      systemUnderTest["setupBlinkAnimation"]();

      expect(viewModel.eyeTextures).toEqual([mockEyeTexture]);
    });

    test("setBlinkTimeout calls setTimeout with a number between blinkInterval and blinkInterval plus blickIntervalMaxOffset", () => {
      jest.useFakeTimers();
      const setTimeoutMock = jest.spyOn(global, "setTimeout");

      systemUnderTest["setBlinkTimeout"]();

      expect(setTimeoutMock).toHaveBeenCalledTimes(1);
      expect(setTimeoutMock.mock.calls[0][1]).toBeGreaterThanOrEqual(
        viewModel.blinkInterval
      );
      expect(setTimeoutMock.mock.calls[0][1]).toBeLessThanOrEqual(
        viewModel.blinkInterval + viewModel.blinkIntervalMaxOffset
      );

      setTimeoutMock.mockRestore();
      jest.clearAllTimers();
    });

    test("blink timeout sets the blinkTextureUOffset on the eye texture", () => {
      jest.useFakeTimers();
      const eyeTexture = new Texture("eyeTexture", new Scene(new NullEngine()));
      viewModel.eyeTextures = [eyeTexture];

      systemUnderTest["setBlinkTimeout"]();
      jest.runOnlyPendingTimers();

      expect(viewModel.eyeTextures[0].uOffset).toBe(
        viewModel.blinkTextureUOffset
      );

      jest.clearAllTimers();
    });

    test("blink timeout sets timeout to reset eye uvs", () => {
      jest.useFakeTimers();
      const setTimeoutMock = jest.spyOn(global, "setTimeout");
      const eyeTexture = new Texture("eyeTexture", new Scene(new NullEngine()));
      viewModel.eyeTextures = [eyeTexture];

      systemUnderTest["setBlinkTimeout"]();
      jest.runOnlyPendingTimers();

      expect(setTimeoutMock.mock.calls[2][1]).toBe(viewModel.blinkDuration);

      setTimeoutMock.mockRestore();
      jest.clearAllTimers();
    });

    test("blink timeout resets the blinkTextureUOffset on the eye texture", () => {
      jest.useFakeTimers();
      const eyeTexture = new Texture("eyeTexture", new Scene(new NullEngine()));
      viewModel.eyeTextures = [eyeTexture];

      systemUnderTest["setBlinkTimeout"]();
      jest.runOnlyPendingTimers();
      expect(viewModel.eyeTextures[0].uOffset).toBe(
        viewModel.blinkTextureUOffset
      );

      jest.runOnlyPendingTimers();
      expect(viewModel.eyeTextures[0].uOffset).toBe(0);

      jest.clearAllTimers();
    });
  });

  describe("model loading", () => {
    // ANF-ID: [EZZ0017]
    test("loadAvatarAsync calls the scenePresenter to load avatar models", async () => {
      scenePresenterMock.Scene.getTransformNodeByName.mockReturnValue(
        new TransformNode("AvatarParentNode", new Scene(new NullEngine()))
      );
      setupScenePresenterLoadGTLFModelMock();

      await systemUnderTest["loadAvatarAsync"]();

      expect(scenePresenterMock.loadGLTFModel).toHaveBeenCalledTimes(1);
    });

    test("loadAvatarAsync gets the parent node for the avatar", async () => {
      scenePresenterMock.Scene.getTransformNodeByName.mockReturnValue(
        new TransformNode("AvatarParentNode", new Scene(new NullEngine()))
      );
      setupScenePresenterLoadGTLFModelMock();

      await systemUnderTest["loadAvatarAsync"]();

      expect(
        scenePresenterMock.Scene.getTransformNodeByName
      ).toHaveBeenCalledWith("AvatarParentNode");
    });

    test.skip("loadAvatarAsync sets the parent node as parent of the first loaded mesh", async () => {
      const parentNode = new TransformNode(
        "AvatarParentNode",
        new Scene(new NullEngine())
      );
      scenePresenterMock.Scene.getTransformNodeByName.mockReturnValue(
        parentNode
      );

      const mockMesh = setupScenePresenterLoadGTLFModelMock();

      await systemUnderTest["loadAvatarAsync"]();

      expect(mockMesh.setParent).toHaveBeenCalledTimes(1);
      expect(mockMesh.setParent).toHaveBeenCalledWith(parentNode);
    });

    test("loadAvatarAsync gets idleAnimation from loading results", async () => {
      scenePresenterMock.Scene.getTransformNodeByName.mockReturnValue(
        new TransformNode("AvatarParentNode", new Scene(new NullEngine()))
      );
      const mockAnimationGroup = mockDeep<AnimationGroup>();
      mockAnimationGroup.name = "anim_idle";
      const mockLoadingResult = mockDeep<ISceneLoaderAsyncResult>();
      // @ts-ignore
      mockLoadingResult.animationGroups = [mockAnimationGroup];
      scenePresenterMock.loadGLTFModel.mockResolvedValue(mockLoadingResult);

      await systemUnderTest["loadAvatarAsync"]();

      expect(systemUnderTest["idleAnimation"]).toBe(mockAnimationGroup);
    });

    test("loadAvatarAsync gets walkAnimation from loading results", async () => {
      scenePresenterMock.Scene.getTransformNodeByName.mockReturnValue(
        new TransformNode("AvatarParentNode", new Scene(new NullEngine()))
      );
      const mockAnimationGroup = mockDeep<AnimationGroup>();
      mockAnimationGroup.name = "anim_walk";
      const mockLoadingResult = mockDeep<ISceneLoaderAsyncResult>();
      // @ts-ignore
      mockLoadingResult.animationGroups = [mockAnimationGroup];
      scenePresenterMock.loadGLTFModel.mockResolvedValue(mockLoadingResult);

      await systemUnderTest["loadAvatarAsync"]();

      expect(systemUnderTest["walkAnimation"]).toBe(mockAnimationGroup);
    });

    test("loadAvatarAsync gets interactionAnimation from loading results", async () => {
      scenePresenterMock.Scene.getTransformNodeByName.mockReturnValue(
        new TransformNode("AvatarParentNode", new Scene(new NullEngine()))
      );
      const mockAnimationGroup = mockDeep<AnimationGroup>();
      mockAnimationGroup.name = "anim_interact";
      const mockLoadingResult = mockDeep<ISceneLoaderAsyncResult>();
      // @ts-ignore
      mockLoadingResult.animationGroups = [mockAnimationGroup];
      scenePresenterMock.loadGLTFModel.mockResolvedValue(mockLoadingResult);

      await systemUnderTest["loadAvatarAsync"]();

      expect(systemUnderTest["interactionAnimation"]).toBe(mockAnimationGroup);
    });
  });

  describe("movement indicator", () => {
    // ANF-ID: [EZZ0016]
    test("onMovementTargetChanged calls movementIndicator.display when movement target is set a vector", () => {
      viewModel.movementTarget.Value = new Vector3(1, 2, 3);

      expect(movementIndicatorMock.display).toHaveBeenCalledTimes(1);
    });

    // ANF-ID: [EZZ0016]
    test("onMovementTargetChanged calls movementIndicator.hide when movement target is set to null", () => {
      viewModel.movementTarget.Value = new Vector3(1, 2, 3); // set movementTarget to something first
      viewModel.movementTarget.Value = null;

      expect(movementIndicatorMock.hide).toHaveBeenCalledTimes(1);
    });
  });
});
