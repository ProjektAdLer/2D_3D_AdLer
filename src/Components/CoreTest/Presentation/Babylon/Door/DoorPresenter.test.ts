import { Vector3 } from "@babylonjs/core";
import DoorPresenter from "../../../../Core/Presentation/Babylon/Door/DoorPresenter";
import DoorViewModel from "../../../../Core/Presentation/Babylon/Door/DoorViewModel";

describe("DoorPresenter", () => {
  let systemUnderTest: DoorPresenter;

  beforeEach(() => {
    systemUnderTest = new DoorPresenter(new DoorViewModel());
  });

  test("constructor throws error if undefined is passed as view model", () => {
    expect(() => {
      //@ts-ignore
      new DoorPresenter(undefined);
    }).toThrowError();
  });

  test("openDoor sets state in view model", () => {
    expect(systemUnderTest["viewModel"].isOpen.Value).toBe(false || undefined);
    systemUnderTest.openDoor();
    expect(systemUnderTest["viewModel"].isOpen.Value).toBe(true);
  });

  test("presentDoor sets position and rotation in view model", () => {
    let positionVector: Vector3 = new Vector3(1, 2, 3);
    let rotation: number = 0;
    systemUnderTest.presentDoor([positionVector, rotation]);
    expect(systemUnderTest["viewModel"].position.Value).toEqual(positionVector);
    expect(systemUnderTest["viewModel"].rotation.Value).toBe(rotation);
  });
});
