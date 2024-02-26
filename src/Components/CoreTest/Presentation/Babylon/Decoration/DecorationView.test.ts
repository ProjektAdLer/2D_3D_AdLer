import LearningSpaceTheme_Campus from "../../../../Core/Domain/LearningSpaceThemes/LearningSpaceTheme_Arcade";
import LearningSpaceTheme_Arcade from "../../../../Core/Domain/LearningSpaceThemes/LearningSpaceTheme_Arcade";
import LearningSpaceTheme_Suburb from "../../../../Core/Domain/LearningSpaceThemes/LearningSpaceTheme_Suburb";
import { AbstractMesh, NullEngine, Scene } from "@babylonjs/core";
import { mockDeep } from "jest-mock-extended";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import SCENE_TYPES from "../../../../Core/DependencyInjection/Scenes/SCENE_TYPES";
import DecorationView from "../../../../Core/Presentation/Babylon/Decoration/DecorationView";
import DecorationViewModel from "../../../../Core/Presentation/Babylon/Decoration/DecorationViewModel";
import IScenePresenter from "../../../../Core/Presentation/Babylon/SceneManagement/IScenePresenter";
import { LearningSpaceTemplateType } from "../../../../Core/Domain/Types/LearningSpaceTemplateType";
import { LearningSpaceThemeType } from "../../../../Core/Domain/Types/LearningSpaceThemeTypes";

// setup scene presenter mock
const scenePresenterMock = mockDeep<IScenePresenter>();
const scenePresenterFactoryMock = () => scenePresenterMock;

function buildSystemUnderTest(): [DecorationViewModel, DecorationView] {
  const viewModel = new DecorationViewModel();
  const systemUnderTest = new DecorationView(viewModel);
  return [viewModel, systemUnderTest];
}

describe("DecorationView", () => {
  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind(SCENE_TYPES.ScenePresenterFactory).toConstantValue(
      scenePresenterFactoryMock
    );
  });

  afterAll(() => {
    CoreDIContainer.restore();
    jest.clearAllMocks();
  });

  test("constructor injects scenePresenter", () => {
    scenePresenterMock.loadModel.mockResolvedValue([
      new AbstractMesh("TestMesh", new Scene(new NullEngine())),
    ]);

    const [, systemUnderTest] = buildSystemUnderTest();
    expect(systemUnderTest["scenePresenter"]).toBeDefined();
  });

  test("asyncSetup/loadMeshAsync calls scenePresenter.loadModel with L room", async () => {
    scenePresenterMock.loadModel.mockResolvedValue([
      new AbstractMesh("TestMesh", new Scene(new NullEngine())),
    ]);

    const [viewModel, systemUnderTest] = buildSystemUnderTest();
    viewModel.learningSpaceTemplateType.Value = LearningSpaceTemplateType.L;
    await systemUnderTest.asyncSetup();

    expect(scenePresenterMock.loadModel).toHaveBeenCalledTimes(1);
  });

  test("asyncSetup/loadMeshAsync calls scenePresenter.loadModel with R6 room", async () => {
    scenePresenterMock.loadModel.mockResolvedValue([
      new AbstractMesh("TestMesh", new Scene(new NullEngine())),
    ]);

    const [viewModel, systemUnderTest] = buildSystemUnderTest();
    viewModel.learningSpaceTemplateType.Value = LearningSpaceTemplateType.R6;
    await systemUnderTest.asyncSetup();

    expect(scenePresenterMock.loadModel).toHaveBeenCalledTimes(1);
  });

  test("asyncSetup/loadMeshAsync calls scenePresenter.loadModel with R8 room", async () => {
    scenePresenterMock.loadModel.mockResolvedValue([
      new AbstractMesh("TestMesh", new Scene(new NullEngine())),
    ]);

    const [viewModel, systemUnderTest] = buildSystemUnderTest();
    viewModel.learningSpaceTemplateType.Value = LearningSpaceTemplateType.R8;
    await systemUnderTest.asyncSetup();

    expect(scenePresenterMock.loadModel).toHaveBeenCalledTimes(1);
  });

  test("asyncSetup/loadMeshAsync returns without calling loadModel when templateType is None", async () => {
    scenePresenterMock.loadModel.mockResolvedValue([
      new AbstractMesh("TestMesh", new Scene(new NullEngine())),
    ]);

    const [viewModel, systemUnderTest] = buildSystemUnderTest();
    viewModel.learningSpaceTemplateType.Value = LearningSpaceTemplateType.None;
    await systemUnderTest.asyncSetup();

    expect(scenePresenterMock.loadModel).toHaveBeenCalledTimes(0);
  });

  test("asyncSetup sets default theme, if no theme is provided", async () => {
    scenePresenterMock.loadModel.mockResolvedValue([
      new AbstractMesh("TestMesh", new Scene(new NullEngine())),
    ]);

    const [viewModel, systemUnderTest] = buildSystemUnderTest();
    viewModel.learningSpaceTemplateType.Value = LearningSpaceTemplateType.L;
    viewModel.theme = "";
    await systemUnderTest.asyncSetup();
    expect(scenePresenterMock.loadModel).toHaveBeenCalledWith(
      LearningSpaceTheme_Arcade.decorationModelLinkLShape,
      true
    );
  });

  test.each([
    [
      LearningSpaceTemplateType.L,
      LearningSpaceTheme_Arcade.decorationModelLinkLShape,
    ],
    [
      LearningSpaceTemplateType.R6,
      LearningSpaceTheme_Arcade.decorationModelLink2x2,
    ],
    [
      LearningSpaceTemplateType.R8,
      LearningSpaceTheme_Arcade.decorationModelLink2x3,
    ],
  ])(
    "asyncSetup loads with theme `Campus` models, when given spacetemplatetype %s, returns modelLink %s",
    async (templateType, expectedResult) => {
      scenePresenterMock.loadModel.mockResolvedValue([
        new AbstractMesh("TestMesh", new Scene(new NullEngine())),
      ]);

      const [viewModel, systemUnderTest] = buildSystemUnderTest();
      viewModel.theme = LearningSpaceThemeType.Arcade;
      viewModel.learningSpaceTemplateType.Value = templateType;
      await systemUnderTest.asyncSetup();
      expect(scenePresenterMock.loadModel).toHaveBeenCalledWith(
        expectedResult,
        true
      );
    }
  );

  test.each([
    [
      LearningSpaceTemplateType.L,
      LearningSpaceTheme_Campus.decorationModelLinkLShape,
    ],
    [
      LearningSpaceTemplateType.R6,
      LearningSpaceTheme_Campus.decorationModelLink2x2,
    ],
    [
      LearningSpaceTemplateType.R8,
      LearningSpaceTheme_Campus.decorationModelLink2x3,
    ],
  ])(
    "asyncSetup loads with theme `Campus` models, when given spacetemplatetype %s, returns modelLink %s",
    async (templateType, expectedResult) => {
      scenePresenterMock.loadModel.mockResolvedValue([
        new AbstractMesh("TestMesh", new Scene(new NullEngine())),
      ]);

      const [viewModel, systemUnderTest] = buildSystemUnderTest();
      viewModel.theme = LearningSpaceThemeType.Campus;
      viewModel.learningSpaceTemplateType.Value = templateType;
      await systemUnderTest.asyncSetup();
      expect(scenePresenterMock.loadModel).toHaveBeenCalledWith(
        expectedResult,
        true
      );
    }
  );

  test.each([
    [
      LearningSpaceTemplateType.L,
      LearningSpaceTheme_Suburb.decorationModelLinkLShape,
    ],
    [
      LearningSpaceTemplateType.R6,
      LearningSpaceTheme_Suburb.decorationModelLink2x2,
    ],
    [
      LearningSpaceTemplateType.R8,
      LearningSpaceTheme_Suburb.decorationModelLink2x3,
    ],
  ])(
    "asyncSetup loads with theme `Suburb` models, when given spacetemplatetype %s, returns modelLink %s",
    async (templateType, expectedResult) => {
      scenePresenterMock.loadModel.mockResolvedValue([
        new AbstractMesh("TestMesh", new Scene(new NullEngine())),
      ]);

      const [viewModel, systemUnderTest] = buildSystemUnderTest();
      viewModel.theme = LearningSpaceThemeType.Suburb;
      viewModel.learningSpaceTemplateType.Value = templateType;
      await systemUnderTest.asyncSetup();
      expect(scenePresenterMock.loadModel).toHaveBeenCalledWith(
        expectedResult,
        true
      );
    }
  );
});
