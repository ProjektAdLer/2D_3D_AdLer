import AvatarController from "../../../../Core/Presentation/Babylon/Avatar/AvatarController";
import AvatarViewModel from "../../../../Core/Presentation/Babylon/Avatar/AvatarViewModel";

describe("AvatarController", () => {
  let avatarController: AvatarController;

  beforeEach(() => {
    avatarController = new AvatarController(new AvatarViewModel());
  });

  test.todo("add tests for testable methods");
});
