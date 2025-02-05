import AvatarConfigTO from "../../../../../Core/Application/DataTransferObjects/AvatarConfigTO";
import AvatarEditorPreviewModelPresenter from "../../../../../Core/Presentation/AvatarEditor/AvatarEditorPreview/AvatarEditorPreviewModel/AvatarEditorPreviewModelPresenter";
import AvatarEditorPreviewModelViewModel from "../../../../../Core/Presentation/AvatarEditor/AvatarEditorPreview/AvatarEditorPreviewModel/AvatarEditorPreviewModelViewModel";

describe("AvatarEditorPreviewModelPresenter", () => {
  let systemUnderTest: AvatarEditorPreviewModelPresenter;
  let viewModel: AvatarEditorPreviewModelViewModel;

  beforeEach(() => {
    viewModel = new AvatarEditorPreviewModelViewModel();
    systemUnderTest = new AvatarEditorPreviewModelPresenter(viewModel);
  });

  test("onAvatarConfigChanged sets new avatar config and difference config", () => {
    let avatarConfig = {
      eyebrows: 0,
      eyes: 1,
      nose: 2,
      mouth: 3,
    } as AvatarConfigTO;
    let configDiff = {
      eyebrows: 4,
    } as Partial<AvatarConfigTO>;

    systemUnderTest.onAvatarConfigChanged(avatarConfig, configDiff);

    expect(viewModel.avatarConfigDiff.Value.eyebrows).toEqual(4);
    expect(viewModel.currentAvatarConfig.Value).toEqual({
      eyebrows: 0,
      eyes: 1,
      nose: 2,
      mouth: 3,
    });
  });

  test("onAvatarConfigLoaded sets new avatar config", () => {
    let avatarConfig = {
      eyebrows: 0,
      eyes: 1,
      nose: 2,
      mouth: 3,
    } as AvatarConfigTO;

    systemUnderTest.onAvatarConfigLoaded(avatarConfig);
    expect(viewModel.currentAvatarConfig.Value).toEqual(avatarConfig);
  });
});
