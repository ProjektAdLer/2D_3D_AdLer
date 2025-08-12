import { LearningSpaceTheme_CampusAB } from "../../../../Core/Domain/LearningSpaceThemes/LearningSpaceTheme_Campus";
import LearningSpaceTheme_Arcade from "../../../../Core/Domain/LearningSpaceThemes/LearningSpaceTheme_Arcade";
import { Mesh, NullEngine, Scene } from "@babylonjs/core";
import { mockDeep } from "jest-mock-extended";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import SCENE_TYPES from "../../../../Core/DependencyInjection/Scenes/SCENE_TYPES";
import DecorationView from "../../../../Core/Presentation/Babylon/Decoration/DecorationView";
import DecorationViewModel from "../../../../Core/Presentation/Babylon/Decoration/DecorationViewModel";
import IScenePresenter from "../../../../Core/Presentation/Babylon/SceneManagement/IScenePresenter";
import { LearningSpaceTemplateType } from "../../../../Core/Domain/Types/LearningSpaceTemplateType";
import { ThemeType } from "../../../../Core/Domain/Types/ThemeTypes";

jest.mock("@babylonjs/core/Meshes");

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
      scenePresenterFactoryMock,
    );
  });

  afterAll(() => {
    CoreDIContainer.restore();
    jest.clearAllMocks();
  });

  //ANF-ID: [ELG0025]
  test("loads inside decoration models when theme and learning space template type are valid", async () => {
    const [viewModel, systemUnderTest] = buildSystemUnderTest();
    viewModel.theme = ThemeType.CampusAB;
    viewModel.learningSpaceTemplateType = LearningSpaceTemplateType.L;
    const mockMesh = new Mesh("insideDeco", new Scene(new NullEngine()));
    scenePresenterMock.loadModel.mockResolvedValue([mockMesh]);

    await systemUnderTest.asyncSetup();

    expect(scenePresenterMock.loadModel).toHaveBeenCalledWith(
      LearningSpaceTheme_CampusAB.insideDecorationModels[
        LearningSpaceTemplateType.L
      ],
      true,
    );
    expect(viewModel.insideMeshes).toStrictEqual([mockMesh]);
  });

  // ANF-ID: [ELG0025]
  test("loads outside decoration models when theme and learning space template type are valid", async () => {
    const [viewModel, systemUnderTest] = buildSystemUnderTest();
    viewModel.theme = ThemeType.Arcade;
    viewModel.learningSpaceTemplateType = LearningSpaceTemplateType.L;
    const mockMesh = new Mesh("outsideDeco", new Scene(new NullEngine()));
    scenePresenterMock.loadModel.mockResolvedValue([mockMesh]);

    await systemUnderTest.asyncSetup();

    expect(scenePresenterMock.loadModel).toHaveBeenCalledWith(
      LearningSpaceTheme_Arcade.outsideDecorationModels[
        LearningSpaceTemplateType.L
      ],
    );
    expect(viewModel.outsideMeshes).toStrictEqual([mockMesh]);
  });

  // ANF-ID: [ELG0025]
  test("loads no model when learning space template type is None", async () => {
    const [viewModel, systemUnderTest] = buildSystemUnderTest();
    viewModel.theme = ThemeType.CampusAB;
    viewModel.learningSpaceTemplateType = LearningSpaceTemplateType.None;

    await systemUnderTest.asyncSetup();

    expect(scenePresenterMock.loadModel).not.toHaveBeenCalled();
    expect(viewModel.insideMeshes).toStrictEqual([]);
    expect(viewModel.outsideMeshes).toStrictEqual([]);
  });
});
