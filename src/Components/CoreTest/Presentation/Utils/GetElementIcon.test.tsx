import { ElementTypeStrings } from "src/Components/Core/Domain/Types/ElementTypes";
import { getElementIcon } from "../../../Core/Presentation/Utils/GetIcon";

// Only smoketest here, because the only idfference between the returned
// components is the path to the icon.
describe("GetIcon should return a react component for valid element types", () => {
  test.each([
    ["text" as ElementTypeStrings],
    ["image" as ElementTypeStrings],
    ["video" as ElementTypeStrings],
    ["h5p" as ElementTypeStrings],
  ])("[Smoketest] should run for", (type) => {
    const result = getElementIcon(type);
    expect(result).toBeDefined();
  });

  // test.skip("should return null, if no valid input is delivered", () => {
  //   const result = getElementIcon("");
  //   expect(result).toBeNull();
  // });
});
