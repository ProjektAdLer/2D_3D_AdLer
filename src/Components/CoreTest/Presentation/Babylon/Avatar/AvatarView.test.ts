import AvatarAnimationNames from "../../../../Core/Domain/AvatarModels/AvatarAnimationNames";
import AvatarModelMaterialNames from "../../../../Core/Domain/AvatarModels/AvatarModelMaterialNames";
import {
  AnimationGroup,
  ISceneLoaderAsyncResult,
  Material,
  Mesh,
  NullEngine,
  Scene,
  Skeleton,
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
import IEntityContainer from "../../../../Core/Domain/EntityContainer/IEntityContainer";
import CORE_TYPES from "../../../../Core/DependencyInjection/CoreTypes";
import AvatarEntity from "../../../../Core/Domain/Entities/AvatarEntity";
import AvatarEditorUtils from "../../../../Core/Presentation/AvatarEditor/AvatarEditorUtils";
import UserDataEntity from "../../../../Core/Domain/Entities/UserDataEntity";

const movementIndicatorMock = mock<IMovementIndicator>();
const characterAnimatorMock = mock<ICharacterAnimator>();
const characterNavigatorMock = mock<ICharacterNavigator>();
// @ts-ignore
(characterNavigatorMock as IReadyable).IsReady = Promise.resolve();

// setup scene presenter mock
const scenePresenterMock = mockDeep<IScenePresenter>();
const scenePresenterFactoryMock = () => scenePresenterMock;

const entityContainerMock = mock<IEntityContainer>();
const transformNodeMock = mock<TransformNode>();

jest
  .spyOn(AvatarEditorUtils, "setupAvatarAssetModel")
  .mockImplementation(
    async (
      scenePresenter: IScenePresenter,
      avatartSkeleton: Skeleton,
      newModel: unknown,
      modelFolder: string,
      anchorNode: TransformNode,
      onMeshLoaded?: (mesh: Mesh) => void,
    ) => {},
  );

jest.spyOn(AvatarEditorUtils, "setupAvatarTextures");

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
  mockMesh.material.name = AvatarModelMaterialNames.eyes;
  mockMesh.material.getActiveTextures.mockReturnValue([]);
  const mockLoadingResult = mockDeep<ISceneLoaderAsyncResult>();
  // @ts-ignore
  mockLoadingResult.meshes = [mockMesh];

  scenePresenterMock.loadGLTFModel.mockResolvedValue(mockLoadingResult);

  return mockMesh;
}

function setupAvatarEditorDataConfiguration() {
  jest.spyOn(AvatarEditorUtils, "getAvatarAnchorNodes").mockReturnValue({
    hairNode: transformNodeMock,
    beardNode: transformNodeMock,
    shirtNode: transformNodeMock,
    pantsNode: transformNodeMock,
    shoesNode: transformNodeMock,
    headgearNode: transformNodeMock,
    glassesNode: transformNodeMock,
    backpackNode: transformNodeMock,
    otherNode: transformNodeMock,
  });
  entityContainerMock.getEntitiesOfType.mockReturnValueOnce([
    {
      userToken: "",
      username: "",
      isLoggedIn: true,
      availableWorlds: [{ worldID: 0, worldName: "" }],
      currentWorldID: undefined,
      currentSpaceID: undefined,
      lastVisitedWorldID: undefined,
      avatar: new AvatarEntity(),
    },
  ] as UserDataEntity[]);
}

describe("AvatarView", () => {
  let systemUnderTest: AvatarView;
  let viewModel: AvatarViewModel;

  beforeAll(() => {
    // setup dependency injection
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind(SCENE_TYPES.ScenePresenterFactory).toConstantValue(
      scenePresenterFactoryMock,
    );
    CoreDIContainer.rebind<IMovementIndicator>(
      PRESENTATION_TYPES.IMovementIndicator,
    ).toConstantValue(movementIndicatorMock);
    CoreDIContainer.rebind<ICharacterAnimator>(
      PRESENTATION_TYPES.ICharacterAnimator,
    ).toConstantValue(characterAnimatorMock);
    CoreDIContainer.rebind<ICharacterNavigator>(
      PRESENTATION_TYPES.ICharacterNavigator,
    ).toConstantValue(characterNavigatorMock);
    CoreDIContainer.rebind(CORE_TYPES.IEntityContainer).toConstantValue(
      entityContainerMock,
    );
  });

  beforeEach(() => {
    [systemUnderTest, viewModel] = createAvatarView();
  });

  afterAll(() => {
    jest.restoreAllMocks();
    jest.useRealTimers();
    CoreDIContainer.restore();
  });

  describe("setup/cleanup", () => {
    // ANF-ID: [EZZ0018]
    test("asyncSetup creates character animator", async () => {
      scenePresenterMock.Scene.getTransformNodeByName.mockReturnValue(
        new TransformNode("AvatarParentNode", new Scene(new NullEngine())),
      );
      setupScenePresenterLoadGTLFModelMock();
      setupAvatarEditorDataConfiguration();
      await systemUnderTest.asyncSetup();

      expect(viewModel.characterAnimator).toBe(characterAnimatorMock);
    });

    test("asyncSetup creates character navigator", async () => {
      scenePresenterMock.Scene.getTransformNodeByName.mockReturnValue(
        new TransformNode("AvatarParentNode", new Scene(new NullEngine())),
      );
      setupAvatarEditorDataConfiguration();

      setupScenePresenterLoadGTLFModelMock();
      await systemUnderTest.asyncSetup();

      expect(viewModel.characterNavigator).toBe(characterNavigatorMock);
    });

    test("setupCleanup callback clears timeouts", async () => {
      const clearTimeoutMock = jest.spyOn(global, "clearTimeout");
      let callbackRef: () => void;
      scenePresenterMock.addDisposeSceneCallback.mockImplementation(
        (callback) => {
          callbackRef = callback;
        },
      );

      viewModel.setEyeTimer = setTimeout(() => {}, 100000);
      viewModel.resetEyeTimer = setTimeout(() => {}, 100000);

      systemUnderTest["setupCleanup"]();
      callbackRef!();

      expect(clearTimeoutMock).toHaveBeenCalledTimes(2);
      expect(clearTimeoutMock).toHaveBeenCalledWith(viewModel.setEyeTimer);
      expect(clearTimeoutMock).toHaveBeenCalledWith(viewModel.resetEyeTimer);

      clearTimeoutMock.mockRestore();
      jest.clearAllTimers();
    });
  });

  describe("blink animation", () => {
    test("setupBlinkAnimation gets the eye texture from the loaded meshes", () => {
      const mockEyeMaterial = mockDeep<Material>();
      mockEyeMaterial.name = AvatarModelMaterialNames.eyes;
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
        viewModel.blinkInterval,
      );
      expect(setTimeoutMock.mock.calls[0][1]).toBeLessThanOrEqual(
        viewModel.blinkInterval + viewModel.blinkIntervalMaxOffset,
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
        viewModel.blinkTextureUOffset,
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
        viewModel.blinkTextureUOffset,
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
        new TransformNode("AvatarParentNode", new Scene(new NullEngine())),
      );
      setupScenePresenterLoadGTLFModelMock();
      setupAvatarEditorDataConfiguration();

      await systemUnderTest["loadAvatarAsync"]();

      expect(scenePresenterMock.loadGLTFModel).toHaveBeenCalledTimes(1);
    });

    test("loadAvatarAsync gets the parent node for the avatar", async () => {
      scenePresenterMock.Scene.getTransformNodeByName.mockReturnValue(
        new TransformNode("AvatarParentNode", new Scene(new NullEngine())),
      );
      setupScenePresenterLoadGTLFModelMock();
      setupAvatarEditorDataConfiguration();

      await systemUnderTest["loadAvatarAsync"]();

      expect(
        scenePresenterMock.Scene.getTransformNodeByName,
      ).toHaveBeenCalledWith("AvatarParentNode");
    });

    test("loadAvatarAsync gets idleAnimation from loading results", async () => {
      scenePresenterMock.Scene.getTransformNodeByName.mockReturnValue(
        new TransformNode("AvatarParentNode", new Scene(new NullEngine())),
      );
      const mockAnimationGroup = mockDeep<AnimationGroup>();
      mockAnimationGroup.name = AvatarAnimationNames.idle;
      const mockLoadingResult = mockDeep<ISceneLoaderAsyncResult>();
      // @ts-ignore
      mockLoadingResult.animationGroups = [mockAnimationGroup];
      scenePresenterMock.loadGLTFModel.mockResolvedValue(mockLoadingResult);
      setupAvatarEditorDataConfiguration();

      await systemUnderTest["loadAvatarAsync"]();

      expect(systemUnderTest["idleAnimation"]).toEqual(mockAnimationGroup);
    });

    test("loadAvatarAsync gets walkAnimation from loading results", async () => {
      scenePresenterMock.Scene.getTransformNodeByName.mockReturnValue(
        new TransformNode("AvatarParentNode", new Scene(new NullEngine())),
      );
      const mockAnimationGroup = mockDeep<AnimationGroup>();
      mockAnimationGroup.name = AvatarAnimationNames.walk;
      const mockLoadingResult = mockDeep<ISceneLoaderAsyncResult>();
      // @ts-ignore
      mockLoadingResult.animationGroups = [mockAnimationGroup];
      scenePresenterMock.loadGLTFModel.mockResolvedValue(mockLoadingResult);
      setupAvatarEditorDataConfiguration();

      await systemUnderTest["loadAvatarAsync"]();

      expect(systemUnderTest["walkAnimation"]).toEqual(mockAnimationGroup);
    });

    test("loadAvatarAsync gets interactionAnimation from loading results", async () => {
      scenePresenterMock.Scene.getTransformNodeByName.mockReturnValue(
        new TransformNode("AvatarParentNode", new Scene(new NullEngine())),
      );
      const mockAnimationGroup = mockDeep<AnimationGroup>();
      mockAnimationGroup.name = AvatarAnimationNames.interact;
      const mockLoadingResult = mockDeep<ISceneLoaderAsyncResult>();
      // @ts-ignore
      mockLoadingResult.animationGroups = [mockAnimationGroup];
      scenePresenterMock.loadGLTFModel.mockResolvedValue(mockLoadingResult);
      setupAvatarEditorDataConfiguration();

      await systemUnderTest["loadAvatarAsync"]();

      expect(systemUnderTest["interactionAnimation"]).toEqual(
        mockAnimationGroup,
      );
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
