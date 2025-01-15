import { AvatarHairModels } from "../../../Core/Domain/AvatarModels/AvatarModelTypes";
import AvatarEditorPresenter from "../../../Core/Presentation/AvatarEditor/AvatarEditorPresenter";
import AvatarEditorViewModel from "../../../Core/Presentation/AvatarEditor/AvatarEditorViewModel";

describe("AvatarEditorPresenter", () => {
  let systemUnderTest: AvatarEditorPresenter;
  let viewModel: AvatarEditorViewModel;

  beforeEach(() => {
    viewModel = new AvatarEditorViewModel();
    systemUnderTest = new AvatarEditorPresenter(viewModel);
  });

  test("onAvatarConfigLoaded should set the viewmodel correctly", () => {
    let avatarConfig = {
      hair: "hair-medium-ponytail" as AvatarHairModels,
    };
    systemUnderTest.onAvatarConfigLoaded(avatarConfig);
    expect(viewModel.hair.Value).toBe("hair-medium-ponytail");
  });

  test("onAvatarConfigChanged should set the viewmodel correctly", () => {
    let avatarConfig = {
      hair: "hair-medium-ponytail" as AvatarHairModels,
    };
    systemUnderTest.onAvatarConfigChanged(avatarConfig, avatarConfig);
    expect(viewModel.hair.Value).toBe("hair-medium-ponytail");
  });
});
