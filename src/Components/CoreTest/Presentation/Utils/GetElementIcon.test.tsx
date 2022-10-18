import { ElementTypeStrings } from "../../../Core/Domain/Types/ElementTypes";
import { getElementIcon } from "../../../Core/Presentation/Utils/GetIcon";

// Only smoketest here, because the only idfference between the returned
// components is the path to the icon.
describe("GetIcon should return a react component for valid element types", () => {
  test.each([
    ["text" as ElementTypeStrings],
    ["image" as ElementTypeStrings],
    ["video" as ElementTypeStrings],
    ["h5p" as ElementTypeStrings],
  ])("[Smoketest] should run for %s", (type) => {
    const result = getElementIcon(type);
    if (type === "image") expect(result.props["src"]).toContain("bild");
    // Warum nutzen wir nicht nur englische Begriffe :( - PG
    else expect(result.props["src"]).toContain(type);
  });

  test("should return h5p, if no valid input is delivered", () => {
    const result = getElementIcon("" as ElementTypeStrings);
    expect(result.props["src"]).toContain("h5p");
  });
});
