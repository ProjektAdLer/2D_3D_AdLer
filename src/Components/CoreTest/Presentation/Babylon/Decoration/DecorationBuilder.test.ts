import DecorationBuilder from "../../../../Core/Presentation/Babylon/Decoration/DecorationBuilder";
import PresentationBuilder from "../../../../Core/Presentation/PresentationBuilder/PresentationBuilder";

describe("DecorationBuilder", () => {
  let systemUnderTest: DecorationBuilder;

  beforeEach(() => {
    systemUnderTest = new DecorationBuilder();
  });

  test("constructor", () => {
    expect(systemUnderTest).toBeInstanceOf(PresentationBuilder);
  });
});
