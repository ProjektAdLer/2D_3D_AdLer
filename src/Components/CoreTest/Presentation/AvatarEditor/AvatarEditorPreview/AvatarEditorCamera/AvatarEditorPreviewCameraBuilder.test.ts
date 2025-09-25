import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import AvatarEditorPreviewCameraBuilder from "../../../../../Core/Presentation/AvatarEditor/AvatarEditorPreview/AvatarEditorPreviewCamera/AvatarEditorPreviewCameraBuilder";

describe("AvatarEditorPreviewCameraBuilder", () => {
  let systemUnderTest: AvatarEditorPreviewCameraBuilder;

  beforeAll(() => {
    CoreDIContainer.snapshot();
  });

  beforeEach(() => {
    systemUnderTest = new AvatarEditorPreviewCameraBuilder();
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("builder builds presenter", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildController();
    systemUnderTest.buildPresenter();

    expect(systemUnderTest["presenter"]).toBeDefined();
  });
});
