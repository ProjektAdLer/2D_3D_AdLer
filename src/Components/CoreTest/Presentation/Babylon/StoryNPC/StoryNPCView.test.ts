import { mock, mockDeep } from "jest-mock-extended";
import IStoryNPCController from "../../../../Core/Presentation/Babylon/StoryNPC/IStoryNPCController";
import StoryNPCView from "../../../../Core/Presentation/Babylon/StoryNPC/StoryNPCView";
import StoryNPCViewModel from "../../../../Core/Presentation/Babylon/StoryNPC/StoryNPCViewModel";
import IScenePresenter from "../../../../Core/Presentation/Babylon/SceneManagement/IScenePresenter";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import SCENE_TYPES from "../../../../Core/DependencyInjection/Scenes/SCENE_TYPES";
import {
  AnimationGroup,
  ISceneLoaderAsyncResult,
  Mesh,
  NullEngine,
  Scene,
} from "@babylonjs/core";
import ICharacterAnimator from "../../../../Core/Presentation/Babylon/CharacterAnimator/ICharacterAnimator";
import PRESENTATION_TYPES from "../../../../Core/DependencyInjection/Presentation/PRESENTATION_TYPES";

const characterAnimatorMock = mock<ICharacterAnimator>();

// setup scene presenter mock
const scenePresenterMock = mockDeep<IScenePresenter>();
const scenePresenterFactoryMock = () => scenePresenterMock;
// @ts-ignore
scenePresenterMock.Scene = new Scene(new NullEngine());

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
  });

  beforeEach(() => {
    viewModel = new StoryNPCViewModel();
    controllerMock = mock<IStoryNPCController>();
    systemUnderTest = new StoryNPCView(viewModel, controllerMock);
  });

  describe("model loading", () => {
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
  });
});
