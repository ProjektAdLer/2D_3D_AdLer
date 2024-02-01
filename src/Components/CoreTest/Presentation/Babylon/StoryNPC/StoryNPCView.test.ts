import { mock, mockDeep } from "jest-mock-extended";
import IStoryNPCController from "../../../../Core/Presentation/Babylon/StoryNPC/IStoryNPCController";
import StoryNPCView from "../../../../Core/Presentation/Babylon/StoryNPC/StoryNPCView";
import StoryNPCViewModel from "../../../../Core/Presentation/Babylon/StoryNPC/StoryNPCViewModel";
import IScenePresenter from "../../../../Core/Presentation/Babylon/SceneManagement/IScenePresenter";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import SCENE_TYPES from "../../../../Core/DependencyInjection/Scenes/SCENE_TYPES";
import {
  ActionManager,
  AnimationGroup,
  ISceneLoaderAsyncResult,
  Mesh,
  NullEngine,
  Scene,
  TransformNode,
  Vector3,
} from "@babylonjs/core";
import ICharacterAnimator from "../../../../Core/Presentation/Babylon/CharacterAnimator/ICharacterAnimator";
import PRESENTATION_TYPES from "../../../../Core/DependencyInjection/Presentation/PRESENTATION_TYPES";
import IStoryElementPresenter from "../../../../Core/Presentation/React/LearningSpaceDisplay/StoryElement/IStoryElementPresenter";
import Observable from "../../../../../Lib/Observable";
import { LearningSpaceTemplateType } from "../../../../Core/Domain/Types/LearningSpaceTemplateType";
import { LearningSpaceTemplate_L } from "../../../../Core/Domain/LearningSpaceTemplates/LearningSpaceTemplate_L";
import INavigation from "../../../../Core/Presentation/Babylon/Navigation/INavigation";
import CORE_TYPES from "../../../../Core/DependencyInjection/CoreTypes";
import ICharacterNavigator from "../../../../Core/Presentation/Babylon/CharacterNavigator/ICharacterNavigator";

// setup scene presenter mock
const scenePresenterMock = mockDeep<IScenePresenter>();
const scenePresenterFactoryMock = () => scenePresenterMock;
// @ts-ignore
scenePresenterMock.Scene = new Scene(new NullEngine());
const storyElementPresenterMock = mock<IStoryElementPresenter>();
const navigationMock = mockDeep<INavigation>();
const characterAnimatorMock = mock<ICharacterAnimator>();
const characterNavigatorMock = mock<ICharacterNavigator>();
// @ts-ignore
characterNavigatorMock.IsReady = Promise.resolve();

describe("StoryNPCView", () => {
  let systemUnderTest: StoryNPCView;
  let viewModel: StoryNPCViewModel;
  let controllerMock: IStoryNPCController;

  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind(SCENE_TYPES.ScenePresenterFactory).toConstantValue(
      scenePresenterFactoryMock
    );
    CoreDIContainer.rebind(
      PRESENTATION_TYPES.ICharacterAnimator
    ).toConstantValue(characterAnimatorMock);
    CoreDIContainer.bind(
      PRESENTATION_TYPES.IStoryElementPresenter
    ).toConstantValue(storyElementPresenterMock);
    CoreDIContainer.rebind(CORE_TYPES.INavigation).toConstantValue(
      navigationMock
    );
    CoreDIContainer.rebind(
      PRESENTATION_TYPES.ICharacterNavigator
    ).toConstantValue(characterNavigatorMock);
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  beforeEach(() => {
    viewModel = new StoryNPCViewModel();
    viewModel.isInCutScene = new Observable<boolean>(false, false);
    controllerMock = mock<IStoryNPCController>();
    systemUnderTest = new StoryNPCView(viewModel, controllerMock);
  });

  test("asyncSetupStoryNPC does not throw", async () => {
    const mockMesh = new Mesh("mockMesh", new Scene(new NullEngine()));
    const mockIdleAnimationGroup = new AnimationGroup(
      "anim_idle",
      new Scene(new NullEngine())
    );
    const mockWalkAnimationGroup = new AnimationGroup(
      "anim_walk",
      new Scene(new NullEngine())
    );
    const mockLoadingResult = mockDeep<ISceneLoaderAsyncResult>();
    // @ts-ignore
    mockLoadingResult.meshes = [mockMesh];
    // @ts-ignore
    mockLoadingResult.animationGroups = [
      mockIdleAnimationGroup,
      mockWalkAnimationGroup,
    ];
    scenePresenterMock.loadGLTFModel.mockResolvedValue(mockLoadingResult);
    scenePresenterMock.loadModel.mockResolvedValue([mockMesh]);

    viewModel.learningSpaceTemplateType = LearningSpaceTemplateType.None;

    navigationMock.Plugin.getClosestPoint.mockImplementation(
      (vector: Vector3) => vector
    );

    await expect(systemUnderTest.asyncSetupStoryNPC()).resolves.not.toThrow();
  });

  test("loadElementModel calls the scenePresenter to load npc models", async () => {
    const mockMesh = new Mesh("mockMesh", new Scene(new NullEngine()));
    const mockLoadingResult = mockDeep<ISceneLoaderAsyncResult>();
    // @ts-ignore
    mockLoadingResult.meshes = [mockMesh];
    scenePresenterMock.loadGLTFModel.mockResolvedValue(mockLoadingResult);

    await systemUnderTest["loadElementModel"]();

    expect(scenePresenterMock.loadGLTFModel).toHaveBeenCalledTimes(1);
  });

  test("loadElementModel gets idleAnimation from loading results", async () => {
    const mockMesh = new Mesh("mockMesh", new Scene(new NullEngine()));
    const mockIdleAnimationGroup = new AnimationGroup(
      "anim_idle",
      new Scene(new NullEngine())
    );
    const mockLoadingResult = mockDeep<ISceneLoaderAsyncResult>();
    // @ts-ignore
    mockLoadingResult.meshes = [mockMesh];
    // @ts-ignore
    mockLoadingResult.animationGroups = [mockIdleAnimationGroup];
    scenePresenterMock.loadGLTFModel.mockResolvedValue(mockLoadingResult);

    await systemUnderTest["loadElementModel"]();

    expect(systemUnderTest["idleAnimation"]).toBe(mockIdleAnimationGroup);
  });

  test("loadElementModel gets walkAnimation from loading results", async () => {
    const mockMesh = new Mesh("mockMesh", new Scene(new NullEngine()));
    const mockWalkAnimationGroup = new AnimationGroup(
      "anim_walk",
      new Scene(new NullEngine())
    );
    const mockLoadingResult = mockDeep<ISceneLoaderAsyncResult>();
    // @ts-ignore
    mockLoadingResult.meshes = [mockMesh];
    // @ts-ignore
    mockLoadingResult.animationGroups = [mockWalkAnimationGroup];
    scenePresenterMock.loadGLTFModel.mockResolvedValue(mockLoadingResult);

    await systemUnderTest["loadElementModel"]();

    expect(systemUnderTest["walkAnimation"]).toBe(mockWalkAnimationGroup);
  });

  test("loadIconModel calls the scenePresenter to load npc icon models", async () => {
    const mockMesh = new Mesh("mockMesh", new Scene(new NullEngine()));
    scenePresenterMock.loadModel.mockResolvedValue([mockMesh]);

    await systemUnderTest["loadIconModel"]();

    expect(scenePresenterMock.loadModel).toHaveBeenCalledTimes(1);
  });

  test("createParentNode creates a new transform node and sets it in the viewmodel", () => {
    viewModel.modelMeshes = [new Mesh("mockMesh", new Scene(new NullEngine()))];
    viewModel.iconMeshes = [new Mesh("mockMesh", new Scene(new NullEngine()))];
    viewModel.modelRootNode = new TransformNode(
      "mockNode",
      new Scene(new NullEngine())
    );

    systemUnderTest["createParentNode"]();

    expect(viewModel.parentNode).toBeDefined();
  });

  test("setupInteraction creates a ActionManager and sets it on all meshes", () => {
    viewModel.modelMeshes = [new Mesh("mockMesh", new Scene(new NullEngine()))];
    viewModel.iconMeshes = [new Mesh("mockMesh", new Scene(new NullEngine()))];

    systemUnderTest["setupInteractions"]();

    expect(viewModel.modelMeshes[0].actionManager).toBeDefined();
    expect(viewModel.iconMeshes[0].actionManager).toBeDefined();
  });

  test("click on npc calls controller.picked", () => {
    viewModel.modelMeshes = [new Mesh("mockMesh", new Scene(new NullEngine()))];
    viewModel.iconMeshes = [];

    systemUnderTest["setupInteractions"]();

    viewModel.modelMeshes[0].actionManager!.processTrigger(
      ActionManager.OnPickTrigger
    );

    expect(controllerMock.picked).toHaveBeenCalledTimes(1);
  });

  test("setSpawnLocation sets the position of the parent node to (0,0,0) when no space template is set", () => {
    viewModel.parentNode = new TransformNode(
      "mockNode",
      new Scene(new NullEngine())
    );
    viewModel.learningSpaceTemplateType = LearningSpaceTemplateType.None;

    systemUnderTest["setSpawnLocation"]();

    expect(viewModel.parentNode.position).toEqual(new Vector3(0, 0, 0));
  });

  test("setSpawnLocation sets the position of the parent node to template spawn when space template is set", async () => {
    viewModel.parentNode = new TransformNode(
      "mockNode",
      new Scene(new NullEngine())
    );
    // @ts-ignore
    viewModel.spawnPositionOffset = new Vector3(0, 0, 1);
    // @ts-ignore
    navigationMock.IsReady = Promise.resolve();
    navigationMock.Plugin.getClosestPoint.mockImplementation(
      (vector: Vector3) => vector
    );

    viewModel.learningSpaceTemplateType = LearningSpaceTemplateType.L;
    const playerSpawnPoint = LearningSpaceTemplate_L.playerSpawnPoint;
    const targetVector = new Vector3(
      playerSpawnPoint.position.x,
      0,
      playerSpawnPoint.position.y + 1
    );

    await systemUnderTest["setSpawnLocation"]();

    expect(viewModel.parentNode.position).toEqual(targetVector);
  });

  test("createCharacterAnimator creates and sets up a new CharacterAnimator ", () => {
    const mockIdleAnimation = mock<AnimationGroup>();
    systemUnderTest["idleAnimation"] = mockIdleAnimation;
    const mockWalkAnimation = mock<AnimationGroup>();
    systemUnderTest["walkAnimation"] = mockWalkAnimation;
    const mockInteractionAnimation = mock<AnimationGroup>();
    systemUnderTest["interactionAnimation"] = mockInteractionAnimation;

    const mockModelRootNode = new TransformNode(
      "mockRootNode",
      new Scene(new NullEngine())
    );
    viewModel.modelRootNode = mockModelRootNode;

    systemUnderTest["createCharacterAnimator"]();

    expect(viewModel.characterAnimator).toBeDefined();
    expect(characterAnimatorMock.setup).toHaveBeenCalledTimes(1);
  });

  test("createCharacterNavigator creates and sets up a new CharacterNavigator ", () => {
    const mockMesh = new Mesh("mockMesh", new Scene(new NullEngine()));
    viewModel.modelMeshes = [mockMesh];
    const mockParentNode = new TransformNode(
      "mockParentNode",
      new Scene(new NullEngine())
    );
    viewModel.parentNode = mockParentNode;
    const mockModelRootNode = new TransformNode(
      "mockRootNode",
      new Scene(new NullEngine())
    );
    viewModel.modelRootNode = mockModelRootNode;
    const mockCharacterAnimator = mock<ICharacterAnimator>();
    viewModel.characterAnimator = mockCharacterAnimator;

    systemUnderTest["createCharacterNavigator"]();

    expect(viewModel.characterNavigator).toBeDefined();
    expect(characterNavigatorMock.setup).toHaveBeenCalledTimes(1);
    expect(characterNavigatorMock.setup).toHaveBeenCalledWith(
      mockParentNode,
      mockCharacterAnimator,
      expect.any(Boolean)
    );
  });

  test("setupCleanup sets up a callback to stop movement when isInCutScene changes to false", () => {
    systemUnderTest["setupCleanup"]();

    expect(scenePresenterMock.addDisposeSceneCallback).toHaveBeenCalledTimes(1);
  });
});
