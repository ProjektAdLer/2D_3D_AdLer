import DoorBuilder from "../../../../Core/Presentation/Babylon/Door/DoorBuilder";
import PresentationBuilder from "../../../../Core/Presentation/PresentationBuilder/PresentationBuilder";
import ViewModelControllerProvider from "../../../../Core/Presentation/ViewModelProvider/ViewModelControllerProvider";

describe("DoorBuilder", () => {
  let systemUnderTest: DoorBuilder;

  beforeEach(() => {
    systemUnderTest = new DoorBuilder();
  });

  test("constructor", () => {
    expect(systemUnderTest).toBeInstanceOf(PresentationBuilder);
  });
});
