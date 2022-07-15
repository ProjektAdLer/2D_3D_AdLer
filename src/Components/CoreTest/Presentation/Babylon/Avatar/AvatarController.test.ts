import AvatarController from "../../../../Core/Presentation/Babylon/Avatar/AvatarController";
import AvatarViewModel from "../../../../Core/Presentation/Babylon/Avatar/AvatarViewModel";

describe("AvatarController", () => {
  let systemUnderTest: AvatarController;

  beforeEach(() => {
    systemUnderTest = new AvatarController(new AvatarViewModel());
  });

  test.todo("add tests for testable methods");
});
