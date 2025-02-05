import AvatarEditorPreviewModelBuilder from "../../../../../Core/Presentation/AvatarEditor/AvatarEditorPreview/AvatarEditorPreviewModel/AvatarEditorPreviewModelBuilder";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import AvatarPort from "../../../../../Core/Application/Ports/AvatarPort/AvatarPort";
import { mock, mockDeep } from "jest-mock-extended";
import PORT_TYPES from "../../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import AvatarEditorPreviewModelView from "../../../../../Core/Presentation/AvatarEditor/AvatarEditorPreview/AvatarEditorPreviewModel/AvatarEditorPreviewModelView";
import IScenePresenter from "../../../../../Core/Presentation/Babylon/SceneManagement/IScenePresenter";
import SCENE_TYPES from "../../../../../Core/DependencyInjection/Scenes/SCENE_TYPES";

const avatarPortMock = mock<AvatarPort>();
const scenePresenterMock = mockDeep<IScenePresenter>();
const scenePresenterFactoryMock = () => scenePresenterMock;

jest.mock(
  "../../../../../Core/Presentation/Babylon/SceneManagement/BabylonCanvas",
  () => "MockedBabylonCanvas",
);
jest.mock(
  "../../../../../Core/Presentation/AvatarEditor/AvatarEditorPreview/AvatarEditorPreviewSceneDefinition",
);

describe("AvatarEditorPreviewModelBuilder", () => {
  let systemUnderTest: AvatarEditorPreviewModelBuilder;

  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind(PORT_TYPES.IAvatarPort).toConstantValue(
      avatarPortMock,
    );
    CoreDIContainer.rebind(SCENE_TYPES.ScenePresenterFactory).toConstantValue(
      scenePresenterFactoryMock,
    );
  });

  beforeEach(() => {
    systemUnderTest = new AvatarEditorPreviewModelBuilder();
  });

  afterAll(() => {
    CoreDIContainer.restore();
    jest.restoreAllMocks();
  });

  test("buildViewModel concludes the build step successfully and sets the given data in the viewModel", () => {
    systemUnderTest.buildViewModel();

    expect(systemUnderTest["viewModel"]).toBeDefined();
  });

  test("buildPresenter registers the presenter with avatar focus selection", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildPresenter();

    expect(avatarPortMock.registerAdapter).toHaveBeenCalledTimes(1);
  });

  test("buildView calls asyncSetup on the view", () => {
    const asyncSetupMock = jest
      .spyOn(AvatarEditorPreviewModelView.prototype, "asyncSetup")
      .mockResolvedValue();

    systemUnderTest.buildViewModel();
    systemUnderTest.buildView();

    expect(asyncSetupMock).toHaveBeenCalledTimes(1);
  });
});
