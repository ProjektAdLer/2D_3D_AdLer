import { DoorTypeStrings } from "../../../Core/Domain/Types/DoorTypes";
import { getDoorIcon } from "../../../Core/Presentation/Utils/GetDoorIcon";

// Only smoketest here, because the only idfference between the returned
// components is the path to the icon.
describe("GetDoorIcon should return a react component for valid element types", () => {
  test.each([
    ["entryDoor" as DoorTypeStrings, "door-in.svg"],
    ["exitDoor" as DoorTypeStrings, "door-out.svg"],
  ])("should run for %s", (type, expected) => {
    const result = getDoorIcon(type);
    expect(result.props["src"]).toContain(expected);
  });
});
