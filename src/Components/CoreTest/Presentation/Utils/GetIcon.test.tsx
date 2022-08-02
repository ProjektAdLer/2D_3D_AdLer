import { getIcon } from "../../../Core/Presentation/Utils/GetIcon";

// Only smoketest here, because the only idfference between the returned
// components is the path to the icon.
describe("GetIcon should return a react component for valid learningelement types", () => {
  test.each([["text"], ["image"], ["video"], ["h5p"]])(
    "[Smoketest] should run for",
    (type) => {
      const result = getIcon(type);
      expect(result).toBeDefined();
    }
  );

  test("should return null, if no valid input is delivered", () => {
    const result = getIcon("");
    expect(result).toBeNull();
  });
});
